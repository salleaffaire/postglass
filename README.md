# ExpressServiceTemplate-
A microservice template in Node JS using Express/Knex/Objection/PostgreSQL

## Authentication

To disable authentication set the `AUTH_DISABLED` environment variable to "1" (or whetever truthy value). Assigning it to the empty string "" will enable auth. 

<u> _Windows (Powershell)_ </u>

```
$Env:AUTH_DISABLED="1"
```

<u> _Linux/MacOS_ </u>

```
AUTH_DISABLED="1" npm start
```

