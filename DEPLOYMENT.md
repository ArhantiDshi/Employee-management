# Deployment and security configuration

## Railway backend and MySQL

Configure the backend service with these variables. Use Railway's private MySQL connection values for the JDBC URL, username, and password.

| Variable | Value |
| --- | --- |
| `DB_URL` | `jdbc:mysql://<private-mysql-host>:<port>/<database>` |
| `DB_USERNAME` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `PORT` | Set by Railway; the application reads it automatically |
| `ADMIN_USERNAME` | A new administrator username |
| `ADMIN_PASSWORD` | A long, unique password; do not use the old `admin123` value |
| `JWT_SECRET` | Base64-encoded random key of at least 32 bytes |
| `JWT_ISSUER` | `employee-management-api` (or another stable identifier) |
| `CORS_ALLOWED_ORIGINS` | Exact frontend origin, e.g. `https://your-app.vercel.app` |

Generate a JWT key locally with `openssl rand -base64 32`. Keep it in Railway's variable settings and never put it in Git or a `VITE_` variable. Changing it invalidates all outstanding access tokens.

## Vercel frontend

Set the project root to `frontend`, then configure:

| Variable | Value |
| --- | --- |
| `VITE_API_BASE_URL` | Railway backend's public origin only, e.g. `https://your-service.up.railway.app` |

Do not set frontend username, password, or signing-key variables. These would be exposed to browser users. Redeploy after changing Vercel environment variables.

## Local development

Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `JWT_SECRET` in your local shell before starting the backend or Docker Compose. Use a different secret and password from production. For the Vite dev server, leave `VITE_API_BASE_URL` unset to use the `/api` proxy to localhost.

## Security notes

- Login returns a signed bearer token that expires after 30 minutes. The frontend keeps it in `sessionStorage` and clears it on logout or an expired-token response.
- There is currently one administrator account held in memory. Add individual database-backed accounts, password reset, roles, and login throttling before using this for real employee information.
- Use HTTPS for all deployed traffic, keep the CORS origin restricted to the real frontend domain, and rotate credentials if they were ever committed or shared.
- Database schema currently uses Hibernate `ddl-auto=update`; move to Flyway or Liquibase before evolving a production database.
