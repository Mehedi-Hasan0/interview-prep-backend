# Hexagonal Architecture Decision Guide

## Quick Decision Guide

**"Where should I put this code?"**

| What is it?               | Where does it go?                                           |
| ------------------------- | ----------------------------------------------------------- |
| Business rule             | `core/domain`                                               |
| Entity with identity      | `core/domain/[feature]/[entity].entity.ts`                  |
| Immutable validated value | `core/domain/[feature]/value-objects/`                      |
| Use case interface        | `core/ports/inbound/`                                       |
| Repository interface      | `core/ports/outbound/repositories/`                         |
| Use case implementation   | `application/use-cases/`                                    |
| Entity ↔ DTO mapper       | `application/mappers/`                                      |
| TypeORM entity            | `infrastructure/adapters/persistence/typeorm/entities/`     |
| Repository implementation | `infrastructure/adapters/persistence/typeorm/repositories/` |
| Database migration        | `infrastructure/adapters/persistence/typeorm/migrations/`   |
| External API client       | `infrastructure/adapters/external-services/`                |
| REST controller           | `presentation/http/controllers/`                            |
| WebSocket gateway         | `presentation/websocket/gateways/`                          |
| API request DTO           | `presentation/http/controllers/[version]/[feature]/dtos/`   |
| Utility function          | `shared/utils/`                                             |
| Application constant      | `shared/constants/`                                         |
| NestJS module             | `modules/`                                                  |

**"Can layer X import from layer Y?"**

| From ↓ To →        | Domain | Ports             | Application | Infrastructure | Presentation | Shared |
| ------------------ | ------ | ----------------- | ----------- | -------------- | ------------ | ------ |
| **Domain**         | ✅     | ❌                | ❌          | ❌             | ❌           | ✅     |
| **Ports**          | ✅     | ✅                | ❌          | ❌             | ❌           | ✅     |
| **Application**    | ✅     | ✅                | ✅          | ❌             | ❌           | ✅     |
| **Infrastructure** | ✅     | ✅                | ❌          | ✅             | ❌           | ✅     |
| **Presentation**   | ❌     | ✅ (inbound only) | ❌          | ❌             | ✅           | ✅     |
| **Shared**         | ❌     | ❌                | ❌          | ❌             | ❌           | ✅     |

✅ = Allowed
❌ = Not Allowed

**Key Rule**: Dependencies point INWARD. Inner layers never depend on outer layers.
