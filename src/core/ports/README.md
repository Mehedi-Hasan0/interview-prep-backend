## src/core/ports/

### Purpose

Defines interfaces (contracts) that allow the core domain to interact with the outside world without depending on implementation details. This is where Dependency Inversion happens.

### Responsibilities

- Define inbound ports (use cases the application offers)
- Define outbound ports (dependencies the application needs)
- Establish contracts between layers
- Enable testability through abstraction
- Allow swapping implementations without changing core logic

### What Goes Here

- **Inbound Ports**: Use case interfaces that define what operations the system provides
- **Outbound Ports**: Repository and service interfaces that define what the core needs
- Interface definitions only - NO implementations

### What DOESN'T Go Here

- Concrete implementations (those go in application or infrastructure)
- Business logic (that goes in domain)
- DTOs (those go with their implementations)

### Rules

1. **Interface Only**: Only interfaces, types, and abstract classes
2. **Direction Matters**:
   - Inbound: Called BY outer layers (controllers → use cases)
   - Outbound: Called BY core, implemented BY outer layers (use case → repository)
3. **Stability**: These interfaces change less frequently than implementations
4. **Single Responsibility**: Each interface should have one clear purpose

### Example Structure

```
inbound/
└── user/
    ├── create-user.use-case.ts        # Interface for creating user
    ├── authenticate-user.use-case.ts  # Interface for authentication
    └── find-user.use-case.ts          # Interface for finding users

outbound/
├── repositories/
│   └── user.repository.interface.ts   # What the domain needs from user persistence
└── services/
    ├── email.service.interface.ts     # What the domain needs from email service
    └── cache.service.interface.ts     # What the domain needs from cache
```

### Example Code Pattern

```typescript
// GOOD - Inbound port (use case interface)
export interface CreateUserUseCase {
  execute(request: CreateUserRequest): Promise<CreateUserResponse>;
}

export interface CreateUserRequest {
  email: string;
  password: string;
}

export interface CreateUserResponse {
  userId: string;
  email: string;
}

// GOOD - Outbound port (repository interface)
export interface UserRepository {
  save(user: User): Promise<User>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  existsByEmail(email: Email): Promise<boolean>;
}

// BAD - Mixing implementation with interface
export interface UserRepository {
  // Don't expose TypeORM concepts in the interface
  findOne(options: FindOneOptions<UserOrmEntity>): Promise<UserOrmEntity>;
}
```
