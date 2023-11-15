![Logo](../.github/assets/logo_dark.svg#gh-dark-mode-only)
![Logo](../.github/assets/logo_light.svg#gh-light-mode-only)

# Backend

Nossa API para gestão de combustíveis.

## Stack utilizada

**Back-end:** Node, NestJS, Jest, Docker

**Banco de Dados:** TypeORM, PostgreSQL

## Funcionalidades

- [x] Banco de Dados ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer)).
- [x] Login e Cadastro via E-mail.
- [x] Role de Admin e Usuário.
- [x] Swagger.
- [x] E2E e Testes Unitários.
- [x] Docker.

## Instalação

```bash
git clone git@github.com:hayatojpg/chargeline.git

cd chargeline/backend

cp env-example .env
docker compose up -d
```

Para checkar os logs

```bash
docker compose logs
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

```bash
NODE_ENV=development
APP_PORT=3001
APP_NAME="ChargeLine API"
API_PREFIX=api
APP_FALLBACK_LANGUAGE=pt-BR
APP_HEADER_LANGUAGE=x-custom-lang
FRONTEND_DOMAIN=http://localhost:3000
BACKEND_DOMAIN=http://localhost:3001

DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=root
DATABASE_PASSWORD=secret
DATABASE_NAME=api
DATABASE_SYNCHRONIZE=false
DATABASE_MAX_CONNECTIONS=100
DATABASE_SSL_ENABLED=false
DATABASE_REJECT_UNAUTHORIZED=false
DATABASE_CA=
DATABASE_KEY=
DATABASE_CERT=

# Support "local", "s3"
FILE_DRIVER=local
ACCESS_KEY_ID=
SECRET_ACCESS_KEY=
AWS_S3_REGION=
AWS_DEFAULT_S3_BUCKET=

MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USER=
MAIL_PASSWORD=
MAIL_IGNORE_TLS=true
MAIL_SECURE=false
MAIL_REQUIRE_TLS=false
MAIL_DEFAULT_EMAIL=noreply@example.com
MAIL_DEFAULT_NAME=Api
MAIL_CLIENT_PORT=1080

AUTH_JWT_SECRET=secret
AUTH_JWT_TOKEN_EXPIRES_IN=15m
AUTH_REFRESH_SECRET=secret_for_refresh
AUTH_REFRESH_TOKEN_EXPIRES_IN=3650d

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

WORKER_HOST=redis://redis:6379/1
```

## Rodando localmente

Mude `DATABASE_HOST=postgres` para `DATABASE_HOST=localhost`

Mude `MAIL_HOST=maildev` para `MAIL_HOST=localhost`

Mude `BACKEND_DOMAIN=api` para `MAIL_HOST=http://localhost:3001`

```bash
npm run install

npm run migration:run

npm run seed:run

npm run start:dev
```

## Links

- API: <http://localhost:3001>
- Swagger: <http://localhost:3001/docs>
- Adminer (Cliente para o Banco de Dados): <http://localhost:8080>
- Maildev: <http://localhost:1080>

## Utilitários do Banco de Dados

Gerar migration

```bash
npm run migration:generate -- src/database/migrations/CreateNameTable
```

Rodar migration

```bash
npm run migration:run
```

Reverter migration

```bash
npm run migration:revert
```

Dropar todas as tabelas do banco

```bash
npm run schema:drop
```

Rodar seed

```bash
npm run seed:run
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e
```

## Referência

- [NestJS](https://nestjs.com/)
- [TypeORM](https://www.npmjs.com/package/typeorm)
