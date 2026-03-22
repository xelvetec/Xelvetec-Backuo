-- Insert the subscription manually based on Stripe payment confirmation
-- User: kubilay.demirci@gmx.ch
-- User ID: 43ee401a-a959-49ea-9b8b-1fd47c483af1
-- Stripe Customer ID: cus_UCA37qb60Ymo2S
-- Payment: 29,90 CHF - Subscription creation
-- ZAHLUNGS-ID: pi_3TDIja2Uie3LBmwR13xKI8UM

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
  'sub_manual_kubilay_demirci',
  'basic',
  'active',
  'kubilay.demirci@gmx.ch',
  NOW(),
  NOW() + INTERVAL '1 month',
  NOW(),
  NOW()
) ON CONFLICT DO NOTHING;

-- Verify the insertion
SELECT id, user_id, tier, status, stripe_customer_id, created_at FROM subscriptions 
WHERE user_id = '43ee401a-a959-49ea-9b8b-1fd47c483af1';
