from pathlib import Path
from typing import List, Dict, Any
import time

import uvicorn
from fastapi import FastAPI, HTTPException, Request
from omegaconf import OmegaConf

from download import _download
from cp import _cp
from run import _run_recipe
from validate import _validate_config
from ls import (
    _list_recipes,
    _list_recipe_configs,
    _list_recipe_models,
    _list_recipe_config_paths,
)
from configs import _get_config_settings
from logger import logger
from models import (
    CopyRequest,
    DownloadRequest,
    ListResponse,
    RunRequest,
    ValidateRequest,
    RecipeConfigRequest,
    RecipeConfigResponse,
    RecipeModelResponse,
    ConfigSettingsRequest,
    ConfigSettingsResponse,
)

app = FastAPI(
    title="torchtune API",
    description="REST API for torchtune model finetuning",
    version="0.1.0",
    docs_url="/api/py/docs",
    openapi_url="/api/py/openapi.json",
)


@app.middleware("http")
async def log_requests(request: Request, call_next):
    """Log all requests with timing information"""
    start_time = time.time()
    response = await call_next(request)
    duration = time.time() - start_time
    logger.info(
        f"{request.method} {request.url.path} "
        f"- Status: {response.status_code} "
        f"- Duration: {duration:.3f}s"
    )
    return response


@app.post("/download")
async def download(request: DownloadRequest) -> List[Path]:
    """Download a model from Hugging Face or Kaggle Model Hub"""
    try:
        return _download(**request.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/recipes", response_model=ListResponse)
async def recipes() -> ListResponse:
    """List all available recipes and configs"""
    try:
        logger.info("Fetching available recipes and configs")
        recipes = _list_recipes()
        logger.info(f"Found {len(recipes)} recipes")
        return ListResponse(recipes=recipes)
    except Exception as e:
        logger.error(f"Failed to list recipes: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/copy")
async def copy(request: CopyRequest) -> Path:
    """Copy a built-in recipe or config to a local path"""
    try:
        logger.info(f"Copying recipe/config with params: {request.model_dump()}")
        result = _cp(**request.model_dump())
        logger.info(f"Successfully copied to: {result}")
        return result
    except Exception as e:
        logger.error(f"Copy operation failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/run")
async def run(request: RunRequest) -> None:
    """Run a recipe with specified config and overrides"""
    try:
        logger.info(f"Running recipe with config: {request.model_dump()}")
        _run_recipe(**request.model_dump())
        logger.info("Recipe execution completed successfully")
    except Exception as e:
        logger.error(f"Recipe execution failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/validate")
async def validate(request: ValidateRequest) -> None:
    """Validate a config file"""
    try:
        logger.info(f"Validating config file: {request.config}")
        cfg = OmegaConf.load(request.config)
        _validate_config(cfg)
        logger.info(f"Config validation successful: {request.config}")
    except Exception as e:
        logger.error(f"Config validation failed: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/configs", response_model=RecipeConfigResponse)
async def get_configs(request: RecipeConfigRequest) -> Dict[str, Any]:
    """Get the available configs for a recipe"""
    try:
        logger.info(f"Reading available configs for recipe: {request.recipe}")
        configs = _list_recipe_configs(request.recipe)
        logger.info(f"Successfully read configsfor: {request.recipe}")
        return configs
    except Exception as e:
        logger.error(f"Failed to read configs: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/models", response_model=RecipeModelResponse)
async def get_models(request: RecipeConfigRequest) -> Dict[str, Any]:
    """Get the available models for a recipe"""
    try:
        logger.info(f"Reading available models for recipe: {request.recipe}")
        models = _list_recipe_models(request.recipe)
        logger.info(f"Successfully read models for: {request.recipe}")
        return models
    except Exception as e:
        logger.error(f"Failed to read models: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/settings", response_model=ConfigSettingsResponse)
async def get_settings(request: ConfigSettingsRequest) -> Dict[str, Any]:
    """Get the settings for a config"""
    try:
        logger.info(f"Reading available settings for config: {request.config}")
        all_configs = _list_recipe_config_paths(request.recipe)
        requested_config = all_configs.get(request.config, None)
        settings = _get_config_settings(requested_config)
        keys = list(settings["settings"].keys())
        logger.info(f"Successfully read settings for: {request.config}")
        return {"settings": keys}
    except Exception as e:
        logger.error(f"Failed to read settings: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


def serve(host: str = "127.0.0.1", port: int = 8000) -> None:
    """Start the API server"""
    uvicorn.run(app, host=host, port=port)


if __name__ == "__main__":
    serve()
