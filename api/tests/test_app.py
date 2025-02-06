import pytest
from fastapi.testclient import TestClient
from pathlib import Path
from unittest.mock import patch
from app import app

from models import (
    DownloadRequest,
    CopyRequest,
    RunRequest,
    ValidateRequest,
    RecipeConfigRequest,
    ConfigSettingsRequest,
)

client = TestClient(app)


@pytest.fixture
def mock_download():
    with patch("app._download") as mock:
        mock.return_value = [Path("/fake/path")]
        yield mock


@pytest.fixture
def mock_list_recipes():
    with patch("app._list_recipes") as mock:
        mock.return_value = ["recipe1", "recipe2"]
        yield mock


@pytest.fixture
def mock_cp():
    with patch("app._cp") as mock:
        mock.return_value = Path("/fake/copy/path")
        yield mock


@pytest.fixture
def mock_run_recipe():
    with patch("app._run_recipe") as mock:
        yield mock


@pytest.fixture
def mock_validate_config():
    with patch("app._validate_config") as mock:
        yield mock


@pytest.fixture
def mock_list_recipe_configs():
    with patch("app._list_recipe_configs") as mock:
        mock.return_value = {"config1": {}, "config2": {}}
        yield mock


@pytest.fixture
def mock_list_recipe_models():
    with patch("app._list_recipe_models") as mock:
        mock.return_value = {"model1": {}, "model2": {}}
        yield mock


@pytest.fixture
def mock_list_recipe_config_paths():
    with patch("app._list_recipe_config_paths") as mock:
        mock.return_value = {"config1": "/path/1", "config2": "/path/2"}
        yield mock


@pytest.fixture
def mock_get_config_settings():
    with patch("app._get_config_settings") as mock:
        mock.return_value = {"settings": {"param1": {}, "param2": {}}}
        yield mock


def test_download_endpoint(mock_download):
    request = DownloadRequest(source="hf", model="bert-base")
    response = client.post("/download", json=request.model_dump())
    assert response.status_code == 200
    mock_download.assert_called_once_with(source="hf", model="bert-base")


def test_recipes_endpoint(mock_list_recipes):
    response = client.get("/recipes")
    assert response.status_code == 200
    assert response.json() == {"recipes": ["recipe1", "recipe2"]}
    mock_list_recipes.assert_called_once()


def test_copy_endpoint(mock_cp):
    request = CopyRequest(source="recipe", destination="/dest")
    response = client.post("/copy", json=request.model_dump())
    assert response.status_code == 200
    mock_cp.assert_called_once_with(source="recipe", destination="/dest")


def test_run_endpoint(mock_run_recipe):
    request = RunRequest(recipe="test_recipe", config="test_config")
    response = client.post("/run", json=request.model_dump())
    assert response.status_code == 200
    mock_run_recipe.assert_called_once_with(recipe="test_recipe", config="test_config")


def test_validate_endpoint(mock_validate_config):
    request = ValidateRequest(config="/path/config.yaml")
    response = client.post("/validate", json=request.model_dump())
    assert response.status_code == 200
    mock_validate_config.assert_called_once()


def test_configs_endpoint(mock_list_recipe_configs):
    request = RecipeConfigRequest(recipe="test_recipe")
    response = client.get("/configs", params=request.model_dump())
    assert response.status_code == 200
    assert response.json() == {"config1": {}, "config2": {}}
    mock_list_recipe_configs.assert_called_once_with("test_recipe")


def test_models_endpoint(mock_list_recipe_models):
    request = RecipeConfigRequest(recipe="test_recipe")
    response = client.get("/models", params=request.model_dump())
    assert response.status_code == 200
    assert response.json() == {"model1": {}, "model2": {}}
    mock_list_recipe_models.assert_called_once_with("test_recipe")


def test_settings_endpoint(mock_list_recipe_config_paths, mock_get_config_settings):
    request = ConfigSettingsRequest(recipe="test_recipe", config="config1")
    response = client.get("/settings", params=request.model_dump())
    assert response.status_code == 200
    assert response.json() == {"settings": ["param1", "param2"]}
    mock_list_recipe_config_paths.assert_called_once_with("test_recipe")
    mock_get_config_settings.assert_called_once()


def test_error_handling():
    with patch("app._download", side_effect=Exception("Test error")):
        request = DownloadRequest(source="hf", model="invalid")
        response = client.post("/download", json=request.model_dump())
        assert response.status_code == 400
        assert response.json()["detail"] == "Test error"
