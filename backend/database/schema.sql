-- ==========================================
-- Users Table
-- ==========================================

CREATE TABLE IF NOT EXISTS users (

    name VARCHAR(255) NOT NULL,

    id SERIAL PRIMARY KEY,

    email VARCHAR(255) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    plan VARCHAR(20) NOT NULL DEFAULT 'free',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ==========================================
-- API Keys
-- ==========================================

CREATE TABLE IF NOT EXISTS api_keys (

    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,

    name VARCHAR(100) NOT NULL,

    key_hash TEXT NOT NULL UNIQUE,

    status VARCHAR(20) NOT NULL DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    last_used TIMESTAMP,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE

);

CREATE INDEX IF NOT EXISTS idx_api_key_hash
ON api_keys(key_hash);

CREATE INDEX IF NOT EXISTS idx_api_key_user
ON api_keys(user_id);