from pathlib import Path
from typing import Union

from omegaconf import OmegaConf

from torchtune import config
from logger import logger


def _validate_config(config_path: Union[str, Path]) -> bool:
    """Validate that a config file is well-formed.

    Args:
        config_path: Path to the config file to validate

    Returns:
        bool: True if config is valid

    Raises:
        ValueError: If config is invalid
        FileNotFoundError: If config file does not exist
    """
    config_path = Path(config_path)
    logger.info(f"Validating config at {config_path}")

    try:
        cfg = OmegaConf.load(config_path)
    except FileNotFoundError:
        logger.error(f"Config file not found: {config_path}")
        raise
    except Exception as e:
        logger.error(f"Failed to load config: {e}")
        raise ValueError(f"Could not load config file: {e}")

    try:
        config.validate(cfg)
        logger.info("Config validation successful")
        return True
    except config._errors.ConfigError as e:
        logger.error(f"Config validation failed: {e}")
        raise ValueError(f"Invalid config: {e}")
