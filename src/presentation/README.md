## 📁 src/presentation/

### Purpose

Contains all entry points to your application - HTTP controllers, WebSocket gateways, CLI commands. This layer translates external requests into use case calls and formats responses.

### Responsibilities

- Handle HTTP/WebSocket/CLI requests
- Validate input (API-level validation)
- Call appropriate use cases
- Format responses for each protocol
- Handle authentication/authorization at API level
- API versioning

### What Goes Here

- **Controllers**: REST API endpoints
- **Gateways**: WebSocket handlers
- **DTOs**: API-specific request/response formats
- **Guards**: Authentication/authorization
- **Middleware**: Request/response processing

### What DOESN'T Go Here

- Business logic (that goes in domain/application)
- Database access (use repositories through use cases)
- Direct domain entity manipulation

### Rules

1. **Thin Controllers**: Controllers should be thin - just call use cases
2. **Protocol-Specific**: Each protocol (HTTP, WS, CLI) has its own folder
3. **Version Your API**: Use versioning (v1, v2) for public APIs
4. **Validate Input**: Use DTOs with class-validator
5. **Return DTOs**: Never return domain entities directly

### Example Structure

```
http/
└── controllers/
    └── v1/
        ├── auth/
        │   ├── auth.controller.ts
        │   └── dtos/
        │       ├── login.dto.ts
        │       └── register.dto.ts
        ├── users/
        │   ├── users.controller.ts
        │   └── dtos/
        └── companies/
            ├── companies.controller.ts
            └── dtos/

websocket/
└── gateways/
    └── interview/
        ├── interview.gateway.ts
        └── dtos/
```

### Example Code Pattern

```typescript
// GOOD - Thin controller
@Controller('v1/users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    // Just validate and call use case
    const result = await this.createUserUseCase.execute({
      email: dto.email,
      password: dto.password,
    });

    // Return API response DTO
    return {
      id: result.userId,
      email: result.email,
      createdAt: result.createdAt,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    const result = await this.findUserUseCase.execute({ userId: id });
    return UserResponseMapper.toDto(result);
  }
}

// GOOD - API DTO with validation
export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ example: 'SecurePass123!' })
  password: string;
}

// BAD - Business logic in controller
@Post()
async create(@Body() dto: CreateUserDto) {
  // Don't put business logic here
  if (dto.email.endsWith('@competitor.com')) {
    throw new BadRequestException('Cannot register with competitor email');
  }

  // Don't access repositories directly
  const user = await this.userRepository.save({
    email: dto.email,
    password: await bcrypt.hash(dto.password, 10),
  });

  // Don't return domain entities
  return user;
}
```
