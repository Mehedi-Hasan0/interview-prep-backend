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
├── core/                                    # Domain Layer (Framework-Agnostic)
│   ├── domain/                              # Business entities and value objects
│   │   ├── user/
│   │   │   ├── user.entity.ts               # Domain entity (not TypeORM entity)
│   │   │   ├── value-objects/
│   │   │   │   ├── email.vo.ts
│   │   │   │   ├── password.vo.ts
│   │   │   │   └── user-role.vo.ts
│   │   │   └── user.aggregate-root.ts
│   │   ├── company/
│   │   │   ├── company.entity.ts
│   │   │   ├── company-profile.entity.ts
│   │   │   └── value-objects/
│   │   │       ├── company-name.vo.ts
│   │   │       └── difficulty-rating.vo.ts
│   │   ├── question/
│   │   │   ├── question.entity.ts
│   │   │   ├── question-type.enum.ts
│   │   │   ├── difficulty.enum.ts
│   │   │   └── value-objects/
│   │   │       └── question-text.vo.ts
│   │   ├── concept/
│   │   │   ├── concept.entity.ts
│   │   │   ├── skill-area.entity.ts
│   │   │   └── concept-prerequisite.entity.ts
│   │   └── interview/
│   │       ├── interview.entity.ts
│   │       ├── interview-question.entity.ts
│   │       ├── answer.entity.ts
│   │       ├── interview-status.enum.ts
│   │       └── value-objects/
│   │           └── performance-score.vo.ts
│   │
│   ├── ports/                               # Interfaces for external dependencies
│   │   ├── inbound/                         # Driving ports (what the core offers)
│   │   │   ├── user/
│   │   │   │   ├── create-user.use-case.ts
│   │   │   │   ├── find-user.use-case.ts
│   │   │   │   └── update-user.use-case.ts
│   │   │   ├── company/
│   │   │   │   ├── create-company.use-case.ts
│   │   │   │   ├── find-company.use-case.ts
│   │   │   │   └── update-company-profile.use-case.ts
│   │   │   ├── question/
│   │   │   │   ├── create-question.use-case.ts
│   │   │   │   ├── tag-question.use-case.ts
│   │   │   │   └── search-questions.use-case.ts
│   │   │   └── interview/
│   │   │       ├── start-interview.use-case.ts
│   │   │       ├── submit-answer.use-case.ts
│   │   │       └── complete-interview.use-case.ts
│   │   │
│   │   └── outbound/                        # Driven ports (what the core needs)
│   │       ├── repositories/                # Repository interfaces
│   │       │   ├── user.repository.interface.ts
│   │       │   ├── company.repository.interface.ts
│   │       │   ├── question.repository.interface.ts
│   │       │   ├── concept.repository.interface.ts
│   │       │   └── interview.repository.interface.ts
│   │       ├── services/                    # External service interfaces
│   │       │   ├── email.service.interface.ts
│   │       │   ├── cache.service.interface.ts
│   │       │   ├── llm.service.interface.ts
│   │       │   └── logger.service.interface.ts
│   │       └── events/                      # Event publisher interfaces
│   │           └── event-publisher.interface.ts
│   │
│   └── exceptions/                          # Domain-specific exceptions
│       ├── domain.exception.ts
│       ├── user/
│       │   ├── user-not-found.exception.ts
│       │   ├── email-already-exists.exception.ts
│       │   └── invalid-credentials.exception.ts
│       ├── company/
│       │   └── company-not-found.exception.ts
│       ├── question/
│       │   └── question-not-found.exception.ts
│       └── interview/
│           ├── interview-not-found.exception.ts
│           └── interview-already-completed.exception.ts
│
├── application/                             # Application Layer (Use Cases)
│   ├── use-cases/                           # Use case implementations
│   │   ├── user/
│   │   │   ├── create-user/
│   │   │   │   ├── create-user.use-case.impl.ts
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   └── create-user.spec.ts
│   │   │   ├── authenticate-user/
│   │   │   │   ├── authenticate-user.use-case.impl.ts
│   │   │   │   ├── authenticate-user.dto.ts
│   │   │   │   └── authenticate-user.spec.ts
│   │   │   └── find-user/
│   │   │       ├── find-user.use-case.impl.ts
│   │   │       └── find-user.spec.ts
│   │   ├── company/
│   │   │   ├── create-company/
│   │   │   ├── update-company-profile/
│   │   │   └── find-companies/
│   │   ├── question/
│   │   │   ├── create-question/
│   │   │   ├── tag-question-with-concepts/
│   │   │   └── search-questions/
│   │   └── interview/
│   │       ├── start-interview/
│   │       ├── submit-answer/
│   │       ├── generate-follow-up/
│   │       └── complete-interview/
│   │
│   ├── services/                            # Application services (orchestration)
│   │   ├── interview-orchestrator.service.ts
│   │   ├── question-selection.service.ts
│   │   └── performance-analyzer.service.ts
│   │
│   └── mappers/                             # Domain to DTO mappers
│       ├── user.mapper.ts
│       ├── company.mapper.ts
│       ├── question.mapper.ts
│       └── interview.mapper.ts
│
├── infrastructure/                          # Infrastructure Layer (Adapters)
│   ├── adapters/                            # Outbound adapters (driven)
│   │   ├── persistence/                     # Database adapters
│   │   │   ├── typeorm/
│   │   │   │   ├── entities/                # TypeORM entities (different from domain)
│   │   │   │   │   ├── user.orm-entity.ts
│   │   │   │   │   ├── company.orm-entity.ts
│   │   │   │   │   ├── question.orm-entity.ts
│   │   │   │   │   ├── concept.orm-entity.ts
│   │   │   │   │   └── interview.orm-entity.ts
│   │   │   │   ├── mappers/                 # ORM to Domain mappers
│   │   │   │   │   ├── user.orm-mapper.ts
│   │   │   │   │   ├── company.orm-mapper.ts
│   │   │   │   │   ├── question.orm-mapper.ts
│   │   │   │   │   └── interview.orm-mapper.ts
│   │   │   │   ├── repositories/            # Repository implementations
│   │   │   │   │   ├── user.typeorm-repository.ts
│   │   │   │   │   ├── company.typeorm-repository.ts
│   │   │   │   │   ├── question.typeorm-repository.ts
│   │   │   │   │   ├── concept.typeorm-repository.ts
│   │   │   │   │   └── interview.typeorm-repository.ts
│   │   │   │   ├── migrations/
│   │   │   │   │   └── [timestamp]-initial-schema.ts
│   │   │   │   └── typeorm.config.ts
│   │   │   └── redis/
│   │   │       ├── redis.config.ts
│   │   │       └── cache.redis-adapter.ts
│   │   │
│   │   ├── external-services/               # External API adapters
│   │   │   ├── llm/
│   │   │   │   ├── openai.adapter.ts
│   │   │   │   ├── anthropic.adapter.ts
│   │   │   │   └── llm.factory.ts
│   │   │   ├── email/
│   │   │   │   ├── sendgrid.adapter.ts
│   │   │   │   └── email.factory.ts
│   │   │   └── storage/
│   │   │       └── s3.adapter.ts
│   │   │
│   │   └── messaging/                       # Event/Message adapters
│   │       ├── bullmq/
│   │       │   ├── queue.adapter.ts
│   │       │   └── worker.adapter.ts
│   │       └── events/
│   │           └── event-publisher.adapter.ts
│   │
│   ├── configuration/                       # Configuration management
│   │   ├── environment/
│   │   │   ├── environment.schema.ts
│   │   │   ├── environment.validator.ts
│   │   │   └── environment.service.ts
│   │   └── modules/
│   │       ├── database.config.ts
│   │       ├── redis.config.ts
│   │       ├── jwt.config.ts
│   │       └── llm.config.ts
│   │
│   └── common/                              # Shared infrastructure utilities
│       ├── decorators/
│       │   ├── current-user.decorator.ts
│       │   └── public.decorator.ts
│       ├── guards/
│       │   ├── jwt-auth.guard.ts
│       │   └── roles.guard.ts
│       ├── interceptors/
│       │   ├── logging.interceptor.ts
│       │   ├── timeout.interceptor.ts
│       │   └── transform.interceptor.ts
│       ├── filters/
│       │   ├── http-exception.filter.ts
│       │   ├── domain-exception.filter.ts
│       │   └── all-exceptions.filter.ts
│       ├── middleware/
│       │   └── correlation-id.middleware.ts
│       └── logger/
│           ├── logger.service.ts
│           └── logger.module.ts
│
├── presentation/                            # Presentation Layer (Inbound Adapters)
│   ├── http/                                # HTTP REST API
│   │   ├── controllers/
│   │   │   ├── v1/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── auth.controller.ts
│   │   │   │   │   ├── dtos/
│   │   │   │   │   │   ├── register.dto.ts
│   │   │   │   │   │   ├── login.dto.ts
│   │   │   │   │   │   └── refresh-token.dto.ts
│   │   │   │   │   └── auth.controller.spec.ts
│   │   │   │   ├── users/
│   │   │   │   │   ├── users.controller.ts
│   │   │   │   │   ├── dtos/
│   │   │   │   │   │   ├── create-user.dto.ts
│   │   │   │   │   │   └── update-user.dto.ts
│   │   │   │   │   └── users.controller.spec.ts
│   │   │   │   ├── companies/
│   │   │   │   │   ├── companies.controller.ts
│   │   │   │   │   ├── admin-companies.controller.ts
│   │   │   │   │   └── dtos/
│   │   │   │   ├── questions/
│   │   │   │   │   ├── questions.controller.ts
│   │   │   │   │   ├── admin-questions.controller.ts
│   │   │   │   │   └── dtos/
│   │   │   │   └── interviews/
│   │   │   │       ├── interviews.controller.ts
│   │   │   │       └── dtos/
│   │   │   └── health/
│   │   │       └── health.controller.ts
│   │   │
│   │   └── middleware/
│   │       └── request-logger.middleware.ts
│   │
│   ├── websocket/                           # WebSocket Gateway
│   │   ├── gateways/
│   │   │   ├── interview/
│   │   │   │   ├── interview.gateway.ts
│   │   │   │   ├── interview-session.manager.ts
│   │   │   │   └── dtos/
│   │   │   │       ├── start-interview.dto.ts
│   │   │   │       └── submit-answer.dto.ts
│   │   │   └── notifications/
│   │   │       └── notifications.gateway.ts
│   │   │
│   │   └── guards/
│   │       └── ws-jwt.guard.ts
│   │
│   └── cli/                                 # CLI commands (future)
│       └── commands/
│           └── seed-data.command.ts
│
├── shared/                                  # Shared Kernel (cross-cutting)
│   ├── types/
│   │   ├── pagination.types.ts
│   │   ├── filter.types.ts
│   │   └── result.types.ts
│   ├── utils/
│   │   ├── date.utils.ts
│   │   ├── string.utils.ts
│   │   └── validation.utils.ts
│   ├── constants/
│   │   ├── error-codes.ts
│   │   └── app.constants.ts
│   └── interfaces/
│       ├── base-repository.interface.ts
│       └── use-case.interface.ts
│
├── modules/                                 # NestJS Module Definitions
│   ├── user.module.ts
│   ├── auth.module.ts
│   ├── company.module.ts
│   ├── question.module.ts
│   ├── concept.module.ts
│   ├── interview.module.ts
│   ├── admin.module.ts
│   └── infrastructure.module.ts
│
├── app.module.ts                            # Root application module
└── main.ts                                  # Application entry point
```
