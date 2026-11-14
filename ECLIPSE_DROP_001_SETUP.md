# NOCTIVE — Eclipse Zip-Up Hoodie / After Dark Drop 001

This branch stages the new Wear storefront and Stripe Checkout pre-order flow.

## Status
- Wear landing page: Eclipse collection with Black and Espresso colorways.
- Individual product routes: `/wear/eclipse/black`, `/wear/eclipse/espresso`.
- Each route: front/back gallery, size selectors (S, M, L, XL, 2XL), pre-order button gated server-side.
- Checkout: Stripe hosted Checkout Session created server-side by `app/api/eclipse-checkout/route.ts`.
- **Pre-orders remain disabled unless every required server variable is present and `ECLIPSE_PREORDERS_OPEN=true`.**
- This branch does **not** contain the four product photos yet. They need to be committed to the public folder before merging.

## Product images
Upload the approved, optimized photos using exactly these four paths:
- `public/wear/eclipse-black-front.webp`
- `public/wear/eclipse-black-back.webp`
- `public/wear/eclipse-espresso-front.webp`
- `public/wear/eclipse-espresso-back.webp`

The four WebP files have been prepared separately as a download archive for upload. Original approved artwork has been retained in those exports. The Espresso photo is still the previously approved mockup shade; verify that it matches the manufactured color before sales.

## Configuration in Vercel (private server environment)
- `STRIPE_SECRET_KEY` — Stripe restricted secret API key; NEVER `NEXT_PUBLIC_`.
- `ECLIPSE_PRICE_CENTS` — e.g. 9500 means $95.00 USD. Set only after price approval.
- `ECLIPSE_SHIPPING_CENTS` — flat US shipping charge in cents, e.g. 900 = $9.00. Set after shipping quote.
- `ECLIPSE_ESTIMATED_SHIP_DATE` — customer-facing date, e.g. `January 20, 2027`. Set to a reasonable, supportable fulfillment estimate.
- `ECLIPSE_PREORDERS_OPEN=true` — explicitly open pre-orders; set LAST.
- `NEXT_PUBLIC_SITE_URL=https://www.noctivepresents.com` — optional, but recommended for approved redirect domain.
- `STRIPE_AUTOMATIC_TAX=true` — optional; enable only if Stripe Tax registration/configuration is complete.

## Required before pre-orders
1. Upload all four image assets and review on mobile/desktop.
2. Confirm that product size run S–2XL is manufactured, prices, limited quantities, final brown color, and custom zipper engraving.
3. Choose price, shipping charge, and a realistic ship-by commitment with refund/return rules.
4. Configure business Stripe account and Vercel secret, Stripe Tax if appropriate.
5. Run a complete Stripe **test mode** order; verify size/color metadata, emails, payment flow and cancellation/refund process.
6. Set production variables and manually enable `ECLIPSE_PREORDERS_OPEN=true` when authorized to take payment.

Do not advertise pre-orders as open or switch the button on until payment testing and fulfillment terms are ready. Customer products are mockup reconstructions, not finished sample photography.
