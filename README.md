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

```
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

