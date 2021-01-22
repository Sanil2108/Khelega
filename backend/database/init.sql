-- Creating tables
CREATE TABLE IF NOT EXISTS user_master (
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS follows (
    follows_id SERIAL PRIMARY KEY,
    followed_by_user_id INT,
    follows_user_id INT
);

CREATE TABLE IF NOT EXISTS joining (
    joining_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS hosting (
    hosting_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS game (
    game_id SERIAL PRIMARY KEY,
    game_master_id INT NOT NULL,
    skill_master_id INT NOT NULL,
    total_people_required INT,
    frequency_of_play TEXT,
    looking_for TEXT,
    description TEXT
);

CREATE TABLE IF NOT EXISTS game_master (
    game_master_id SERIAL PRIMARY KEY,
    game_name TEXT NOT NULL,
    icon_url TEXT NOT NULL,
    genre TEXT NOT NULL,
    is_free BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS game_platform_mapping (
    game_platform_id SERIAL PRIMARY KEY,
    platform_id INT NOT NULL,
    game_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_master (
    platform_master_id SERIAL PRIMARY KEY,
    platform_master_name TEXT,
    platform_master_icon TEXT
);

CREATE TABLE IF NOT EXISTS skill_master (
    skill_master_id SERIAL PRIMARY KEY,
    skill_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS game_master_platform_mapping (
    game_master_platform_mapping SERIAL PRIMARY KEY, 
    platform_id INT NOT NULL,
    game_master_id INT NOT NULL
);

CREATE TABLE IF NOT EXISTS forgot_password_token (
    forgot_password_token_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL
);