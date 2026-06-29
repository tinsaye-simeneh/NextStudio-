-- Digital cards table for NextStudio
-- Run in Supabase SQL editor

create table if not exists cards (
  id                  uuid primary key default gen_random_uuid(),
  slug                text unique not null,
  card_type           text not null check (card_type in ('personal', 'business')),
  business_name       text,
  full_name           text,
  job_title           text,
  company_name        text,
  tagline             text,
  description         text,
  logo_url            text,
  profile_image_url   text,
  cover_url           text,
  email               text,
  phone               text,
  website             text,
  address             text,
  is_password_protected boolean default false,
  password_hash       text,
  theme               jsonb default '{"primary_color":"#64748b","secondary_color":"#334155"}'::jsonb,
  services            jsonb default '[]'::jsonb,
  gallery             jsonb default '[]'::jsonb,
  products            jsonb default '[]'::jsonb,
  business_hours      jsonb default '[]'::jsonb,
  social_links        jsonb default '{}'::jsonb,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

create index if not exists cards_slug_idx on cards (slug);
