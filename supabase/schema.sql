-- Run in Supabase SQL Editor. Create admin users in Supabase Auth, then add their UUIDs to admin_users.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null default 'Other',
  category text not null default 'Smartphones',
  price numeric(12,2) not null check(price >= 0),
  old_price numeric(12,2),
  image_url text,
  description text,
  storage jsonb not null default '["Standard"]'::jsonb,
  colors jsonb not null default '["Default"]'::jsonb,
  specs jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  stock boolean not null default true,
  created_at timestamptz not null default now()
);
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text,
  customer_phone text,
  delivery_location text,
  items jsonb not null,
  total numeric(12,2) not null,
  status text not null default 'pending' check(status in ('pending','confirmed','processing','completed','cancelled')),
  created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
create or replace function public.is_techvilla_admin()
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.admin_users where user_id=auth.uid()); $$;
drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products" on public.products for select using(active=true or public.is_techvilla_admin());
drop policy if exists "Admins manage products" on public.products;
create policy "Admins manage products" on public.products for all using(public.is_techvilla_admin()) with check(public.is_techvilla_admin());
drop policy if exists "Admins view orders" on public.orders;
create policy "Admins view orders" on public.orders for select using(public.is_techvilla_admin());
drop policy if exists "Admins update orders" on public.orders;
create policy "Admins update orders" on public.orders for update using(public.is_techvilla_admin()) with check(public.is_techvilla_admin());
-- Add an admin after creating their Auth user:
-- insert into public.admin_users(user_id) values ('AUTH-USER-UUID');
-- Create a Supabase Storage bucket named product-images; allow public read and admin-only upload/update/delete.
