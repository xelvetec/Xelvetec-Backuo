-- Add email verification and subscription linking fields
ALTER TABLE public.users_profile 
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS email_verified_at TIMESTAMPTZ;

-- Add customer email to subscriptions for matching unlinked subscriptions
ALTER TABLE public.subscriptions
ADD COLUMN IF NOT EXISTS customer_email TEXT,
ADD COLUMN IF NOT EXISTS email_linked BOOLEAN DEFAULT FALSE;

-- Create index for email matching
CREATE INDEX IF NOT EXISTS idx_subscriptions_customer_email ON public.subscriptions(customer_email);
CREATE INDEX IF NOT EXISTS idx_users_profile_email_verified ON public.users_profile(email_verified);
