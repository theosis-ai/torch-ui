from torchtune import _recipe_registry


def _list_recipes() -> list:
    """Return all available recipes.

    Returns:
        list[Recipe]: List of all available recipes
    """
    return [recipe.name for recipe in _recipe_registry.get_all_recipes()]
