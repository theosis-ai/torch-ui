from typing import List
from torchtune import _recipe_registry


def _list_recipes() -> list:
    """Return all available recipes.

    Returns:
        list[Recipe]: List of all available recipes
    """
    return [recipe.name for recipe in _recipe_registry.get_all_recipes()]


def _list_recipe_configs(recipe_name: str) -> List[str]:
    """Read and parse configs from a torchtune recipe.

    Args:
        recipe_name: Name of the built-in recipe

    Returns:
        Dict containing the recipe's configs
    """
    # Get recipe from registry
    recipes = _recipe_registry.get_all_recipes()
    recipe = next((r for r in recipes if r.name == recipe_name), None)

    if not recipe:
        raise ValueError(f"Recipe not found: {recipe_name}")

    return {"configs": [c.name for c in recipe.configs]}


def _list_recipe_config_paths(recipe_name: str) -> List[str]:
    """Read and parse configs from a torchtune recipe.

    Args:
        recipe_name: Name of the built-in recipe

    Returns:
        Dict containing the recipe's configs
    """
    # Get recipe from registry
    recipes = _recipe_registry.get_all_recipes()
    recipe = next((r for r in recipes if r.name == recipe_name), None)

    if not recipe:
        raise ValueError(f"Recipe not found: {recipe_name}")

    return {c.name: c.file_path for c in recipe.configs}


def _list_recipe_models(recipe_name: str) -> List[str]:
    """Read and parse models from a torchtune recipe.

    Args:
        recipe_name: Name of the built-in recipe

    Returns:
        Dict containing the recipe's models
    """
    # Get recipe from registry
    recipes = _recipe_registry.get_all_recipes()
    recipe = next((r for r in recipes if r.name == recipe_name), None)

    if not recipe:
        raise ValueError(f"Recipe not found: {recipe_name}")

    models = sorted(list(set([c.name.split("/")[0] for c in recipe.configs])))

    return {"models": models}
