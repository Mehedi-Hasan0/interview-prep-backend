## src/modules/

### Purpose

NestJS module definitions that wire everything together. Modules configure dependency injection and define the application structure.

### Responsibilities

- Define NestJS modules
- Configure dependency injection
- Import/export providers
- Register use cases and their implementations
- Bind interfaces to implementations

### What Goes Here

- **Module Files**: NestJS @Module decorators
- **Provider Configuration**: Dependency injection setup
- **Import/Export Declarations**: Module composition

### Rules

1. **One Module Per Feature**: Each business capability gets a module
2. **Explicit Bindings**: Clearly bind ports to implementations
3. **Encapsulation**: Expose minimal public API
4. **Composition**: Use imports to compose modules

### Example Pattern

```typescript
// GOOD - Feature module
@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    // Bind use case interface to implementation
    {
      provide: CreateUserUseCase,
      useClass: CreateUserUseCaseImpl,
    },
    {
      provide: FindUserUseCase,
      useClass: FindUserUseCaseImpl,
    },
    // Bind repository interface to implementation
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
    // Application services
    UserMapper,
  ],
  exports: [CreateUserUseCase, FindUserUseCase],
})
export class UserModule {}
```
