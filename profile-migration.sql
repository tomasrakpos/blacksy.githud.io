-- BLACKSY GAME secure profile/avatar migration.
-- The canonical complete backend migration is /schema.sql. This focused file is
-- safe to use for a profile-only repair and does NOT grant users access to role.

begin;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text not null default '',
  role text not null default 'customer',
  bio text not null default '',
  avatar_url text not null default '',
  phone text not null default '',
  preferred_platform text not null default '',
  default_address text not null default '',
  postal_code text not null default '',
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
  add column if not exists email text,
  add column if not exists full_name text not null default '',
  add column if not exists role text not null default 'customer',
  add column if not exists bio text not null default '',
  add column if not exists avatar_url text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists preferred_platform text not null default '',
  add column if not exists default_address text not null default '',
  add column if not exists postal_code text not null default '',
  add column if not exists newsletter_opt_in boolean not null default false,
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

update public.profiles set role='customer' where role is null or role not in ('customer','admin');
alter table public.profiles alter column role set default 'customer';
alter table public.profiles alter column role set not null;
do $$ begin
  if not exists (select 1 from pg_constraint where conrelid='public.profiles'::regclass and conname='profiles_role_allowed') then
    alter table public.profiles add constraint profiles_role_allowed check (role in ('customer','admin')) not valid;
  end if;
  alter table public.profiles validate constraint profiles_role_allowed;
end $$;

create or replace function public.is_admin_user()
returns boolean language sql stable security definer
set search_path = '' set row_security = off
as $$ select exists (select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'); $$;
revoke all on function public.is_admin_user() from public, anon, authenticated;
grant execute on function public.is_admin_user() to authenticated;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = ''
as $$ begin
  insert into public.profiles(id,email,full_name,role)
  values(new.id,new.email,coalesce(new.raw_user_meta_data->>'full_name',''),'customer')
  on conflict(id) do nothing;
  return new;
end; $$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute function public.handle_new_user();

insert into public.profiles(id,email,full_name,role)
select u.id,u.email,coalesce(u.raw_user_meta_data->>'full_name',''),'customer'
from auth.users u on conflict(id) do nothing;

alter table public.profiles enable row level security;
do $$ declare p record; begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='profiles' loop
    execute format('drop policy %I on public.profiles',p.policyname);
  end loop;
end $$;
revoke all on table public.profiles from public, anon, authenticated;
grant select on public.profiles to authenticated;
grant update(full_name,bio,avatar_url,phone,preferred_platform,default_address,postal_code,newsletter_opt_in,updated_at)
  on public.profiles to authenticated;
create policy profiles_select_own on public.profiles for select to authenticated using(auth.uid()=id);
create policy profiles_select_admin on public.profiles for select to authenticated using(public.is_admin_user());
create policy profiles_update_own on public.profiles for update to authenticated
  using(auth.uid()=id) with check(auth.uid()=id);

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('avatars','avatars',false,1048576,array['image/webp','image/jpeg','image/png'])
on conflict(id) do update set public=false,file_size_limit=1048576,allowed_mime_types=array['image/webp','image/jpeg','image/png'];

do $$ declare p record; begin
  for p in select policyname from pg_policies where schemaname='storage' and tablename='objects'
    and (coalesce(qual,'') ilike '%avatars%' or coalesce(with_check,'') ilike '%avatars%' or policyname ilike '%avatar%') loop
    execute format('drop policy %I on storage.objects',p.policyname);
  end loop;
end $$;
create policy blacksy_avatar_read_owner on storage.objects for select to authenticated
using(bucket_id='avatars' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_admin_user()));
create policy blacksy_avatar_insert_owner on storage.objects for insert to authenticated
with check(bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);
create policy blacksy_avatar_update_owner on storage.objects for update to authenticated
using(bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text)
with check(bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);
create policy blacksy_avatar_delete_owner on storage.objects for delete to authenticated
using(bucket_id='avatars' and (storage.foldername(name))[1]=auth.uid()::text);

commit;
