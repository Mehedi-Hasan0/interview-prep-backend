## src/infrastructure/

### Purpose

Contains all framework-specific implementations and external system adapters. This layer implements the outbound ports defined by the core and handles all technical details.

### Responsibilities

- Implement repository interfaces using specific technologies (TypeORM, etc.)
- Integrate with external services (LLM APIs, email, storage)
- Manage infrastructure configuration
- Handle framework-specific concerns
- Implement persistence, caching, messaging, etc.

### What Goes Here

- **Database Adapters**: TypeORM entities, repositories, migrations
- **External Service Adapters**: API clients for third-party services
- **Configuration**: Environment variables, validation, module config
- **Messaging**: Queue adapters, event publishers
- **Common Infrastructure**: Logging, monitoring, middleware

### What DOESN'T Go Here

- Business rules (those go in domain)
- Use case implementations (those go in application)
- HTTP controllers (those go in presentation)

### Rules

1. **Implement Ports**: Infrastructure adapters implement interfaces from core/ports/outbound
2. **Isolate Dependencies**: Each adapter should isolate one external dependency
3. **Framework Specifics**: This is the ONLY place for framework-specific code
4. **Separate ORM Entities**: TypeORM entities are different from domain entities
5. **Mappers Required**: Always map between ORM entities and domain entities

### Example Structure - infrastructure/adapters/persistence/typeorm/

```
entities/
├── user.orm-entity.ts              # TypeORM entity (NOT domain entity)
├── company.orm-entity.ts
└── question.orm-entity.ts

mappers/
├── user.orm-mapper.ts              # Maps ORM ↔ Domain
└── company.orm-mapper.ts

repositories/
├── user.typeorm-repository.ts      # Implements UserRepository interface
└── company.typeorm-repository.ts

migrations/
└── 1234567890-initial-schema.ts    # Database migrations
```

### Example Code Pattern

```typescript
// GOOD - Repository implementation
@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepository: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<User> {
    // Map domain entity to ORM entity
    const ormEntity = UserOrmMapper.toOrm(user);

    // Use TypeORM to persist
    const saved = await this.ormRepository.save(ormEntity);

    // Map back to domain entity
    return UserOrmMapper.toDomain(saved);
  }

  async findById(id: UserId): Promise<User | null> {
    const ormEntity = await this.ormRepository.findOne({
      where: { id: id.value },
    });

    return ormEntity ? UserOrmMapper.toDomain(ormEntity) : null;
  }
}

// GOOD - ORM Entity (separate from domain)
@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column()
  role: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

// GOOD - Mapper between layers
export class UserOrmMapper {
  static toDomain(ormEntity: UserOrmEntity): User {
    return User.reconstitute(
      UserId.create(ormEntity.id),
      Email.create(ormEntity.email),
      Password.fromHash(ormEntity.passwordHash),
      UserRole.fromString(ormEntity.role),
    );
  }

  static toOrm(domainEntity: User): UserOrmEntity {
    const orm = new UserOrmEntity();
    orm.id = domainEntity.id.value;
    orm.email = domainEntity.email.value;
    orm.passwordHash = domainEntity.password.hash;
    orm.role = domainEntity.role.value;
    return orm;
  }
}
```
