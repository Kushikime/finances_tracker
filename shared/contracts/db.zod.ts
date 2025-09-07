// Zod schemas for DB entities based on dbdiagram
import { z } from 'zod';

export const roleTypeSchema = z.enum(['viewer', 'editor', 'admin']);
export type RoleType = z.infer<typeof roleTypeSchema>;

export const txnTypeSchema = z.enum(['income', 'expense']);
export type TxnType = z.infer<typeof txnTypeSchema>;

export const expenseKindSchema = z.enum(['default', 'goal', 'bank']);
export type ExpenseKind = z.infer<typeof expenseKindSchema>;

export const userSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password_hash: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type User = z.infer<typeof userSchema>;

export const goalSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  target_amount: z.string(), // numeric(14,2) as string
  description: z.string(),
  currency: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type Goal = z.infer<typeof goalSchema>;

export const piggyBankSchema = z.object({
  id: z.bigint(),
  name: z.string(),
  description: z.string(),
  goal_id: z.bigint(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type PiggyBank = z.infer<typeof piggyBankSchema>;

export const goalAclSchema = z.object({
  goal_id: z.bigint(),
  user_id: z.bigint(),
  role: roleTypeSchema,
});
export type GoalAcl = z.infer<typeof goalAclSchema>;

export const piggyBankAclSchema = z.object({
  piggy_bank_id: z.bigint(),
  user_id: z.bigint(),
  role: roleTypeSchema,
});
export type PiggyBankAcl = z.infer<typeof piggyBankAclSchema>;

export const transactionSchema = z.object({
  id: z.bigint(),
  type: txnTypeSchema,
  kind: expenseKindSchema.nullable(),
  amount: z.string(), // numeric(14,2) as string
  description: z.string(),
  user_id: z.bigint(),
  created_by: z.bigint(),
  goal_id: z.bigint().nullable(),
  piggy_bank_id: z.bigint().nullable(),
  occurred_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type Transaction = z.infer<typeof transactionSchema>;

export const transactionAclSchema = z.object({
  transaction_id: z.bigint(),
  user_id: z.bigint(),
  role: roleTypeSchema,
});
export type TransactionAcl = z.infer<typeof transactionAclSchema>;

// Collections
export const usersSchema = z.array(userSchema);
export const goalsSchema = z.array(goalSchema);
export const piggyBanksSchema = z.array(piggyBankSchema);
export const goalAclsSchema = z.array(goalAclSchema);
export const piggyBankAclsSchema = z.array(piggyBankAclSchema);
export const transactionsSchema = z.array(transactionSchema);
export const transactionAclsSchema = z.array(transactionAclSchema);
