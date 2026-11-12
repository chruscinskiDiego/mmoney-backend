# MMoney Backend

API de finanças pessoais construída com Node.js, TypeScript e Express, com persistência em SQLite por meio do TypeORM.

## Funcionalidades

- Cadastro de usuários e autenticação.
- Gerenciamento de bancos, contas, categorias e despesas.
- Consultas de despesas e resumos por usuário.
- Validação de entradas com Zod, autenticação por token e limitação de requisições.

## Tecnologias

Node.js, TypeScript, Express, TypeORM, SQLite, bcrypt e JWT.

## Executar localmente

```bash
git clone https://github.com/chruscinskiDiego/mmoney-backend.git
cd mmoney-backend
npm ci
```

Antes de iniciar:

1. Configure SERVER_PORT no arquivo .env.
2. Confira outras configurações usadas pela autenticação em src/middleware e src/controllers/login.controller.ts.
3. Configure certificados próprios de desenvolvimento: src/server.ts lê src/ssl/code.crt e src/ssl/code.key para iniciar HTTPS.
4. Alinhe o CORS com a URL do frontend; a origem atual é https://localhost:8080.

```bash
npm run dev
```

## Persistência

[src/database/index.ts](src/database/index.ts) configura um banco SQLite em src/database/db.sqlite. A configuração atual não utiliza PostgreSQL. O modo synchronize está habilitado para desenvolvimento e deve ser revisado antes de qualquer implantação.

## Organização

- `routes/` e `controllers/`: interface HTTP.
- `services/`: operações da aplicação.
- `repositories/`, `entities/` e `database/`: acesso a dados.
- `schemas/`: validação de entradas.
- `middleware/`: autenticação.

## Cliente web

[MMoney Frontend](https://github.com/chruscinskiDiego/mmoney-frontend).

## Escopo e validação

Projeto pessoal de estudo. O repositório contém material de TLS e um arquivo de banco versionados: substitua-os por recursos locais antes de usar com dados reais. O script npm test ainda é um placeholder; a aplicação não foi executada nesta revisão.
