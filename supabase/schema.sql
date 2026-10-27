create extension if not exists pgcrypto;
create table if not exists bets (id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(), date_pari date not null, match text not null, sport text not null, type_pari text not null check (type_pari in ('simple','combiné')), mise numeric not null check (mise > 0), cote numeric not null check (cote >= 2.00), resultat text not null default 'en_cours' check (resultat in ('en_cours','gagné','perdu')), note text);
create table if not exists bankroll_movements (id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(), date_mouvement date not null, type text not null check (type in ('dépôt','retrait')), montant numeric not null check (montant > 0), note text);
create table if not exists settings (id boolean primary key default true, bankroll_initiale numeric not null default 0, devise text not null default 'FCFA', mise_max_pourcent numeric);
alter table bets enable row level security; alter table bankroll_movements enable row level security; alter table settings enable row level security;
-- TEMPORAIRE : accès public sans authentification. À remplacer par authentification et RLS par utilisateur avant toute utilisation multi-utilisateur.
create policy "public bets" on bets for all using (true) with check (true);
create policy "public movements" on bankroll_movements for all using (true) with check (true);
create policy "public settings" on settings for all using (true) with check (true);
