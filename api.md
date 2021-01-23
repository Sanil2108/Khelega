# API Contract

`BASE_URL: `

## Users

`USERS_BASE_URL: ${BASE_URL}/users/`

### Register

```
URL: ${USERS_BASE_URL}/register
METHOD: POST

Request Body: 
{
    username: 'sanil',
    email: 'sanilkhurana7@gmail.com',
    password: 'raymon11',
    description: ''
}

Response Body:
{
    username: 'sanil',
    username: 'sanil',
    email: 'sanilkhurana7@gmail.com',
    password: 'raymon11',
    description: ''
}

Possible status: 201, 400, 
```

### Login

```
URL: ${USERS_BASE_URL}/login
METHOD: POST

Request Headers: 
{
    Authorization: ${atob(EMAIL:PASSWORD)}
}

Response Body:
{
    jwt: "eynkj....."
}

Possible status: 200, 400, 401, 404
```

### Forgot Password

```
URL: ${USERS_BASE_URL}/forgotPassword
METHOD: POST

Request: 
{
    email: 'sanilkhurana7@gmail.com'
}

Response Body:
{
    
}

Possible status: 200, 400, 404
```

### Is Authentic

```
URL: ${USERS_BASE_URL}/isAuthentic
METHOD: POST

Request Headers: 
{
    Authorization: `Bearer ${jwt}`
}

Possible status: 200, 401
```

### Change Password

```
URL: ${USERS_BASE_URL}/changePassword
METHOD: POST

Request: 
{
    token: 'aaavvv',
    password: 'sanil'
}

Possible status: 200, 400
```

### Follow

```
URL: ${USERS_BASE_URL}/follow
METHOD: POST

Request Headers: 
{
    Authorization: ${atob(EMAIL:PASSWORD)}
}

Request: 
{
    email
}

Possible status: 200, 400
```



## Games


