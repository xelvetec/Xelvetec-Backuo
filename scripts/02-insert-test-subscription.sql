-- First insert the user into users_profile
INSERT INTO users_profile (
  id,
  email,
  full_name,
  created_at,
  updated_at
) VALUES (
  '43ee401a-a959-49ea-9b8b-1fd47c483af1',
  'kubilay.demirci@gmx.ch',
  'Kubilay Demirci',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Now insert the subscriptions
INSERT INTO subscriptions (
  user_id,
  stripe_customer_id,
  stripe_subscription_id,
  tier,
  status,
  customer_email,
  current_period_start,
  current_period_end,
  created_at,
  updated_at
) VALUES (
  '43ee401a-a959-49ea-9b8b-1fd47c483af1',
  'cus_UCA37qb60Ymo2S',
  'sub_active_20260322_kubilay',
  'basic',
  'active',
  'kubilay.demirci@gmx.ch',
  NOW(),
  NOW() + INTERVAL '1 month',
  NOW() - INTERVAL '1 day',
  NOW()
);

-- Insert a cancelled subscription
INSERT INTO subscriptions (
  user_id,
  stripe_customer_id,
  stripe_subscription_id,
  tier,
  status,
  customer_email,
  current_period_start,
  current_period_end,
  created_at,
  updated_at
) VALUES (
  '43ee401a-a959-49ea-9b8b-1fd47c483af1',
  'cus_UCA37qb60Ymo2S_old',
  'sub_cancelled_old',
  'basic',
  'cancelled',
  'kubilay.demirci@gmx.ch',
  NOW() - INTERVAL '90 days',
  NOW() - INTERVAL '30 days',
  NOW() - INTERVAL '90 days',
  NOW() - INTERVAL '30 days'
);

-- Verify
SELECT 'Users Profile' as table_name, COUNT(*) as count FROM users_profile WHERE id = '43ee401a-a959-49ea-9b8b-1fd47c483af1'
UNION ALL
SELECT 'Subscriptions', COUNT(*) FROM subscriptions WHERE user_id = '43ee401a-a959-49ea-9b8b-1fd47c483af1';
