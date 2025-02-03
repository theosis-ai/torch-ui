# Tune Lab

> [!NOTE]
> Tune Lab is in active development and is not yet ready for use.

Tune Lab is a [FastAPI](https://fastapi.tiangolo.com) + [NextJS](https://nextjs.org) application that is purpose built for [torchtune](https://github.com/pytorch/torchtune).

## TLDR

Tune Lab contains two main components: a torchtune + FastAPI backend and a NextJS frontend. The backend is responsible for running finetuning experiments, while the frontend allows users to quickly launch torchtune's in-built recipes from the convience of the browser.

Why use a mono-repo? Tune Lab is designed to be a standalone application that can be deployed to a server and used to manage experiments. The mono-repo structure makes it easy to deploy the application as a single unit, and to use GitHub Copilot to generate code across the backend and frontend by allowing Copilot to index the entire codebase.

## Pair Programming with GitHub Copilot and OpenAI 

Copilot benefits from having access to the entire codebase, and can generate code that is consistent across the backend and frontend. This makes it easier to maintain the application and to add new features.

Currently, Copilot receives basic instructions from [copilot-instructions](.github/copilot-instructions.md) and generates code based on those instructions. 

> [!NOTE]
> The instructions are a work in progress and will be updated as the application evolves.

Tune Lab's roadmap includes creating specialized personas for Copilot to act as a deep learning engineer, an infrastructure engineer, a backend engineer, and frontend engineer. These personas will be used to generate code that is specific to the task at hand, while maintaining focus on directives contained in copilot-instructions. 

## Core Tooling

- [torchtune](https://pytorch.org/torchtune/stable/index.html): finetuning library
- [Modal](https://modal.com): serverless compute
- [Weights & Biases](https://wandb.ai): experiment tracking
- [FastAPI](https://fastapi.tiangolo.com): RESTful API
- [NextJS](https://nextjs.org): React framework
- [shadcn/ui](https://ui.shadcn.com): UI components
- [Neon](https://neon.tech/home): serverless postgreSQL database
- [Clerk](https://clerk.com): authentication and authorization

## Secondary Tooling

- [Copilot](https://github.com/features/copilot): AI pair programming
- [Docusaurus](https://docusaurus.io): documentation
- [Discord](https://discord.com): experiment notifications
- [LaunchDarkly](https://launchdarkly.com): feature flags
- [Vercel](https://vercel.com): hosted deployment

## Downstream Usage

Llama models tuned with Tune Lab are intended to be used with [Llama Stack](https://github.com/meta-llama/llama-stack) applications in [Llama Lab](https://github.com/theosis-ai/llama-lab).

## Contributing

Tune Lab is closed for contributions at this time. Thank you for your interest!