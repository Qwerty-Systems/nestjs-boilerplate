#!/usr/bin/env bash
set -e

# Wait for database connection
/opt/wait-for-it.sh 157.230.103.101:5432 --timeout=30 --strict

# Run migrations & seed
npm run migration:run
npm run seed:run:relational

# Start app in production mode
npm run start:prod
