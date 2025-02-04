import torchtune
from pathlib import Path
from typing import Dict, Any
from omegaconf import OmegaConf, errors
from logger import logger

TORCHTUNE_ROOT = Path(torchtune.__file__).parent.parent


def _get_config_settings(config_name: str) -> Dict[str, Any]:
    """
    Parse a YAML configuration file using OmegaConf and return a dictionary.

    Args:
        config_path: Path to the YAML configuration file

    Returns:
        Dict containing the parsed configuration

    Raises:
        FileNotFoundError: If the config file doesn't exist
        OmegaConf.errors: If there are YAML parsing errors
        ValueError: If the config file is empty
    """
    try:
        config_path = TORCHTUNE_ROOT / "recipes" / "configs" / config_name
        logger.info(f"Reading config file: {config_path}")

        if not config_path.exists():
            raise FileNotFoundError(f"Configuration file not found: {config_path}")

        config = OmegaConf.load(config_path)

        if config is None:
            raise ValueError("Configuration file is empty")

        # Convert OmegaConf container to dictionary
        return {"settings": OmegaConf.to_container(config, resolve=True)}

    except errors.OmegaConfBaseException as e:
        raise ValueError(f"Error parsing configuration file: {str(e)}")
    except Exception as e:
        raise Exception(f"Error parsing configuration file: {str(e)}")
