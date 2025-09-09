import { router, procedure } from '../trpc';
import { loginSchema, registerSchema } from 'shared';
import { db, users } from 'db';
import { eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = router({
  register: procedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      const { email, password, name, surname } = input;

      // Check if user already exists
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists',
        });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);

      // Create user
      const [newUser] = await db
        .insert(users)
        .values({
          email,
          passwordHash,
          name,
          surname,
        })
        .returning();

      return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        surname: newUser.surname,
      };
    }),

  login: procedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      const { email, password } = input;

      // Find user
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      // Verify password
      const passwordValid = await bcrypt.compare(password, user.passwordHash);

      if (!passwordValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Invalid password',
        });
      }

      // Generate JWT
      const token = jwt.sign(
        { 
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET || 'supersecretkey',
        { expiresIn: '7d' }
      );

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
        },
      };
    }),
});
