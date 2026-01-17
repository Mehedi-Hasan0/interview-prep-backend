import { toBoolean, toNumber } from 'src/shared/utils/zod.utils';
import z from 'zod';

/**
 * @function toNumber is a shared util to handle type coercion
 * @function toBoolean is a shared util to handle type coercion
 */

export const environmentSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
  PORT: toNumber(8080).default(8080),
  API_PREFIX: z.string().default('api'),

  // Database
  DB_HOST: z.string().min(1),
  DB_PORT: toNumber(5432).default(5432),
  DB_USERNAME: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_NAME: z.string().min(1),

  DB_SYNC: toBoolean(false).default(false),
  DB_LOGGING: toBoolean(false).default(false),
  DB_SSL: toBoolean(false).default(false),

  DB_POOL_MIN: toNumber(2).default(2),
  DB_POOL_MAX: toNumber(10).default(10),

  // Redis
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: toNumber(6379).default(6379),
  REDIS_PASSWORD: z.string().optional().or(z.literal('')),
  REDIS_DB: toNumber(0).default(0),
  REDIS_TTL: toNumber(3600).default(3600),

  // JWT Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRATION: z.string().default('7d'),

  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_REFRESH_EXPIRATION: z.string().default('30d'),

  // Security
  BCRYPT_ROUNDS: toNumber(10).default(10),
  RATE_LIMIT_TTL: toNumber(60).default(60),
  RATE_LIMIT_MAX: toNumber(10).default(10),

  CORS_ORIGIN: z.string().default('http://localhost:3001'),

  // Logging
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'verbose']).default('info'),

  LOG_FORMAT: z.enum(['json', 'pretty']).default('json'),

  // LLM Configuration
  LLM_PROVIDER: z.enum(['openai', 'anthropic']).default('openai'),

  OPENAI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),

  LLM_MODEL: z.string().default('gpt-3.5-turbo'),
  LLM_MAX_TOKENS: toNumber(1000).default(1000),

  LLM_TEMPERATURE: toNumber(0.7).pipe(z.number().min(0).max(2)),

  // Monitoring
  SENTRY_DSN: z.string().optional().or(z.literal('')),

  // Feature Flags
  ENABLE_SWAGGER: toBoolean(true).default(true),
  ENABLE_METRICS: toBoolean(false).default(false),
});
