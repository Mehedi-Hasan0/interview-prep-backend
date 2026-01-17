## src/core/domain/

### Purpose

Contains pure business entities and value objects that represent the core business domain. This is the heart of our application - the most important code that embodies our business rules.

### Responsibilities

- Define business entities with their behaviors and invariants
- Implement business rules and validations
- Define value objects for type-safe primitives
- Model aggregates and their consistency boundaries
- NO framework dependencies allowed
- NO infrastructure concerns (database, API, etc.)

### What Goes Here

- **Entities**: Business objects with identity (User, Company, Question, Interview)
- **Value Objects**: Immutable objects without identity (Email, Password, DifficultyRating)
- **Enums**: Business-relevant enumerations (QuestionType, InterviewStatus)
- **Domain Events**: Events that represent business occurrences
- **Aggregate Roots**: Entities that serve as consistency boundaries

### What DOESN'T Go Here

- Database entities (those go in infrastructure/adapters/persistence)
- API DTOs (those go in presentation layer)
- TypeORM decorators or any ORM code
- HTTP or WebSocket related code
- Any framework-specific code

### Rules

1. **Framework Independence**: Code here should be pure TypeScript with no external framework dependencies
2. **Rich Models**: Entities should contain business logic, not just data
3. **Immutability**: Value objects must be immutable
4. **Self-Validation**: Entities validate themselves in constructors or factory methods
5. **Ubiquitous Language**: Use business domain terminology, not technical terms

### Example Structure

```
user/
├── user.entity.ts              # User aggregate root
├── user.aggregate-root.ts      # User aggregate with full business logic
├── value-objects/
│   ├── email.vo.ts            # Email value object with validation
│   ├── password.vo.ts         # Password with hashing logic
│   └── user-role.vo.ts        # Role enumeration as value object
└── user-created.event.ts      # Domain event
```

### Example Code Pattern

```typescript
// GOOD - Rich domain entity
export class User {
  private constructor(
    private readonly id: UserId,
    private email: Email,
    private password: Password,
    private role: UserRole,
  ) {}

  static create(email: string, password: string): User {
    return new User(
      UserId.generate(),
      Email.create(email),
      Password.create(password),
      UserRole.USER,
    );
  }

  changeEmail(newEmail: string): void {
    this.email = Email.create(newEmail);
    // Domain logic: maybe send verification email event
  }

  hasRole(role: UserRole): boolean {
    return this.role.equals(role);
  }
}

// BAD - Anemic entity (just data, no behavior)
export class User {
  id: string;
  email: string;
  password: string;
  role: string;
}
```
