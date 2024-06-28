-- Your SQL goes here
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table teams (
    id uuid default uuid_generate_v4() not null primary key,
    name varchar,
    website varchar,
    about text,
    no_of_seats integer default 5,
    metadata jsonb,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    deleted_at timestamp
);

create table users (
    id uuid default uuid_generate_v4() not null primary key,
    firstname varchar not null,
    lastname varchar not null,
    email varchar not null,
    password varchar not null,
    role varchar not null,
    profile_pic varchar,
    about text,
    timezone varchar,
    metadata jsonb,
    team_id uuid not null references teams ON DELETE CASCADE,
    created_at timestamp default CURRENT_TIMESTAMP,
    updated_at timestamp default CURRENT_TIMESTAMP,
    deleted_at timestamp
);