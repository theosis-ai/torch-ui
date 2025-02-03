import inspect
from pathlib import Path
from typing import Dict, Any
import importlib.util
import sys
import torchtune
from torchtune import _recipe_registry

ROOT = Path(torchtune.__file__).parent.parent


def get_signature_info(obj: Any) -> Dict[str, Any]:
    """Extract parameter information from a function or class signature."""
    signature = inspect.signature(obj)
    params = {}

    for name, param in signature.parameters.items():
        # Skip self parameter for class methods
        if name == "self":
            continue

        param_info = {
            "name": name,
            "type": (
                str(param.annotation) if param.annotation != inspect._empty else None
            ),
            "default": None if param.default == inspect._empty else param.default,
            "required": param.default == inspect._empty,
            "kind": str(param.kind),
        }
        params[name] = param_info

    return params


def read_recipe_signatures(recipe_name: str) -> Dict[str, Any]:
    """Read and parse signatures from a torchtune recipe.

    Args:
        recipe_name: Name of the built-in recipe or path to custom recipe

    Returns:
        Dict containing the recipe's signatures
    """
    recipe_path = None

    # Find recipe
    recipe = next(
        (r for r in _recipe_registry.get_all_recipes() if r.name == recipe_name), None
    )

    if recipe is None:
        # Handle custom recipe path
        recipe_path = recipe_name
    else:
        recipe_path = str(ROOT / "recipes" / recipe.file_path)

    # Import the recipe module
    spec = importlib.util.spec_from_file_location("recipe_module", recipe_path)
    if not spec or not spec.loader:
        raise ImportError(f"Could not load recipe: {recipe_path}")

    module = importlib.util.module_from_spec(spec)
    sys.modules["recipe_module"] = module
    spec.loader.exec_module(module)

    signatures: Dict[str, Any] = {
        "recipe_name": recipe_name,
        "recipe_path": recipe_path,
        "signatures": {},
    }

    # Look for recipe class or function
    for item_name, item in inspect.getmembers(module):
        if inspect.isclass(item) and hasattr(item, "run"):
            # Class-based recipe
            signatures["type"] = "class"
            signatures["signatures"]["__init__"] = get_signature_info(item.__init__)
            signatures["signatures"]["run"] = get_signature_info(item.run)
            break
        elif inspect.isfunction(item) and item_name == "run":
            # Function-based recipe
            signatures["type"] = "function"
            signatures["signatures"]["run"] = get_signature_info(item)
            break

    if not signatures["signatures"]:
        raise ValueError(f"No valid recipe found in {recipe_path}")

    return signatures
