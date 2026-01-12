CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (email, password_hash, role)
VALUES (
  'admin@library.com',
  '$2b$10$hiwZ2cEB45g6ZA/jfWWL3uPMbCYWMcKnSxTdwT9oUxPsDidyrS24i',
  'ADMIN'
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  is_rented BOOLEAN DEFAULT false
);

INSERT INTO books (title)
VALUES ('Clean Code'), ('Domain-Driven Design');
