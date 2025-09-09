import { z } from 'zod';
import { loginSchema, registerSchema } from '../schemas/auth';

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
