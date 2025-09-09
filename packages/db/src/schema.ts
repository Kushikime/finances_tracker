import { relations } from 'drizzle-orm';
import { pgTable, serial, text, uuid, timestamp, boolean, varchar, integer } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  surname: text('surname').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
}));

// Goals table
export const goals = pgTable('goals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  targetAmount: integer('target_amount').notNull(),
  currentAmount: integer('current_amount').default(0).notNull(),
  description: text('description'),
  currency: varchar('currency', { length: 3 }).default('USD').notNull(),
  isCompleted: boolean('is_completed').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const goalsRelations = relations(goals, ({ one, many }) => ({
  user: one(users, {
    fields: [goals.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

// Transactions table
export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id),
  amount: integer('amount').notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
  category: text('category'),
  description: text('description'),
  date: timestamp('date').defaultNow().notNull(),
  goalId: uuid('goal_id').references(() => goals.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  goal: one(goals, {
    fields: [transactions.goalId],
    references: [goals.id],
  }),
}));
