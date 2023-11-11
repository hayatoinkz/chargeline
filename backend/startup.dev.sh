#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres:5432
bun migration:run
bun seed:run
bun start:prod
