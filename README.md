# SSI Service Admin README

## Getting Started

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

#### `npm start` or `npm run dev`
To run in development mode (with mocks only)

#### `npm run service`
To run the SSI Service only with Docker running (no UI)

#### `npm run start:ssi`
To run both UI and SSI Service

#### `npm run reset-service`
To remove/reset Docker containers

## Introduction

The SSI Admin UI is a GUI for TBD's [SSI Service](https://github.com/TBD54566975/ssi-service). The goal is to provide a visual way to interact with the Verifiable Credential ecosystem via the SSI Service, sans a CLI. The eventual aim is to abstract away as much noise as is reasonable, which means setting a few opiniated defaults throughout the journey. 

The main SSI user flows the Admin UI sets out to support are:
- Create and manage Decentralized IDs
- Create and manage Schemas
- Issue, verify, and manage Verifiable Credentials
- Create and manage Credential Manifests
- Create and manage Issuance Templates
- Review, accept, or deny Applications for Credentials
- Create and manage Presentation Definitions
- Review, accept, or deny Presentation Submissions

Here are a few visual examples of the UX decision trees:

<img width="1160" alt="Screenshot 2023-03-06 at 11 31 29 AM" src="https://user-images.githubusercontent.com/102400653/223213348-56486e42-37e4-4fa3-a939-107918572024.png">
<img width="1147" alt="Screenshot 2023-03-06 at 11 31 38 AM" src="https://user-images.githubusercontent.com/102400653/223213363-53344583-4825-49a3-9ebd-6c29981f5620.png">
<img width="1355" alt="Screenshot 2023-03-06 at 11 31 44 AM" src="https://user-images.githubusercontent.com/102400653/223213368-d20e3ec3-b64e-42cc-a1eb-ccab230df2f8.png">
<img width="1342" alt="Screenshot 2023-03-06 at 11 31 51 AM" src="https://user-images.githubusercontent.com/102400653/223213376-7df6cb26-18b0-46ed-92e4-e2f0314ef0c7.png">



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
