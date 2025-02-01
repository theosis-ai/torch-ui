import json
import os
import traceback
from http import HTTPStatus
from pathlib import Path
from typing import List, Optional
from warnings import warn

from huggingface_hub import snapshot_download
from huggingface_hub.utils import GatedRepoError, RepositoryNotFoundError
from kagglehub import model_download
from kagglehub.auth import set_kaggle_credentials
from kagglehub.exceptions import KaggleApiHTTPError
from kagglehub.handle import parse_model_handle

from torchtune import training
from logger import logger

REPO_ID_FNAME = training.checkpointing._utils.REPO_ID_FNAME


def _download(
    repo_id: str,
    output_dir: Optional[Path] = None,
    hf_token: Optional[str] = None,
    ignore_patterns: Optional[str] = None,
    source: str = "huggingface",
    kaggle_username: Optional[str] = None,
    kaggle_api_key: Optional[str] = None,
) -> List[Path]:
    """Download a model from Hugging Face or Kaggle Model Hub.

    Args:
        repo_id: Model repo ID or handle to download from
        output_dir: Directory to save model files to
        hf_token: Hugging Face API token for gated models
        ignore_patterns: Patterns of files to ignore when downloading
        source: Which model hub to download from - "huggingface" or "kaggle"
        kaggle_username: Kaggle username for authentication
        kaggle_api_key: Kaggle API key for authentication

    Returns:
        List[Path]: Paths to downloaded files

    Raises:
        ValueError: If source is invalid or model not found
        RuntimeError: If download fails
    """
    if source == "huggingface":
        return _download_from_huggingface(
            repo_id=repo_id,
            output_dir=output_dir,
            hf_token=hf_token,
            ignore_patterns=ignore_patterns,
        )
    elif source == "kaggle":
        return _download_from_kaggle(
            model_handle=repo_id,
            kaggle_username=kaggle_username,
            kaggle_api_key=kaggle_api_key,
        )
    else:
        raise ValueError(f"Invalid source: {source}. Must be 'huggingface' or 'kaggle'")


def _download_from_huggingface(
    repo_id: str,
    output_dir: Optional[Path] = None,
    hf_token: Optional[str] = None,
    ignore_patterns: Optional[str] = None,
) -> List[Path]:
    """Download model files from Hugging Face Hub.

    Args:
        repo_id: Hugging Face model repo ID
        output_dir: Directory to save model files to
        hf_token: Hugging Face API token for gated models
        ignore_patterns: Patterns of files to ignore

    Returns:
        List[Path]: Paths to downloaded files

    Raises:
        ValueError: If model not found or access denied
        RuntimeError: If download fails
    """
    if output_dir is None:
        model_name = repo_id.split("/")[-1]
        output_dir = Path("/tmp") / model_name

    logger.info(f"Downloading {repo_id} to {output_dir}")
    if ignore_patterns:
        logger.info(f"Ignoring files matching patterns: {ignore_patterns}")

    try:
        true_output_dir = snapshot_download(
            repo_id,
            local_dir=output_dir,
            ignore_patterns=ignore_patterns,
            token=hf_token,
        )
    except GatedRepoError:
        if hf_token:
            raise ValueError(
                "Access denied. Please ensure you have access to the repository."
            )
        else:
            raise ValueError(
                "Access denied. Please provide a Hugging Face token via hf_token "
                "or by running `huggingface-cli login`. Get your token at "
                "https://huggingface.co/settings/tokens"
            )
    except RepositoryNotFoundError:
        raise ValueError(f"Repository '{repo_id}' not found on the Hugging Face Hub.")
    except Exception as e:
        tb = traceback.format_exc()
        raise RuntimeError(f"Failed to download {repo_id}: {e}\n{tb}")

    # Save repo ID for adapter config
    repo_id_path = Path(true_output_dir) / f"{REPO_ID_FNAME}.json"
    with open(repo_id_path, "w") as f:
        json.dump({"repo_id": repo_id}, f, indent=4)

    downloaded_files = list(Path(true_output_dir).iterdir())
    logger.info(f"Successfully downloaded {len(downloaded_files)} files")
    logger.debug(f"Downloaded files: {downloaded_files}")
    return downloaded_files


def _download_from_kaggle(
    model_handle: str,
    kaggle_username: Optional[str] = None,
    kaggle_api_key: Optional[str] = None,
) -> List[Path]:
    """Download model files from Kaggle Model Hub.

    Args:
        model_handle: Kaggle model handle
        kaggle_username: Kaggle username for authentication
        kaggle_api_key: Kaggle API key for authentication

    Returns:
        List[Path]: Paths to downloaded files

    Raises:
        ValueError: If model not found or invalid handle
        RuntimeError: If download fails
    """
    try:
        parsed_handle = parse_model_handle(model_handle)
        if (
            parsed_handle.framework == "pytorch"
            and parsed_handle.owner != "metaresearch"
        ):
            warn(
                f"Model {model_handle} was not published by Meta and may not be compatible with torchtune"
            )
        if parsed_handle.framework not in {"pytorch", "transformers"}:
            warn(
                f"Model {model_handle} is not a PyTorch/Transformers model and may not be compatible"
            )
    except Exception as e:
        raise ValueError(f"Invalid model handle {model_handle}: {e}")

    logger.info(f"Downloading {model_handle}")

    try:
        if kaggle_username or kaggle_api_key:
            # Fallback to env vars if either arg missing
            username = kaggle_username or os.environ.get("KAGGLE_USERNAME")
            api_key = kaggle_api_key or os.environ.get("KAGGLE_KEY")
            set_kaggle_credentials(username, api_key)
    except Exception as e:
        logger.warning(f"Failed to set Kaggle credentials: {e}")

    try:
        output_dir = model_download(model_handle)
    except KaggleApiHTTPError as e:
        if e.response.status_code in {HTTPStatus.UNAUTHORIZED, HTTPStatus.FORBIDDEN}:
            raise ValueError(
                "Access denied. Please provide valid Kaggle credentials via "
                "kaggle_username/kaggle_api_key or environment variables. See "
                "https://github.com/Kaggle/kagglehub/blob/main/README.md#authenticate"
            )
        elif e.response.status_code == HTTPStatus.NOT_FOUND:
            raise ValueError(f"Model '{model_handle}' not found on Kaggle Model Hub")
        raise RuntimeError(f"Failed to download {model_handle}: {e}")
    except Exception as e:
        raise RuntimeError(f"Failed to download {model_handle}: {e}")

    downloaded_files = list(Path(output_dir).iterdir())
    logger.info(f"Successfully downloaded {len(downloaded_files)} files")
    logger.debug(f"Downloaded files: {downloaded_files}")
    return downloaded_files
