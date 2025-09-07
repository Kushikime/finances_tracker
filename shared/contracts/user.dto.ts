import { z } from 'zod';

export const RegisterUserDto = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  surname: z
    .string({ required_error: 'Surname is required' })
    .min(1, 'Surname is required'),
});

export type RegisterUserDto = z.infer<typeof RegisterUserDto>;
