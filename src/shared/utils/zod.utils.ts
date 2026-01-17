import z from 'zod';

/**
 * Coerce a value to a number
 * Useful for processing environment variables (strings) or query params.
 */
export const toNumber = (defaultValue?: number) =>
  z.preprocess(
    (value) => (value === undefined || value === '' ? defaultValue : Number(value)),
    z.number(),
  );

/**
 * Coerce a value to boolean.
 * Handles 'true', '1', 'yes', 'on' case-insensitivity
 */

export const toBoolean = (defaultValue?: boolean) =>
  z.preprocess((value) => {
    if (value === undefined || value === '') return defaultValue;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string' || typeof value === 'number') {
      return ['true', '1', 'yes'].includes(String(value).toLocaleLowerCase());
    }
    return value;
  }, z.boolean());
