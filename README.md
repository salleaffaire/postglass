# ExpressServiceTemplate-
This is a Node JS microservice template that is built with the follwoing libraries 
- Express
- Knex
- Objection
- PostgreSQL

It can be used as a starting point for building a new microservice exposing a REST API. 

The project also includes examples of unit and integration tests built with, 

- Mocha
- Chai
- Sinon
- Supertest

Feel free to fork it. I'll try to keep it up to date as much as possible and add other integrations.

## Authentication

When `AUTH_DISABLED` is left unset, all routes expect a JWT Bearer token.

You can configure the issuer and audience in the `app/config.js` file. 

```javascript
config.auth = {
  enabled: !process.env.AUTH_DISABLED,
  audience: process.env.AUTH_AUDIENCE || '',
  issuer: process.env.AUTH_ISSUER || 'acme.auth0.com'
}
```

To disable authentication set the `AUTH_DISABLED` environment variable to "1" (or whetever truthy value). Assigning it to the empty string "" will enable auth. 

<u> _Linux/MacOS_ </u>

```
AUTH_DISABLED="1" npm start
```

### Overriding the auth handler

It is possible to easily override the auth handler by providing an alternate handler to the authhandler() function at the router level.

For example,

```javascript
  router.get('/users', authHandler((res, req, next) => {
    setUser(req, { userName: 'test.user@acme.com', id: 'f405d0b1-9577-4f41-b6d6-6e4d88e68db7' })
    next()
  }), controller.getAllUsers)
```

overrides and bypass the auth handler for the `GET /users` route only.

## Start postgres for development

### Docker

Start a dockerized PostgreSQL instance

```bash
docker run -e POSTGRES_DB=postgres -e POSTGRES_USER=postgres -e ALLOW_EMPTY_PASSWORD=yes -p 5432:5432 bitnami/postgresql:11.6.0
```

once started, you can connect to the DB from a separate terminal,

```bash
docker exec -it sad_ellis psql -d postgres -U postgres
```
