import { router, procedure } from '../trpc';
import { db, users } from 'db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const userRouter = router({
  // Get currently authenticated user
  me: procedure
    .query(({ ctx }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Not authenticated',
        });
      }
      return ctx.user;
    }),

  // Get user by ID
  byId: procedure
    .input(z.object({
      id: z.string().uuid(),
    }))
    .query(async ({ input }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.id, input.id),
      });
      
      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        });
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        createdAt: user.createdAt,
      };
    }),
});
