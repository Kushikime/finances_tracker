
-- migrate:up
CREATE EXTENSION IF NOT EXISTS citext;
CREATE TYPE role_type AS ENUM ('viewer', 'editor', 'admin');
CREATE TYPE txn_type AS ENUM ('income', 'expense');
CREATE TYPE expense_kind AS ENUM ('default', 'goal', 'bank');

CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT,
  surname       TEXT,
  email         CITEXT UNIQUE,
  password_hash TEXT,
  created_at    TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ
);

CREATE TABLE goals (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT,
  target_amount NUMERIC(14,2),
  description   TEXT,
  currency      TEXT,
  created_at    TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ
);

CREATE TABLE piggy_banks (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT,
  description TEXT,
  goal_id     BIGINT REFERENCES goals(id),
  created_at  TIMESTAMPTZ,
  updated_at  TIMESTAMPTZ
);

CREATE TABLE goal_acl (
  goal_id BIGINT REFERENCES goals(id),
  user_id BIGINT REFERENCES users(id),
  role    role_type,
  PRIMARY KEY (goal_id, user_id)
);
CREATE INDEX idx_goal_acl_user_id ON goal_acl(user_id);

CREATE TABLE piggy_bank_acl (
  piggy_bank_id BIGINT REFERENCES piggy_banks(id),
  user_id       BIGINT REFERENCES users(id),
  role          role_type,
  PRIMARY KEY (piggy_bank_id, user_id)
);
CREATE INDEX idx_piggy_bank_acl_user_id ON piggy_bank_acl(user_id);

CREATE TABLE transactions (
  id            BIGSERIAL PRIMARY KEY,
  type          txn_type,
  kind          expense_kind,
  amount        NUMERIC(14,2),
  description   TEXT,
  user_id       BIGINT REFERENCES users(id),
  created_by    BIGINT REFERENCES users(id),
  goal_id       BIGINT REFERENCES goals(id),
  piggy_bank_id BIGINT REFERENCES piggy_banks(id),
  occurred_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ,
  updated_at    TIMESTAMPTZ
);
CREATE INDEX idx_transactions_user_id_occurred_at ON transactions(user_id, occurred_at);
CREATE INDEX idx_transactions_created_by_occurred_at ON transactions(created_by, occurred_at);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_kind ON transactions(kind);
CREATE INDEX idx_transactions_goal_id ON transactions(goal_id);
CREATE INDEX idx_transactions_piggy_bank_id ON transactions(piggy_bank_id);

CREATE TABLE transaction_acl (
  transaction_id BIGINT REFERENCES transactions(id),
  user_id        BIGINT REFERENCES users(id),
  role           role_type,
  PRIMARY KEY (transaction_id, user_id)
);
CREATE INDEX idx_transaction_acl_user_id ON transaction_acl(user_id);

-- migrate:down
DROP INDEX IF EXISTS idx_transaction_acl_user_id;
DROP TABLE IF EXISTS transaction_acl;
DROP INDEX IF EXISTS idx_transactions_piggy_bank_id;
DROP INDEX IF EXISTS idx_transactions_goal_id;
DROP INDEX IF EXISTS idx_transactions_kind;
DROP INDEX IF EXISTS idx_transactions_type;
DROP INDEX IF EXISTS idx_transactions_created_by_occurred_at;
DROP INDEX IF EXISTS idx_transactions_user_id_occurred_at;
DROP TABLE IF EXISTS transactions;
DROP INDEX IF EXISTS idx_piggy_bank_acl_user_id;
DROP TABLE IF EXISTS piggy_bank_acl;
DROP INDEX IF EXISTS idx_goal_acl_user_id;
DROP TABLE IF EXISTS goal_acl;
DROP TABLE IF EXISTS piggy_banks;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS expense_kind;
DROP TYPE IF EXISTS txn_type;
DROP TYPE IF EXISTS role_type;
