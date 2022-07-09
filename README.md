# Multi-request bug with Fastify

Bug with a route being hit twice for 1 request, when using Postgres

## Prerequisites

First, make sure you have an `.env` file at the root of your project with the following values:

```
POSTGRES_USER=*
POSTGRES_PASSWORD=*
POSTGRES_SERVICE=*
POSTGRES_PORT=5432
POSTGRES_DB=*
```

## Boot

### Terminal

If you have postgres running on your local machine, then in the root of the folder of the project run,

```
npm run install:all && npm run dev
```

### Docker

Run,

```
docker build -t multi-requests/backend . && docker build -t multi-requests/frontend ./client && docker compose up
```

Navigate to localhost:3000 and click "submit" -- notice, how "HIT TWICE" is printed two times in the terminal output.
