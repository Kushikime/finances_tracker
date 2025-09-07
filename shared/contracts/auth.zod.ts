import { z } from 'zod';

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  surname: z.string().optional(),
});

export const LoginOutput = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.bigint(),
    email: z.string().email(),
    name: z.string(),
    surname: z.string(),
  }),
});

export const UserPublic = z.object({
  id: z.bigint(),
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
});

export const ErrorEnvelope = z.object({
  error: z.string().default('Invalid credentials'),
});
