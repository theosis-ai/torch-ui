# Torchtune API Documentation

API documentation for the Torchtune FastAPI server. All examples assume the server is running at `http://localhost:8000`.

## Endpoints

### Download Models

```bash
# Download a model using curl
curl -X POST http://localhost:8000/download \
  -H "Content-Type: application/json" \
  -d '{"model_id": "meta-llama/Llama-2-7b-hf", "local_dir": "./models"}'
```

```python
# Download a model using Python
import requests

response = requests.post(
    "http://localhost:8000/download",
    json={
        "model_id": "meta-llama/Llama-2-7b-hf",
        "local_dir": "./models"
    }
)
print(response.json())
```

```typescript
// Download a model using Node.js
const response = await fetch("http://localhost:8000/download", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model_id: "meta-llama/Llama-2-7b-hf",
    local_dir: "./models"
  })
});
const paths = await response.json();
```

### List Recipes

Get a list of all available recipes and their configurations.

```bash
# curl
curl -X GET http://localhost:8000/recipes
```

```python
# Python
import requests

response = requests.get("http://localhost:8000/recipes")
recipes = response.json()
```

```javascript
// Node.js
const axios = require('axios');

const getRecipes = async () => {
  const response = await axios.get('http://localhost:8000/recipes');
  const recipes = response.data;
};
```

### Get Recipe Signatures

Get the function/class signatures for a specific recipe.

```bash
# curl
curl -X GET "http://localhost:8000/signatures?recipe_name=llama_recipe"
```

```python
# Python
import requests

recipe_name = "llama_recipe"
response = requests.get(f"http://localhost:8000/signatures", params={"recipe_name": recipe_name})
signatures = response.json()
```

```javascript
// Node.js
const axios = require('axios');

const getSignatures = async (recipeName) => {
  const response = await axios.get(`http://localhost:8000/signatures`, {
    params: { recipe_name: recipeName }
  });
  const signatures = response.data;
};
```

### Copy Recipe

Copy a built-in recipe or config to a local path.

```bash
# curl
curl -X POST http://localhost:8000/copy \
  -H "Content-Type: application/json" \
  -d '{"file": "llama_recipe", "destination": "./my_recipe.py"}'
```

```python
# Python
import requests

data = {
    "file": "llama_recipe",
    "destination": "./my_recipe.py",
    "no_clobber": False,
    "make_parents": True
}
response = requests.post("http://localhost:8000/copy", json=data)
```

```javascript
// Node.js
const axios = require('axios');

const copyRecipe = async () => {
  const data = {
    file: "llama_recipe",
    destination: "./my_recipe.py",
    no_clobber: false,
    make_parents: true
  };
  const response = await axios.post('http://localhost:8000/copy', data);
};
```

### Run Recipe

Run a recipe with specified configuration.

```bash
# curl
curl -X POST http://localhost:8000/run \
  -H "Content-Type: application/json" \
  -d '{
    "recipe_name": "llama_recipe",
    "config_name": "base_config",
    "distributed": false,
    "num_processes": 1
  }'
```

```python
# Python
import requests

data = {
    "recipe_name": "llama_recipe",
    "config_name": "base_config",
    "distributed": False,
    "num_processes": 1
}
response = requests.post("http://localhost:8000/run", json=data)
```

```javascript
// Node.js
const axios = require('axios');

const runRecipe = async () => {
  const data = {
    recipe_name: "llama_recipe",
    config_name: "base_config",
    distributed: false,
    num_processes: 1
  };
  const response = await axios.post('http://localhost:8000/run', data);
};
```

### Validate Config

Validate a configuration file.

```bash
# curl
curl -X POST http://localhost:8000/validate \
  -H "Content-Type: application/json" \
  -d '{"config": "./configs/my_config.yaml"}'
```

```python
# Python
import requests

data = {
    "config": "./configs/my_config.yaml"
}
response = requests.post("http://localhost:8000/validate", json=data)
```

```javascript
// Node.js
const axios = require('axios');

const validateConfig = async () => {
  const data = {
    config: "./configs/my_config.yaml"
  };
  const response = await axios.post('http://localhost:8000/validate', data);
};
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- 200: Success
- 400: Bad Request (invalid parameters)
- 500: Server Error

Error responses include a detail message explaining the error:

```json
{
  "detail": "Error message describing what went wrong"
}
```