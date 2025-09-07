\restrict A7LNsEL2KGzSQZbMsrWKKDgqPuEOydcXEpEXCpIaWon1JEQEj4322PJNKYfUxFA

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: expense_kind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.expense_kind AS ENUM (
    'default',
    'goal',
    'bank'
);


--
-- Name: role_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.role_type AS ENUM (
    'viewer',
    'editor',
    'admin'
);


--
-- Name: txn_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.txn_type AS ENUM (
    'income',
    'expense'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: goal_acl; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.goal_acl (
    goal_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role public.role_type
);


--
-- Name: goals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.goals (
    id bigint NOT NULL,
    name text,
    target_amount numeric(14,2),
    description text,
    currency text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: goals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: goals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.goals_id_seq OWNED BY public.goals.id;


--
-- Name: piggy_bank_acl; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.piggy_bank_acl (
    piggy_bank_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role public.role_type
);


--
-- Name: piggy_banks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.piggy_banks (
    id bigint NOT NULL,
    name text,
    description text,
    goal_id bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: piggy_banks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.piggy_banks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: piggy_banks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.piggy_banks_id_seq OWNED BY public.piggy_banks.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: transaction_acl; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transaction_acl (
    transaction_id bigint NOT NULL,
    user_id bigint NOT NULL,
    role public.role_type
);


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.transactions (
    id bigint NOT NULL,
    type public.txn_type,
    kind public.expense_kind,
    amount numeric(14,2),
    description text,
    user_id bigint,
    created_by bigint,
    goal_id bigint,
    piggy_bank_id bigint,
    occurred_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.transactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name text,
    surname text,
    email public.citext,
    password_hash text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: goals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.goals ALTER COLUMN id SET DEFAULT nextval('public.goals_id_seq'::regclass);


--
-- Name: piggy_banks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piggy_banks ALTER COLUMN id SET DEFAULT nextval('public.piggy_banks_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: goal_acl goal_acl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.goal_acl
    ADD CONSTRAINT goal_acl_pkey PRIMARY KEY (goal_id, user_id);


--
-- Name: goals goals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);


--
-- Name: piggy_bank_acl piggy_bank_acl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piggy_bank_acl
    ADD CONSTRAINT piggy_bank_acl_pkey PRIMARY KEY (piggy_bank_id, user_id);


--
-- Name: piggy_banks piggy_banks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piggy_banks
    ADD CONSTRAINT piggy_banks_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: transaction_acl transaction_acl_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_acl
    ADD CONSTRAINT transaction_acl_pkey PRIMARY KEY (transaction_id, user_id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: idx_goal_acl_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_goal_acl_user_id ON public.goal_acl USING btree (user_id);


--
-- Name: idx_piggy_bank_acl_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_piggy_bank_acl_user_id ON public.piggy_bank_acl USING btree (user_id);


--
-- Name: idx_transaction_acl_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transaction_acl_user_id ON public.transaction_acl USING btree (user_id);


--
-- Name: idx_transactions_created_by_occurred_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transactions_created_by_occurred_at ON public.transactions USING btree (created_by, occurred_at);


--
-- Name: idx_transactions_goal_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transactions_goal_id ON public.transactions USING btree (goal_id);


--
-- Name: idx_transactions_kind; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transactions_kind ON public.transactions USING btree (kind);


--
-- Name: idx_transactions_piggy_bank_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transactions_piggy_bank_id ON public.transactions USING btree (piggy_bank_id);


--
-- Name: idx_transactions_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transactions_type ON public.transactions USING btree (type);


--
-- Name: idx_transactions_user_id_occurred_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_transactions_user_id_occurred_at ON public.transactions USING btree (user_id, occurred_at);


--
-- Name: goal_acl goal_acl_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.goal_acl
    ADD CONSTRAINT goal_acl_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id);


--
-- Name: goal_acl goal_acl_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.goal_acl
    ADD CONSTRAINT goal_acl_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: piggy_bank_acl piggy_bank_acl_piggy_bank_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piggy_bank_acl
    ADD CONSTRAINT piggy_bank_acl_piggy_bank_id_fkey FOREIGN KEY (piggy_bank_id) REFERENCES public.piggy_banks(id);


--
-- Name: piggy_bank_acl piggy_bank_acl_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piggy_bank_acl
    ADD CONSTRAINT piggy_bank_acl_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: piggy_banks piggy_banks_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.piggy_banks
    ADD CONSTRAINT piggy_banks_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id);


--
-- Name: transaction_acl transaction_acl_transaction_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_acl
    ADD CONSTRAINT transaction_acl_transaction_id_fkey FOREIGN KEY (transaction_id) REFERENCES public.transactions(id);


--
-- Name: transaction_acl transaction_acl_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transaction_acl
    ADD CONSTRAINT transaction_acl_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: transactions transactions_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: transactions transactions_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_goal_id_fkey FOREIGN KEY (goal_id) REFERENCES public.goals(id);


--
-- Name: transactions transactions_piggy_bank_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_piggy_bank_id_fkey FOREIGN KEY (piggy_bank_id) REFERENCES public.piggy_banks(id);


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

\unrestrict A7LNsEL2KGzSQZbMsrWKKDgqPuEOydcXEpEXCpIaWon1JEQEj4322PJNKYfUxFA


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20250907');
