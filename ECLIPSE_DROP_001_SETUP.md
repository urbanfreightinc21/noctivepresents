# NOCTIVE WEAR — ECLIPSE / AFTER DARK DROP 001

## Approved product
- Eclipse Zip-Up Hoodie — $85.00 USD.
- Black: 20 total; Espresso: 20 total.
- Sizes S, M, L, XL; any size mix within each color's cap.
- Provisional flat US shipping: $12.95; confirm packed weight, pricing and shipping destinations before accepting real orders.
- Supplier estimates ~3 weeks for bulk arrival AFTER purchase order is placed. Do not publish a shipment date until this is confirmed and inspection/packing buffer is included.
- Product images are digital mockups and must accurately represent eventual manufactured color, construction, hardware and logo.

## What has been implemented
- Collection page and separate product galleries for Black and Espresso.
- Four front/back images uploaded; current assets have filenames starting `ezlipse-` and ending `.webp.png`.
- S–XL selections on client and server.
- Stripe Checkout Session creation using server credentials and server-controlled $85 price, flat shipping, and estimated ship date.
- Transactional PostgreSQL reservation before checkout, with a cap of 20 reserved/paid orders per color (not per size).
- Stripe webhook with signature verification; records successful paid orders and releases inventory on unpaid checkout expiration/failure.
- Live stock endpoint `/api/eclipse-stock`, with sold-out button state.
- All commerce remains off until `ECLIPSE_PREORDERS_OPEN=true` and required services are connected.

## Required persistent Postgres database
Install **Neon Postgres** at https://vercel.com/marketplace/neon in the **noctivepresents** Vercel project.
- Use a Preview database to test (ideally a separate preview branch/database from Production).
- The integration should add a server-side `DATABASE_URL` environment variable.
- Run `database/eclipse.sql` ONE TIME against each relevant database. This creates inventory rows:
  - `black`: 20 capacity
  - `espresso`: 20 capacity
- DO NOT reset inventory after payments begin; paid and reserved orders must persist across deployments.
- Never expose database credentials to GitHub or browser variables.
- Never use a temporary in-memory database for real inventory.

## Stripe webhook
In Stripe TEST mode, create a webhook endpoint pointing to:
`https://<preview-hostname>/api/stripe-webhook`
Subscribe to:
- `checkout.session.completed`
- `checkout.session.expired`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`

Set `STRIPE_WEBHOOK_SECRET` (the endpoint's `whsec_...` signing secret) as a Vercel **Preview Secret scoped to wear-eclipse-drop-001**.
Never paste API keys or webhook secrets into a chat, screenshot, or repository.

For launch, create a separate LIVE Stripe webhook for the production hostname and set the production signing secret and production API key as Vercel Production Secrets.

## Vercel variables
- `STRIPE_SECRET_KEY` (secret; test in branch preview, live only in production once ready).
- `STRIPE_WEBHOOK_SECRET` (secret; per endpoint and mode).
- `DATABASE_URL` (secret; Neon Postgres connection).
- `ECLIPSE_PRICE_CENTS=8500`.
- `ECLIPSE_SHIPPING_CENTS=1295` (PREVIEW: provisional, currently configured).
- `ECLIPSE_ESTIMATED_SHIP_DATE` (human-readable, supportable shipment commitment).
- `ECLIPSE_PREORDERS_OPEN=false` (currently in Preview and Production; turn on LAST).
- `STRIPE_AUTOMATIC_TAX=true` only after tax registrations and Stripe Tax are correctly configured.

## Before enabling pre-orders
1. Confirm S–XL manufacturer size chart and ability to manufacture the exact size distribution determined from the pre-order totals.
2. Verify the supplier's three-week delivery ETA after placing the order; publish a realistic ship-by date with contingency time and clear delay/cancel/refund terms.
3. Confirm packed shipping weight (including mailer and hang tag) and actual cross-country postage cost. Confirm handling for Alaska and Hawaii, since the current Stripe checkout collects addresses anywhere in the US.
4. Verify applicable California sales tax registration, Stripe Tax and seller's permit requirements.
5. Verify the Neon database exists, migrations/seed ran, and inventory begins with precisely 20 per color.
6. Run 1–2 complete TEST checkout payments. Confirm orders and customer addresses are stored, stock decrements, payment metadata is correct, and a canceled/expired Checkout Session restores stock.
7. Verify duplicate webhook deliveries do not double-count stock.
8. Test what happens when 20 Black or 20 Espresso reservations exist; the 21st must be blocked, even for concurrent sessions.
9. Test refund, cancellation, dispute and order/customer notification processes; reconcile any uncertain payment state manually before releasing stock.
10. Ensure payment confirmation receipts and the customer support/refund policy are configured in Stripe.
11. Use live Stripe and production database credentials, create the production webhook, manually confirm inventory seeded, then turn on `ECLIPSE_PREORDERS_OPEN=true` ONLY after approval.

## Operations
The `eclipse_orders` table records each paid order's color, size, Stripe session/payment IDs, customer details and shipping address. Use a secure internal export or query to prepare the final Alibaba size distribution and Pirate Ship shipping labels. No automated Pirate Ship sync or customer shipping-confirmation integration is installed yet. Checkout reservations should expire via Stripe's signed `checkout.session.expired` webhook; if a webhook is delayed or missing, reconcile the session with Stripe before manually releasing the reservation.

### Development note
`package-lock.json` was removed after adding `stripe` and `pg` dependencies because the old lockfile no longer matched `package.json`. Regenerate and commit a current lockfile with `npm install` before final production merge, and verify `npm ci && npm run build` on the checked-in lockfile.

DO NOT merge or activate payments until the pre-order checkout has passed the tests above.
