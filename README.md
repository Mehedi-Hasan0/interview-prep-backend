# BD Interview Prep

## Overview

**Product Goal**

Help junior–mid software developers in Bangladesh prepare for realistic IT interviews through structured, text-based mock interviews with actionable feedback.

### Installation

```bash
$ pnpm install
```

### Running the app

```bash
# development
$ pnpm run dev

# production mode
$ pnpm run start:prod
```

### Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### Project structure

```bash
src/
├── domain/
│ ├── entities/
│ └── interfaces/
├── modules/
│ ├── user/
│ │ ├── controllers/
│ │ ├── services/
│ │ ├── repositories/
│ │ ├── entities/
│ │ └── dto/
│ ├── auth/
│ │ └── [same structure]
│ ├── company/
│ │ └── [same structure]
│ └── question/
│ └── [same structure]
├── infrastructure/
│ ├── database/
│ ├── cache/
│ └── config/
├── common/
│ ├── decorators/
│ ├── filters/
│ ├── guards/
│ ├── interceptors/
│ └── utils/
└── main.ts
```
