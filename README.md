# Expense Tracker
This application is still in progress.
# Basic Features
1. User registration/Login
   - create account
   - Login/logout
   - Password Authentication
2. Add an expense
3. view Expenses
4. expense categories
   - food
   - entertainment
   - Bills
   - shopping
   - education
   - other
5. monthly dashboard
- will tell you how much you spend in a month or week
6. Budget system
7. Recurring expenses

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

change privilagres
