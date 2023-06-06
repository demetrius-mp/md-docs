# md-docs

> Write and share markdown documents with a simple and intuitive interface.

## Features

- Multiple layouts (editing, hybrid, preview)
- Resizable panes
- Share documents via link
- GitHub flavored markdown preview

## Running locally

### 1. Cloning the repository

```bash
git clone git@github.com:demetrius-mp/md-docs.git
```

### 2. Installing dependencies

```bash
npm install
```

### 3. Environment variables

Set the environment variables, using the [`.env.example`](.env.example) file as a guide.

The environment variables are the following:

- `DATABASE_URL`: The URL of the database
- `JWT_SECRET_KEY`: Secret key that will be used to generate JWTs
- `JWT_EXPIRES_IN`: JWT expiration time, using [vercel/ms](https://github.com/vercel/ms) notation
- `JWT_ALGORITHM`: The algorihm used to generate JWTs. Defaults to `HS256`
- `PUBLIC_APP_NAME`: Name of the application

### 4. Database migrations

Run the database migrations:

```bash
npx prisma migrate deploy
```

### 5. Running the application

```bash
npm run dev
```
