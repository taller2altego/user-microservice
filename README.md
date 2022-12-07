# User Microservice Fiuber
[![codecov](https://codecov.io/github/taller2altego/user-microservice/branch/main/graph/badge.svg?token=KT7TLUJ24V)](https://codecov.io/github/taller2altego/user-microservice)

### Construido con:

[![Node][Node.js]][Node-url]
[![Express][Express.js]][Express-url]
[![PostgrSQL][PostgreSQL]][PostgreSQL-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/es/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/

## Dependencias

Utilizamos [npm](https://www.npmjs.com/) como gestor de paquetes, y [Docker](https://www.docker.com/) para el despliegue local.


## Instalacion:

Clonar el repositorio e instalar paquetes:

    $ git clone git@github.com:taller2altego/user-microservice.git
    $ npm install

Levantar el API Gateway con Docker local:

    $ npm run docker-up

Para instalar el linter:

    $ npm run prepare

## Test

Se pueden correr los test con:

    $ npm run coverage

## Linter
El linter utilizado es [ESlint](https://eslint.org/).

Para correr el linter:

    $ npm run lint

Para solucionar errores automaticos:

    $ npm run lint:fix

## Deploy app a Heroku

El deploy es manual, se debe instalar la CLI de Heroku, logearse en ella y configurar el remote

    $ heroku git:remote -a user-microservice-fiuber

Para deployar:

    $ git push heroku master

Y para ver los ultimos logs:

    $ heroku logs --tail

## Base de datos: PostgreSQL

La base de datos usada es [PostgreSQL](https://www.postgresql.org/).
