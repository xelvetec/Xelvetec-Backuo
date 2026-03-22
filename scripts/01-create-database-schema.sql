-- ============================================================================
-- XELVETEC SUPABASE SCHEMA
-- Complete database setup for Subscription Management System
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. USERS PROFILE TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS users_profile (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  country TEXT,
  language TEXT DEFAULT 'de',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. SUBSCRIPTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('basic', 'business', 'ecommerce')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'paused', 'cancelled')),
  customer_email TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  email_linked BOOLEAN DEFAULT false,
  comment TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS subscriptions_stripe_customer_id_idx ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS subscriptions_status_idx ON subscriptions(status);

-- ============================================================================
-- 3. INVOICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
  stripe_invoice_id TEXT UNIQUE,
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'CHF',
  status TEXT DEFAULT 'draft',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS invoices_user_id_idx ON invoices(user_id);
CREATE INDEX IF NOT EXISTS invoices_stripe_invoice_id_idx ON invoices(stripe_invoice_id);

-- ============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profile
CREATE POLICY users_profile_select_policy ON users_profile
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY users_profile_insert_policy ON users_profile
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY users_profile_update_policy ON users_profile
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can only see their own subscriptions
CREATE POLICY subscriptions_select_policy ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY subscriptions_insert_policy ON subscriptions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY subscriptions_update_policy ON subscriptions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only see their own invoices
CREATE POLICY invoices_select_policy ON invoices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY invoices_insert_policy ON invoices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 5. TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_profile_timestamp BEFORE UPDATE ON users_profile
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER subscriptions_timestamp BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER invoices_timestamp BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- ============================================================================
-- SCHEMA SETUP COMPLETE
-- ============================================================================
-- Tables created:
-- - users_profile (User profiles linked to auth.users)
-- - subscriptions (Stripe subscriptions with RLS)
-- - invoices (Payment invoices with RLS)
--
-- All tables have:
-- - Row Level Security (RLS) enabled
-- - Users can only see/modify their own data
-- - Automatic timestamp updates
-- - Proper indexes for performance
-- ============================================================================
