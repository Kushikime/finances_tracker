export * from './contracts/auth.zod';
export * from './contracts/db.zod';
export { RegisterUserSchema } from './contracts/user.dto';
export type { RegisterUserDto } from './contracts/user.dto';
export * from './contracts/auth.zod';

// Inferred types for Zod schemas (for convenience re-export)
export type {
  RoleType,
  TxnType,
  ExpenseKind,
  User,
  Goal,
  PiggyBank,
  GoalAcl,
  PiggyBankAcl,
  Transaction,
  TransactionAcl,
} from './contracts/db.zod'; // Make sure this file exists as db.zod.ts or db.zod/index.ts in the contracts folder
