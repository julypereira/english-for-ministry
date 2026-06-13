-- ============================================================================
-- English For Ministry - Script de Configuração do Supabase
-- ============================================================================
-- Execute este script no SQL Editor do seu projeto Supabase (em ordem).
-- Ele cria: enums, tabelas, RLS, policies, função has_role, triggers e seeds.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. EXTENSÕES
-- ----------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 2. ENUMS
-- ----------------------------------------------------------------------------
do $$ begin
  create type public.app_role as enum ('admin', 'aluno');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.lesson_status as enum ('released', 'locked');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.module_status as enum ('released', 'locked');
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- 3. FUNÇÃO updated_at
-- ----------------------------------------------------------------------------
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- 4. TABELA: profiles (dados públicos vinculados a auth.users)
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

alter table public.profiles enable row level security;

drop policy if exists "Usuários veem seu próprio perfil" on public.profiles;
create policy "Usuários veem seu próprio perfil"
  on public.profiles for select to authenticated
  using (auth.uid() = id);

drop policy if exists "Usuários atualizam seu próprio perfil" on public.profiles;
create policy "Usuários atualizam seu próprio perfil"
  on public.profiles for update to authenticated
  using (auth.uid() = id);

drop policy if exists "Usuários inserem seu próprio perfil" on public.profiles;
create policy "Usuários inserem seu próprio perfil"
  on public.profiles for insert to authenticated
  with check (auth.uid() = id);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 5. TABELA: user_roles + função has_role (segurança contra escalonamento)
-- ----------------------------------------------------------------------------
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

