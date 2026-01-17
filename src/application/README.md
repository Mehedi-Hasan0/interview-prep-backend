## src/application/

### Purpose

Contains use case implementations and application services that orchestrate domain objects to fulfill business operations. This layer coordinates the flow of data and enforces application-specific rules.

### Responsibilities

- Implement use cases (business operations)
- Orchestrate domain entities and services
- Coordinate transactions
- Map between domain and DTOs
- Enforce application-specific workflows
- Call outbound ports (repositories, services)

### What Goes Here

- **Use Case Implementations**: Concrete classes implementing inbound ports
- **Application Services**: Services that coordinate multiple use cases
- **DTOs**: Data Transfer Objects for use case requests/responses
- **Mappers**: Transform between domain entities and DTOs
- **Application Events**: Cross-cutting application concerns

### What DOESN'T Go Here

- Business rules (those go in domain entities)
- Infrastructure details (database, HTTP, etc.)
- Presentation concerns (validation decorators, API responses)
- Direct database access (use repositories instead)

### Rules

1. **Thin Orchestration**: Coordinate domain objects, don't duplicate business logic
2. **Use Domain Objects**: Work with domain entities, not database entities
3. **Call Through Ports**: Use repository/service interfaces, not concrete implementations
4. **One Use Case = One Operation**: Each use case should do ONE thing well
5. **Transaction Management**: Use cases define transaction boundaries

### Example Structure

```
use-cases/
└── user/
    ├── create-user/
    │   ├── create-user.use-case.impl.ts    # Implementation
    │   ├── create-user.dto.ts              # Request/Response DTOs
    │   └── create-user.spec.ts             # Unit tests
    └── authenticate-user/
        ├── authenticate-user.use-case.impl.ts
        ├── authenticate-user.dto.ts
        └── authenticate-user.spec.ts

services/
├── interview-orchestrator.service.ts       # Coordinates interview flow
└── question-selection.service.ts           # Application-level logic

mappers/
└── user.mapper.ts                          # Domain ↔ DTO transformations
```

### Example Code Pattern

```typescript
// GOOD - Use case implementation
@Injectable()
export class CreateUserUseCaseImpl implements CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,  // Outbound port
    private readonly eventPublisher: EventPublisher,  // Outbound port
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // Check business rule using repository
    const emailExists = await this.userRepository.existsByEmail(
      Email.create(request.email)
    );

    if (emailExists) {
      throw new EmailAlreadyExistsException();
    }

    // Create domain entity (business logic happens here)
    const user = User.create(request.email, request.password);

    // Persist using repository
    const savedUser = await this.userRepository.save(user);

    // Publish domain event
    await this.eventPublisher.publish(new UserCreatedEvent(savedUser.id));

    // Return DTO (not domain entity)
    return UserMapper.toResponse(savedUser);
  }
}

// BAD - Business logic in use case
async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
  // Don't validate email format here - that's domain logic
  if (!request.email.includes('@')) {
    throw new Error('Invalid email');
  }

  // Don't hash password here - that's domain logic
  const hashedPassword = await bcrypt.hash(request.password, 10);

  // Don't use ORM entities directly
  const ormEntity = new UserOrmEntity();
  ormEntity.email = request.email;
  await this.ormRepository.save(ormEntity);
}
```
