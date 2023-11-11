![Logo](../.github/assets/logo.svg)

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
- [x] Login Social (Google).
- [x] Role de Admin e Usuário.
- [x] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] Upload de Arquivos. Suporte para Local e Amazon S3.
- [x] Swagger.
- [x] E2E e Testes Unitários.
- [x] Docker.
- [x] CI (Github Actions).

## Instalação

Instale chargeline-backend com `bun`

```bash
curl -fsSL https://bun.sh/install | bash
```

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

```bash
bun install

bun migration:run

bun seed:run

bun start:dev
```

## Links

- API: <http://localhost:3001>
- Swagger: <http://localhost:3001/docs>
- Adminer (Cliente para o Banco de Dados): <http://localhost:8080>
- Maildev: <http://localhost:1080>

## Utilitários do Banco de Dados

Gerar migration

```bash
bun migration:generate -- src/database/migrations/CreateNameTable
```

Rodar migration

```bash
bun migration:run
```

Reverter migration

```bash
bun migration:revert
```

Dropar todas as tabelas do banco

```bash
bun schema:drop
```

Rodar seed

```bash
bun seed:run
```

## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
# unit tests
bun test

# e2e tests
bun test:e2e
```

## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.

## Referência

- [NestJS](https://nestjs.com/)
- [TypeORM](https://www.npmjs.com/package/typeorm)
- [Boilerplate](https://github.com/brocoders/nestjs-boilerplate)
