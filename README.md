# Tune Lab

Tune Lab is a [FastAPI](https://fastapi.tiangolo.com) + [NextJS](https://nextjs.org) application that is purpose built for [torchtune](https://github.com/pytorch/torchtune).

> [!NOTE]
> Tune Lab is in active development and is not yet ready for use.

## TLDR

Tune Lab contains two main components: a torchtune + FastAPI backend and a NextJS frontend. The backend is responsible for running finetuning experiments, while the frontend allows users to quickly launch torchtune's pre-built recipes from the convience of the browser.

## Intended Use

Clone the repo and implement your own Clerk auth application by creating an account on [Clerk](https://clerk.com), and updating the local .env or production environment variables in Vercel.

> [!WARNING]
> the purpose of the Clerk auth wall is to gate access to compute resources behind a protected route in the app. 

## Core Tooling

- [torchtune](https://pytorch.org/torchtune/stable/index.html): finetuning library
- [FastAPI](https://fastapi.tiangolo.com): RESTful API
- [NextJS](https://nextjs.org): React framework

## Secondary Tooling

- [Vercel](https://vercel.com): hosted deployment
- [shadcn/ui](https://ui.shadcn.com): UI components
- [Modal](https://modal.com): serverless compute
- [Weights & Biases](https://wandb.ai): experiment tracking
- [Clerk](https://clerk.com): authentication and authorization
- [Discord](https://discord.com): experiment notifications
- [Docusaurus](https://docusaurus.io): documentation


## Tertiary Tooling

- [LaunchDarkly](https://launchdarkly.com): feature flags
- [Neon](https://neon.tech/home): serverless postgreSQL database
- [Drizzle](https://orm.drizzle.team): database ORM

## AI Pair Programming

- [GitHub Copilot](https://github.com/features/copilot)

GitHub Copilot instructions can be viewed at [copilot-instructions.md](.github/copilot-instructions.md) and [copilot-personas](.github/copilot-personas/).

## Downstream Usage

Llama models tuned with Tune Lab are intended to be used with [Llama Stack](https://github.com/meta-llama/llama-stack) applications in [Llama Lab](https://github.com/theosis-ai/llama-lab).

## Contributing

Tune Lab is closed for contributions at this time. Thank you for your interest!

> [!NOTE]
> Tune Lab is a portfolio project of the core maintainer