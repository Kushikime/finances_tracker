import { z } from 'zod';

export const LoginInput = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
export const LoginOutput = z.object({});
export const UserPublic = z.object({});
export const ErrorEnvelope = z.object({});
