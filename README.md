# Tune Lab

Tune Lab is a [FastAPI](https://fastapi.tiangolo.com) + [NextJS](https://nextjs.org) application that is purpose built for [torchtune](https://github.com/pytorch/torchtune).

> [!IMPORTANT]
> Tune Lab is in active development and is not yet ready for use

> [!IMPORTANT]
> Tune Lab will be built alongside [Copilot](https://github.com/features/copilot) and [Copilot Workspace](https://githubnext.com/projects/copilot-workspace), and is currently closed for contributions

> [!NOTE]
> Tune Lab is a portfolio project of [jxtngx](https://github.com/jxtngx)

## Intended Use

Clone the repo and:

- choose a local or Vercel hosted deployment
- create an account on [Clerk](https://clerk.com)
- create a Clerk application, and update the local .env or production environment in Vercel
- create a Discord server application key, and update the local .env or production environment in Vercel
- select a compute provider backend or implement a custom compute backend, and update the local .env or production environment in Vercel

> [!WARNING]
> the purpose of the Clerk auth wall is to gate access to GPU resources

## Structure

- [tuneapi/](./tuneapi): FastAPI and compute backend
- [tunelab/](./tunelab): NextJS frontend
- [copilot-instructions](.github/copilot-instructions.md): Copilot system prompt
- [.instructions/](./.instructions): Engineering personas for Copilot instructions
- [.knowledge/](./.knowledge): Knowledge base for Copilot
- [.system/](./.system): System design charts for Copilot

> [!NOTE]
> [tunelab/](./tunelab) is a monorepo created from the shadcn/ui template and uses turborepo as the build system

## Downstream Usage

Llama models tuned with Tune Lab are intended to be used with [Llama Stack](https://github.com/meta-llama/llama-stack) applications in [Llama Lab](https://github.com/theosis-ai/llama-lab).
