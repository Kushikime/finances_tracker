import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  surname: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});
