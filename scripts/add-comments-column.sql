-- Add comment column to subscriptions table
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS comment TEXT;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_comment ON subscriptions(comment);
