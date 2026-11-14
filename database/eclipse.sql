-- Run once against the production database, and separately on any preview database.
-- Quantity is 20 total per color across S / M / L / XL.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS eclipse_inventory (
  color text PRIMARY KEY CHECK (color IN ('black','espresso')),
  capacity integer NOT NULL CHECK (capacity >= 0),
  reserved integer NOT NULL DEFAULT 0 CHECK (reserved >= 0 AND reserved <= capacity)
);
INSERT INTO eclipse_inventory(color,capacity,reserved)
VALUES ('black',20,0),('espresso',20,0)
ON CONFLICT(color) DO NOTHING;

CREATE TABLE IF NOT EXISTS eclipse_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  color text NOT NULL REFERENCES eclipse_inventory(color),
  size text NOT NULL CHECK (size IN ('S','M','L','XL')),
  status text NOT NULL CHECK (status IN ('reserved','processing','paid','expired','failed')),
  stripe_session_id text UNIQUE,
  stripe_payment_intent text,
  customer_email text,
  customer_name text,
  shipping_address jsonb,
  checkout_expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS eclipse_orders_status_idx ON eclipse_orders(status, color);

-- Stock should only be changed by checkout / webhook server logic.
-- After refunds, handle the inventory policy deliberately; don't automatically restock.
