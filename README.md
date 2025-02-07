# Tune Lab

Tune Lab is a [FastAPI](https://fastapi.tiangolo.com) + [NextJS](https://nextjs.org) application that is purpose built for [torchtune](https://github.com/pytorch/torchtune).

> [!NOTE]
> Tune Lab is in active development and is not yet ready for use

> [!IMPORTANT]
> Tune Lab will be built alongside Copilot and is currently closed for contributions

## Intended Use

Clone the repo and:

- choose local or Vercel hosted deployment
- implement your own Clerk auth application by creating an account on [Clerk](https://clerk.com), and update the local .env or production environment in Vercel.
- creating a Discord server application key, and update the local .env or production environment in Vercel.
- select a compute backend or implement a custom compute backend, and update the local .env or production environment in Vercel.

> [!WARNING]
> the purpose of the Clerk auth wall is to gate access to compute resources behind a protected route in the app

## Structure

- [api/](./api) contains the FastAPI backend
- [ui/](./ui) contains the NextJS frontend
- [copilot-instructions](.github/copilot-instructions.md) contains the Copilot system prompt
- [.instructions/](./.instructions) contains engineering personas for Copilot instructions
- [.knowledge/](./.knowledge) contains the knowledge base for Copilot
- [.system/](./.system) contains system design charts for Copilot

## Downstream Usage

Llama models tuned with Tune Lab are intended to be used with [Llama Stack](https://github.com/meta-llama/llama-stack) applications in [Llama Lab](https://github.com/theosis-ai/llama-lab).
