-- Supabase Storage bucket for digital card images
-- Run in Supabase SQL editor after creating the cards table

insert into storage.buckets (id, name, public)
values ('card-images', 'card-images', true)
on conflict (id) do update set public = true;

-- Public read access for card images
create policy "Public read card images"
on storage.objects
for select
to public
using (bucket_id = 'card-images');