drop policy if exists "Usuários veem suas próprias roles" on public.user_roles;
create policy "Usuários veem suas próprias roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Admins gerenciam roles" on public.user_roles;
create policy "Admins gerenciam roles"
  on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- 6. TRIGGER: criar profile automaticamente ao registrar novo usuário
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do nothing;

  -- Por padrão, todo novo usuário é Aluno
  insert into public.user_roles (user_id, role)
  values (new.id, 'aluno')
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 7. TABELA: modules
-- ----------------------------------------------------------------------------
create table if not exists public.modules (
  id int primary key,
  title text not null,
  status public.module_status not null default 'locked',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.modules to anon, authenticated;
grant insert, update, delete on public.modules to authenticated;
grant all on public.modules to service_role;

alter table public.modules enable row level security;

drop policy if exists "Todos podem ver módulos" on public.modules;
create policy "Todos podem ver módulos"
  on public.modules for select to anon, authenticated using (true);

drop policy if exists "Admins gerenciam módulos" on public.modules;
create policy "Admins gerenciam módulos"
  on public.modules for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists trg_modules_updated_at on public.modules;
create trigger trg_modules_updated_at
  before update on public.modules
  for each row execute function public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 8. TABELA: lessons
-- ----------------------------------------------------------------------------
create table if not exists public.lessons (
  id text primary key,
  module_id int not null references public.modules(id) on delete cascade,
  title text not null,
  "order" int not null,
  theory text not null default '',
  exercises text not null default '',
  homework text not null default '',
  canva_url text,
  status public.lesson_status not null default 'locked',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_lessons_module on public.lessons(module_id);

grant select on public.lessons to anon, authenticated;
grant insert, update, delete on public.lessons to authenticated;
grant all on public.lessons to service_role;

alter table public.lessons enable row level security;

drop policy if exists "Todos podem ver aulas" on public.lessons;
create policy "Todos podem ver aulas"
  on public.lessons for select to anon, authenticated using (true);

drop policy if exists "Admins gerenciam aulas" on public.lessons;
create policy "Admins gerenciam aulas"
  on public.lessons for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists trg_lessons_updated_at on public.lessons;
create trigger trg_lessons_updated_at
  before update on public.lessons
  for each row execute function public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 9. TABELA: classes (turmas)
-- ----------------------------------------------------------------------------
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  module_ids int[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select on public.classes to authenticated;
grant insert, update, delete on public.classes to authenticated;
grant all on public.classes to service_role;

alter table public.classes enable row level security;

drop policy if exists "Autenticados veem turmas" on public.classes;
create policy "Autenticados veem turmas"
  on public.classes for select to authenticated using (true);

drop policy if exists "Admins gerenciam turmas" on public.classes;
create policy "Admins gerenciam turmas"
  on public.classes for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists trg_classes_updated_at on public.classes;
create trigger trg_classes_updated_at
  before update on public.classes
  for each row execute function public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 10. TABELA: class_students (relação turma-aluno)
-- ----------------------------------------------------------------------------
create table if not exists public.class_students (
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (class_id, student_id)
);

grant select on public.class_students to authenticated;
grant insert, delete on public.class_students to authenticated;
grant all on public.class_students to service_role;

alter table public.class_students enable row level security;

drop policy if exists "Aluno vê suas turmas / admin vê todas" on public.class_students;
create policy "Aluno vê suas turmas / admin vê todas"
  on public.class_students for select to authenticated
  using (auth.uid() = student_id or public.has_role(auth.uid(), 'admin'));

drop policy if exists "Admins gerenciam matrículas" on public.class_students;
create policy "Admins gerenciam matrículas"
  on public.class_students for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- 11. TABELA: student_progress
-- ----------------------------------------------------------------------------
create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  score int not null default 0 check (score between 0 and 100),
  last_slide int,
  total_slides int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, lesson_id)
);

create index if not exists idx_progress_student on public.student_progress(student_id);

grant select, insert, update, delete on public.student_progress to authenticated;
grant all on public.student_progress to service_role;

alter table public.student_progress enable row level security;

drop policy if exists "Aluno vê seu progresso / admin vê tudo" on public.student_progress;
create policy "Aluno vê seu progresso / admin vê tudo"
  on public.student_progress for select to authenticated
  using (auth.uid() = student_id or public.has_role(auth.uid(), 'admin'));

drop policy if exists "Aluno insere seu progresso" on public.student_progress;
create policy "Aluno insere seu progresso"
  on public.student_progress for insert to authenticated
  with check (auth.uid() = student_id);

drop policy if exists "Aluno atualiza seu progresso" on public.student_progress;
create policy "Aluno atualiza seu progresso"
  on public.student_progress for update to authenticated
  using (auth.uid() = student_id)
  with check (auth.uid() = student_id);

drop policy if exists "Admin gerencia progresso" on public.student_progress;
create policy "Admin gerencia progresso"
  on public.student_progress for all to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

drop trigger if exists trg_progress_updated_at on public.student_progress;
create trigger trg_progress_updated_at
  before update on public.student_progress
  for each row execute function public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- 12. SEED: módulos e aulas iniciais
-- ----------------------------------------------------------------------------
insert into public.modules (id, title, status) values
  (1, 'INICIANTE', 'released'),
  (2, 'BÁSICO', 'released'),
  (3, 'INTERMEDIÁRIO', 'locked'),
  (4, 'AVANÇADO', 'locked'),
  (5, 'FLUENTE', 'locked')
on conflict (id) do nothing;

-- 150 aulas (30 por módulo). Primeiras 5 liberadas.
insert into public.lessons (id, module_id, title, "order", status)
select
  'lesson-' || i,
  ((i - 1) / 30) + 1,
  'Aula ' || lpad(i::text, 3, '0'),
  ((i - 1) % 30) + 1,
  case when i <= 5 then 'released'::public.lesson_status else 'locked'::public.lesson_status end
from generate_series(1, 150) as i
on conflict (id) do nothing;

-- ============================================================================
-- PRÓXIMOS PASSOS MANUAIS NO PAINEL DO SUPABASE
-- ============================================================================
-- 1. Crie os usuários iniciais em Authentication → Users → Add user:
--      adm@adm.com    (senha: Ch@nge0987)
--      aluno@aluno.com (senha: Ch@nge1234)
--
-- 2. Promova o admin executando (substitua <UUID_DO_ADMIN>):
--      insert into public.user_roles (user_id, role)
--      values ('<UUID_DO_ADMIN>', 'admin')
--      on conflict do nothing;
--      delete from public.user_roles
--      where user_id = '<UUID_DO_ADMIN>' and role = 'aluno';
--
-- 3. Em Authentication → Providers, habilite Email (e Google se desejar).
-- 4. Em Authentication → Settings, desative "Confirm email" se quiser login direto.
-- 5. Atualize o .env do projeto com VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY
--    do novo projeto Supabase.
-- ============================================================================
