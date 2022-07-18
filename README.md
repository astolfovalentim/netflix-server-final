<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->
# NETFLIX SERVER - Projeto do MÓDULO 5

O projeto é inspirado na Netflix, plataforma de streaming de filmes e séries.
O objetivo é criar uma API backend com usuários, perfis, filmes e gêneros para que usuários possam se cadastrar, selecionar diferentes perfis (semelhante ao sistema de perfis da Netflix) e acessar os filmes disponíveis.
Assim que o login for feito, a tela principal exibirá os filmes disponíveis, seguindo os exemplos a seguir. É possível favoritar os filmes, sendo que a lista de filmes favoritos é individual para cada perfil. Esses filmes irão compor a primeira sessão da página, sob o título de "filmes Favoritos". Logo após essa seção, temos as seções dos outros filmes, classificados por gênero.

## Pré-requisitos

Backend com a estrutura básica seguinte:

API backend com usuários, perfis, filmes e gêneros.

- Estrutura da Entidade: Usuários (Users)
- Name;
- Email;
- Password;
- CPF;
- isAdmin;

Estrutura da Entidade: Perfis (Profiles)

- Title;
- ImageURL;
- Estrutura da Entidade: filmes (Movies)
- Title;
- CoverImageUrl;
- Description;
- Year;
- ImdbScore (0 a 5);
- TrailerYouTubeUrl;

Estrutura da Entidade: Gêneros (Genres)

- Name;
- Relações
- Um usuário x muitos perfis;
- Muitos filmes x muitos gêneros;
- Muitos perfis x muitos filmes (filmes favoritos);

Endpoints

- [Create] Usuários (não precisa de autenticação);
- [AUTH] [GET] Homepage: lista de filmes favoritos; lista de filmes, classificados por gênero;
- [AUTH] [CRUD] Perfis; Favoritar filme;
- [AUTH] [ADMIN] [CRUD] Usuários (apenas admins podem gerenciar usuários);
- [AUTH] [ADMIN] [CRUD] filmes (apenas admins podem criar filmes);
- [AUTH] [ADMIN] [CRUD] Gêneros (apenas admins podem criar gêneros).

Requisitos

- Validação de dados em todos os endpoints com class-validator;
- Status Code corretos em todos os endpoints:
- 200, 201, 400, 404, etc.
- Persistência de Dados no SQL com Prisma;
- Formatação do código utilizando o Prettier/ESLint;
- Documentação dos endpoints com Swagger;
- Diagrama de relacionamentos do banco de dados;
- Cors habilitado;
- Deploy do projeto;
- Deploy do banco de dados.

É obrigatório estar previamente instalado:

> - **Node** com versão superior ou igual que 16.15.0 - [Node Download](https://nodejs.org/pt-br/download/)
> - **NPM** com versão superior ou igual que 8.0.0 - [Npm Download](https://www.npmjs.com/package/download)
> - **Visual Studio Code** com versão superior ou igual que 1.67.2 - [Visual Studio Code Download](https://code.visualstudio.com/download)
> - **Thunder Client** com versão superior ou igual que 11.14.00 - [Thunder Client Download](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
> - **PostgreSQL** com versão superior ou igual que 1.67.2 - [PostgreSQL Downloads](https://www.postgresql.org/download/)

## Instalação

Link da branch do projeto no github

```bash
https://github.com/astolfovalentim/netflix-server.git
```

> Acesse a pasta do projeto seu terminal:

```bash
 	cd [Nome da pasta do seu projeto]
```

> Instalação - digite o seguinte comando:

```bash
$ npm install
```

<<<<<<< HEAD

## Clone

```bash
$ git clone https://github.com/astolfovalentim/netflix-server.git
```

## Running the app

=======

> Instalação -do NestJS CLI:

```bash
$ npm i -g @nestjs/cli
```

## Execução

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

> A aplicação estará disponível para visualização em seu navegador, caso isso não aconteça automaticamente, abra o navegador no seguinte endereço: _localhost:3333_

## Swagger

Todas as rotas estão no swagger

```bash
https://netflix-server-back.herokuapp.com/api
```

## PrismaStudio

```bash
http://localhost:5555/
```

## Autor

> - **Astolfo Valentim** - [Github](https://github.com/astolfovalentim)

## Licença

> MIT License (MIT)
