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

First, in the root of the project, install all dependencies:

```
npm run install:all
```

### Terminal

If you have postgres running on your local machine, then run,

```
npm run dev
```

### Docker

Run,

```
docker build -t multi-requests/backend . && docker build -t multi-requests/frontend ./client && docker compose up
```

Navigate to localhost:3000 and click "submit" -- notice, how "HIT TWICE" is printed two times in the terminal output.
