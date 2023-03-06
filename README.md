# SSI Service Admin README

Congrats, project leads! You got a new project to grow!

This stub is meant to help you form a strong community around your work. It's yours to adapt, and may 
diverge from this initial structure. Just keep the files seeded in this repo, and the rest is yours to evolve! 

## Getting Started

To get started, clone the repo locally and update the [SSI Service](https://github.com/TBD54566975/ssi-service) submodule:

### Update Submodules

```
git submodule update --init --recursive
```

### Install dependecies

```
npm i
```

### Run in development mode
With Docker up and running, run the SSI Service and UI in development mode:

```
npm run start:ssi
```

Open the project in [localhost:3000](http://localhost:3000)

### Available scripts

#### `npm start` or `npm dev`
To run in development mode (with mocks only)

### `npm run service`
To run the SSI Service only with Docker running (no UI)

### `npm run start:ssi`
To run both UI and SSI Service

## Introduction

Orient users to the project here. This is a good place to start with an assumption
that the user knows very little - so start with the Big Picture and show how this
project fits into it. It may be good to reference/link the broader architecture in the
`collaboration` repo or the developer site here.

Then maybe a dive into what this project does.

Diagrams and other visuals are helpful here. Perhaps code snippets showing usage.

Project leads should complete, alongside this `README`:
* [CODEOWNERS](./CODEOWNERS) - set project lead(s)
* [CONTRIBUTING.md](./CONTRIBUTING.md) - Fill out how to: install prereqs, build, test, run, access CI, chat, discuss, file issues

The other files in this template repo may be used as-is:
* [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
* [GOVERNANCE.md](./GOVERNANCE.md)
* [LICENSE](./LICENSE)

## Project Resources

| Resource                                   | Description                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------------ |
| [CODEOWNERS](./CODEOWNERS)                 | Outlines the project lead(s)                                                   |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | Expected behavior for project contributors, promoting a welcoming environment |
| [CONTRIBUTING.md](./CONTRIBUTING.md)       | Developer guide to build, test, run, access CI, chat, discuss, file issues     |
| [GOVERNANCE.md](./GOVERNANCE.md)           | Project governance                                                             |
| [LICENSE](./LICENSE)                       | Apache License, Version 2.0                                                    |