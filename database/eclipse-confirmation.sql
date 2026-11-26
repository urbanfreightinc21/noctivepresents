-- Apply before enabling transactional emails in production.
ALTER TABLE eclipse_orders ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamptz;
