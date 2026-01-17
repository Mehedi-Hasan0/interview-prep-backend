## 📁 src/shared/

### Purpose

Contains cross-cutting concerns and utilities that are used across multiple layers but don't belong to any specific layer.

### Responsibilities

- Common types and interfaces used everywhere
- Utility functions (date, string, validation helpers)
- Application-wide constants
- Base classes and generic implementations

### What Goes Here

- **Types**: Pagination, Filter, Result types
- **Utils**: Pure functions for common operations
- **Constants**: Error codes, configuration constants
- **Base Interfaces**: Generic patterns used across layers

### What DOESN'T Go Here

- Layer-specific code (that belongs in its layer)
- Business logic (that goes in domain)
- Infrastructure concerns (that goes in infrastructure)

### Rules

1. **No Dependencies**: Shared code shouldn't depend on other layers
2. **Pure Functions**: Utils should be stateless, pure functions
3. **Generic**: Code here should be generic and reusable
4. **Minimal**: Keep this small - don't use it as a dumping ground

### Example Structure

```
types/
├── pagination.types.ts
├── filter.types.ts
└── result.types.ts

utils/
├── date.utils.ts
├── string.utils.ts
└── validation.utils.ts

constants/
├── error-codes.ts
└── app.constants.ts

interfaces/
└── base-repository.interface.ts
```

### Example Code Pattern

```typescript
// GOOD - Generic utility
export class DateUtils {
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static isBefore(date1: Date, date2: Date): boolean {
    return date1.getTime() < date2.getTime();
  }
}

// GOOD - Common type
export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// GOOD - Application constant
export const ErrorCodes = {
  USER_NOT_FOUND: 'USER_001',
  EMAIL_ALREADY_EXISTS: 'USER_002',
  INVALID_CREDENTIALS: 'AUTH_001',
} as const;
```
