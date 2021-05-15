# ExpressServiceTemplate-
A microservice template in Node JS using 
- Express
- Knex
- Objection
- PostgreSQL

that you can use as a starting point building a new microservice exposing a REST API. 

You can also easily enable authentication with JWT Bearer tokens.  

## Authentication

To disable authentication set the `AUTH_DISABLED` environment variable to "1" (or whetever truthy value). Assigning it to the empty string "" will enable auth. 

<u> _Linux/MacOS_ </u>

```
AUTH_DISABLED="1" npm start
```

