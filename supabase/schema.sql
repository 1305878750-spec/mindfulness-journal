-- Ae. Mindfulness Journal — Supabase Schema
-- Run this in your Supabase project's SQL Editor.

create table if not exists reflections (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('morning', 'evening')),
  content     text not null,
  created_at  timestamptz not null default now()
);

-- Allow unrestricted access (no auth required)
alter table reflections enable row level security;

create policy "Allow all access" on reflections
  for all
  using (true)
  with check (true);
