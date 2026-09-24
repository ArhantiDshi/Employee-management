# Deployment Guide

## 1) Frontend on Vercel

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Set the project root to `frontend`.
4. Add environment variables:
   - `VITE_API_BASE_URL=https://your-backend-url.com`
   - `VITE_API_USERNAME=admin`
   - `VITE_API_PASSWORD=your-secure-password`
5. Deploy.

## 2) Backend on Render

1. Create a new Web Service in Render.
2. Connect the GitHub repository.
3. Set the root directory to `backend`.
4. Use the existing `pom.xml` and Java runtime.
5. Add environment variables:
   - `DB_URL=jdbc:mysql://your-db-host:3306/employee_management`
   - `DB_USERNAME=your-db-user`
   - `DB_PASSWORD=your-db-password`
   - `SERVER_PORT=8080`
6. Deploy.

## 3) Database on Railway / managed MySQL

Use a managed MySQL provider and copy the connection values into Render environment variables.

## 4) Production notes

- Never commit real credentials.
- Use strong passwords for production.
- Update frontend API URL after deployment.
- Consider enabling HTTPS and CORS only for trusted domains.
