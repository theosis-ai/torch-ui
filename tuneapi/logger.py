import logging
import sys
from typing import Any


class CustomFormatter(logging.Formatter):
    """Custom formatter with colors"""

    COLORS = {
        "DEBUG": "\033[36m",  # cyan
        "INFO": "\033[32m",  # green
        "WARNING": "\033[33m",  # yellow
        "ERROR": "\033[31m",  # red
        "CRITICAL": "\033[41m",  # red background
    }
    RESET = "\033[0m"

    def format(self, record: Any) -> str:
        color = self.COLORS.get(record.levelname, self.RESET)
        record.color_levelname = f"{color}{record.levelname}{self.RESET}"
        return super().format(record)


def setup_logger(name: str = "api") -> logging.Logger:
    """Setup and return a custom logger"""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)

    # Console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)

    # Format
    formatter = CustomFormatter(
        "%(asctime)s - %(color_levelname)-8s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S"
    )
    console_handler.setFormatter(formatter)

    # Add handler if it doesn't exist
    if not logger.handlers:
        logger.addHandler(console_handler)

    return logger


logger = setup_logger()
