from pathlib import Path
from typing import Dict, List, Optional

from pydantic import BaseModel, field_validator


class DownloadRequest(BaseModel):
    repo_id: str
    output_dir: Optional[Path] = None
    hf_token: Optional[str] = None
    ignore_patterns: Optional[str] = None
    source: str = "huggingface"
    kaggle_username: Optional[str] = None
    kaggle_api_key: Optional[str] = None


class CopyRequest(BaseModel):
    file: str
    destination: Path
    no_clobber: bool = False
    make_parents: bool = False


class RunRequest(BaseModel):
    recipe: str
    config: str
    distributed_args: Optional[List[str]] = None
    config_overrides: Optional[List[str]] = None

    @field_validator("distributed_args", "config_overrides")
    def ensure_list(cls, v):
        if v is None:
            return []
        return v


class ValidateRequest(BaseModel):
    config: Path


class Recipe(BaseModel):
    name: str
    configs: List[str]
    supports_distributed: bool


class ListResponse(BaseModel):
    recipes: List[str]


class RecipeConfigRequest(BaseModel):
    recipe: str


class RecipeConfigResponse(BaseModel):
    configs: Dict[str, str]


class RecipeModelResponse(BaseModel):
    models: Dict[str, str]


class ConfigSettingsRequest(BaseModel):
    recipe: str
    config: str


class ConfigSettingsResponse(BaseModel):
    settings: List[str]
