import shutil
from pathlib import Path
from typing import Union

import torchtune

from torchtune import _recipe_registry
from logger import logger

ROOT = Path(torchtune.__file__).parent.parent


def _cp(
    file: str,
    destination: Union[str, Path],
    no_clobber: bool = False,
    make_parents: bool = False,
) -> Path:
    """Copy a built-in recipe or config to a new location.

    Args:
        file: Recipe/config name to copy. For a list of all possible options, run list_recipes()
        destination: Location to copy the file to
        no_clobber: Do not overwrite destination if it already exists
        make_parents: Create parent directories for destination if they do not exist

    Returns:
        Path: The destination path where the file was copied

    Raises:
        ValueError: If the file name is invalid or file cannot be copied to destination
        FileNotFoundError: If destination parent directory doesn't exist and make_parents=False
    """
    destination = Path(destination)
    src = None

    # Iterate through all recipes and configs
    for recipe in _recipe_registry.get_all_recipes():
        if recipe.name == file:
            src = ROOT / "recipes" / recipe.file_path
            proper_suffix = ".py"
            break
        for config in recipe.configs:
            if config.name == file:
                src = ROOT / "recipes" / "configs" / config.file_path
                proper_suffix = ".yaml"
                break

    # Fail if no file exists
    if src is None:
        raise ValueError(
            f"Invalid file name: {file}. Use list_recipes() to see all available files to copy."
        )

    # Attach proper suffix if needed
    if destination.name != "" and destination.suffix != proper_suffix:
        destination = destination.with_suffix(proper_suffix)

    # Copy file
    try:
        if no_clobber and destination.exists():
            logger.info(
                f"File already exists at {destination.absolute()}, not overwriting"
            )
        else:
            if make_parents:
                logger.debug(f"Creating parent directories for {destination}")
                destination.parent.mkdir(parents=True, exist_ok=True)
            logger.info(f"Copying {src} to {destination}")
            copied_path = Path(shutil.copy(src, destination))
            logger.debug(f"Successfully copied file to {copied_path}")
            return copied_path
    except FileNotFoundError:
        logger.error(
            f"Failed to copy to {destination} - parent directory does not exist"
        )
        raise FileNotFoundError(
            f"Cannot create regular file: '{destination}'. No such file or directory. "
            "Set make_parents=True to create parent directories automatically."
        )
