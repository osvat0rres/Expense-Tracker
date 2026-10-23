# Expense Tracker
A full-stack expense tracking application built with React and Django REST Framework. The project includes account registration and authentication, expense management, and a review feature. The application is deployed on Render, with a GitHub Actions workflow for building and publishing Docker images.

## Live Demo
- Frontend: https://expense-tracker-frontend-rufm.onrender.com
- GitHub repository: https://github.com/osvat0rres/Expense-Tracker

# Deployment Summary
## Frontend
- React (Create React App)
- Axios for API requests
- React Router for navigation
## Backend
- Python
- Django
- Django REST Framework
- Token-based authentication
## DevOps and Deployment
- Docker and Docker Compose
- GitHub Actions for CI/CD
- GitHub Container Registry (GHCR)
- Render for hosting

## Features
- User registration and login
- Authenticated API requests using access tokens
- Create, view, edit, and delete expenses
- Expense categories, descriptions, amounts, and dates
- User-specific expense access
- Reviews for the Expense Tracker application
- Public review viewing, with editing and deletion restricted to the review owner
- Responsive React interface

## Architecture
```
Browser
  |
  v
React frontend (Render)
  |
  | Axios API requests
  v
Django REST Framework backend (Render)
  |
  v
Configured production database
```
## Local Development
Prerequisites
install the following tools:
- Git
- Python
- Node.js and npm
- Docker Desktop (optional, for container-based development)

Django rest-freamework
```
 pip install djangorestframework           
```

Django web-token
```
 pip install djangorestframework-simplejwt
```

to install silk to avoided the n-1 problem
```
pip install django-silk 
```
Install React
```
npx create-react app frontend
```

download the packages to connect the frontend with the backend
```
npm install axios react-dom jwt-decode
```
This is to connect the backend with the front end
```
 pip install django-cors-headers
```

install validator
```
npm install validator
```
uses this commands to run the website in docker

1. Go inside the root directory
2. 
```
docker compose up -d
```

to stop the container when you are done
```
docker compose down
```
Local URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

Building a new key 
```
python -c "import secrets; print(secrets.token_urlsafe(50))"
```
after creating a new key run
```
docker compose up -d --build backend
```
CI/CD Workflow
The GitHub Actions workflow is intended to:
1. Run when code is pushed or the workflow is triggered.
2. Build the Docker images.
3. Publish the images to GitHub Container Registry (GHCR).
To verify the workflow:
1. Open the repository on GitHub.
2. Select Actions.
3. Open the latest Expense Tracker CI run.
4. Confirm the image-build and image-publish jobs succeed.
5. Check the repository's Packages section for published images.
 Publishing images to GHCR and deploying the application to Render are separate processes unless the workflow is explicitly configured to trigger or perform the Render deployment.

## Troubleshooting Notes 
Registration request stays pending
Use the browser developer tools:
1. Open Network and filter by Fetch/XHR.
2. Submit the registration form.
3. Inspect the POST /register/ request, not just the OPTIONS preflight request.
4. Check its status, response, and timing.
5. Check the Render backend logs at the same time.
An OPTIONS response of 200 OK only confirms the preflight request succeeded; it does not prove the actual registration POST completed. A successful direct API test also does not guarantee the browser request is working end to end.
Frontend cannot reach the API
- Confirm REACT_APP_API_URL is the backend base URL, without an endpoint suffix.
- Check browser console and Network errors.
- Verify Django CORS configuration includes the deployed frontend origin.
- Rebuild/redeploy the React app after changing environment variables.
Docker cannot connect to the engine
If you see an error mentioning dockerDesktopLinuxEngine or a missing named pipe, start Docker Desktop and wait until its engine is running, then retry the command.
Static image returns 404
Confirm the image exists in the correct frontend public/static directory and that the code references its deployed path correctly. A missing illustration is separate from API registration unless the browser console shows another related error.
Security Notes
- Keep Django SECRET_KEY and database credentials in environment variables.
- Never commit .env files containing secrets.
- Use HTTPS for production API requests.
- Use strong passwords and validate user input on the backend.
- Review CORS and allowed-host settings before deployment.
- Configure persistent production database storage; do not rely on an ephemeral filesystem for important user data.
