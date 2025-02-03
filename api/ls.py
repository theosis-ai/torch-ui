from typing import List
from torchtune import _recipe_registry


def _list_recipes() -> list:
    """Return all available recipes.

    Returns:
        list[Recipe]: List of all available recipes
    """
    return [recipe.name for recipe in _recipe_registry.get_all_recipes()]


def _list_recipe_configs(recipe_name: str) -> List[str]:
    """Read and parse signatures from a torchtune recipe.

    Args:
        recipe_name: Name of the built-in recipe

    Returns:
        Dict containing the recipe's signatures
    """
    # Get recipe from registry
    recipes = _recipe_registry.get_all_recipes()
    recipe = next((r for r in recipes if r.name == recipe_name), None)

    if not recipe:
        raise ValueError(f"Recipe not found: {recipe_name}")

    return [c.name for c in recipe.configs]
