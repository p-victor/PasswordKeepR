-- dropping tables if they exist --

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS app_credentials CASCADE;
DROP TABLE IF EXISTS app_list CASCADE;
DROP TABLE IF EXISTS shared_access CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- re-/CREATing all the table --

-- users
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  phone VARCHAR(16)
);

-- categories of apps, customizable by user
CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- list of apps that is used for credentials
CREATE TABLE app_list (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255),
  domain VARCHAR(255) NOT NULL
);

-- credentials of apps, suggestion: rename table app_credentials
CREATE TABLE app_credentials (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  app_id INTEGER REFERENCES app_list(id) ON DELETE CASCADE,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  last_password_reset DATE NOT NULL DEFAULT CURRENT_DATE
);

-- middle tables connecting 'users' and 'app_credentials' and adding a "edit" privilidge.
CREATE TABLE shared_access (
  id SERIAL PRIMARY KEY NOT NULL,
  credential_id INTEGER REFERENCES app_credentials(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  can_edit BOOLEAN
);
