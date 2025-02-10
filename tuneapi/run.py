import os
import runpy
import sys
from pathlib import Path
from typing import Optional

import torchtune
from torch.distributed.elastic.multiprocessing.errors import record
from torch.distributed.run import run
from torchtune import _recipe_registry

ROOT = Path(torchtune.__file__).parent.parent


# TODO: add ability to use modal or local compute
def _run_recipe(
    recipe_name: str,
    config_name: str,
    distributed: bool = False,
    num_processes: int = 1,
    rdzv_endpoint: Optional[str] = None,
    is_builtin: bool = True,
) -> None:
    """Run a recipe with the specified configuration.

    Args:
        recipe_name (str): Name or path of the recipe to run
        config_name (str): Name or path of the config to use
        distributed (bool): Whether to run in distributed mode
        num_processes (int): Number of processes for distributed training
        rdzv_endpoint (Optional[str]): Rendezvous endpoint for distributed training
        is_builtin (bool): Whether the recipe is a built-in recipe
    """
    recipe_path = None
    config_path = None
    supports_distributed = True

    # Find recipe
    recipe = next(
        (r for r in _recipe_registry.get_all_recipes() if r.name == recipe_name), None
    )
    if recipe is None:
        recipe_path = recipe_name.replace("/", ".")
    else:
        recipe_path = str(ROOT / "recipes" / recipe.file_path)
        supports_distributed = recipe.supports_distributed

    # Find config
    config = None
    if recipe:
        config = next((c for c in recipe.configs if c.name == config_name), None)
    if not config:
        config = next((c for c in recipe.configs if c.name == config_name), None)

    if config is None:
        config_path = config_name
    else:
        config_path = str(ROOT / "recipes" / "configs" / config.file_path)

    # Make sure user code in current directory is importable
    sys.path.append(os.getcwd())

    if distributed:
        if not supports_distributed:
            raise ValueError(
                f"Recipe {recipe_name} does not support distributed training"
            )
        _run_distributed(
            recipe_path, config_path, is_builtin, num_processes, rdzv_endpoint
        )
    else:
        _run_single_device(recipe_path, config_path, is_builtin)


@record
def _run_distributed(
    recipe_path: str,
    config_path: str,
    is_builtin: bool,
    num_processes: int,
    rdzv_endpoint: Optional[str] = None,
):
    """Run a recipe in distributed mode."""
    args = type(
        "Args",
        (),
        {
            "training_script": recipe_path,
            "training_script_args": ["--config", config_path],
            "nproc_per_node": num_processes,
            "rdzv_endpoint": rdzv_endpoint,
            "standalone": rdzv_endpoint is None,
            "module": not is_builtin,
        },
    )()
    run(args)


def _run_single_device(recipe_path: str, config_path: str, is_builtin: bool):
    """Run a recipe on a single device."""
    sys.argv = [str(recipe_path), "--config", config_path]
    if is_builtin:
        runpy.run_path(str(recipe_path), run_name="__main__")
    else:
        runpy.run_module(str(recipe_path), run_name="__main__")
