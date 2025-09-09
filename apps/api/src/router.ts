import { router } from './trpc';
import { userRouter } from './routes/user';
import { authRouter } from './routes/auth';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
