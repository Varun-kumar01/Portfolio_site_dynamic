# Database Setup Guide

## Prerequisites
- PostgreSQL installed and running
- PostgreSQL server accessible at localhost:5432

## Setup Steps

### Step 1: Create the Database (if not exists)

Open PostgreSQL command line (psql) or use a database client like pgAdmin and run:

```sql
-- Create database if it doesn't exist
CREATE DATABASE final_adluri OWNER postgres;
```

### Step 2: Verify Database Connection

Test your connection:
```bash
psql -h localhost -U postgres -d final_adluri -c "SELECT NOW();"
```

You should be prompted for the password: `srilatha`

### Step 3: Verify .env Configuration

Make sure `.env` file has:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=final_adluri
DB_USER=postgres
DB_PASSWORD=srilatha
JWT_SECRET=5e562bd7e6dda2f58195c244832fcd0ec6257999fbb6ecf5fad37081db652893fa81f9ee8a840554042471305890434add310b6250d90989e8ac95ae9b1e67cd
ADMIN_PASSWORD=admin123
```

### Step 4: Run Database Initialization

After creating the database, start the server:

```bash
cd backend
node server.js
```

The server will automatically:
1. Connect to PostgreSQL
2. Create all necessary tables (admins, videos, political_career)
3. Create default admin user
4. Start the API server

### Step 5: Verify Tables Created

Once server is running, check database with:

```bash
psql -h localhost -U postgres -d final_adluri
```

Then run:
```sql
-- List all tables
\dt

-- Check videos table
SELECT * FROM videos;

-- Check admins table
SELECT id, name, email, role FROM admins;
```

## Troubleshooting

### Database doesn't exist
```sql
CREATE DATABASE final_adluri;
```

### Wrong password
Update DB_PASSWORD in `.env` file

### Port already in use
Change PORT in `.env` file

### Permission denied
Run PostgreSQL commands with proper user (usually `postgres`)

## Using pgAdmin (GUI Alternative)

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Create new database: `final_adluri`
4. Run the SQL commands from init-db.sql

Then restart the Node server.
