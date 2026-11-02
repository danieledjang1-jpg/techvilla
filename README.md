# TECHVILLA — Smartphone Store

A responsive React + Vite storefront with product discovery, filters, product pages, localStorage cart, WhatsApp order handoff, Framer Motion animations and an optional Supabase connection.

## Run locally
1. Install Node.js (LTS).
2. Extract this folder and open it in VS Code.
3. Open Terminal → New Terminal.
4. Run `npm install`
5. Copy `.env.example` to `.env`.
6. Update `VITE_WHATSAPP_NUMBER` with the business WhatsApp number in international format, digits only (Nigeria: 234...).
7. Run `npm run dev` and open the local URL printed in the terminal.

## Supabase setup (optional)
1. Create a Supabase project.
2. Copy Project URL and anon/public key into `.env`. Never put a service-role key in a Vite frontend.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Create the admin account in Supabase Authentication → Users.
5. Copy that user's UUID and run the INSERT statement at the bottom of the SQL file.
6. Create a public Storage bucket named `product-images`. Configure uploads to be admin-only.
7. Restart Vite after editing `.env`.

The starter admin screen is at `/admin`. It supports Supabase email/password sign-in and adding products. Product CRUD, image upload and order management can be expanded after the real business workflow and stock process are confirmed. RLS protects database writes; the browser must never receive a service-role secret.

## Important before showing the client / going live
- All products, prices, ratings and product availability currently shown are demo inventory.
- Replace the WhatsApp number and contact details in `.env` / `src/config.js`.
- Confirm actual products, storage variants, colours, stock and prices with the shop owner.
- Replace any sample product photos with photos supplied by the business or properly licensed assets.
- Add real business address, email, delivery, returns and warranty terms.
- The checkout currently prepares a WhatsApp order request; it does not collect online payment or create a database order.
- The newsletter and customer testimonials are intentionally not fabricated.
- Have the final privacy policy and business terms reviewed before production.
- Test `npm run build` before deployment.

## Deploy
Push the project to GitHub, then import the repository into Netlify. Build command: `npm run build`; publish directory: `dist`. Add the same VITE_ environment variables in Netlify site environment variables. Configure SPA fallback by adding a `_redirects` file containing `/* /index.html 200` in the `public` directory (included).
