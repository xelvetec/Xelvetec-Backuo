-- Check all subscriptions for the test user
SELECT id, user_id, stripe_customer_id, customer_email, tier, status, created_at, updated_at FROM subscriptions WHERE customer_email = 'kubilay.demirci@gmx.ch' OR stripe_customer_id = 'cus_UCA37qb60Ymo2S' ORDER BY created_at DESC;

-- Count total subscriptions
SELECT COUNT(*) as total_subscriptions FROM subscriptions;

-- Check if there are any subscriptions with NULL user_id
SELECT id, user_id, stripe_customer_id, customer_email, tier, status FROM subscriptions WHERE user_id IS NULL LIMIT 5;
