import { initTRPC } from '@trpc/server';
import { User } from 'shared';

// Define the context type
export interface Context {
  user?: User;
}

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const procedure = t.procedure;
