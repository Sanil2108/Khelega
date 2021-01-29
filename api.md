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

`GAMES_BASE_URL: ${BASE_URL}/games/`

### Host Game
```
URL: ${GAMES_BASE_URL}/host
METHOD: POST

Request Headers: 
{
    Authorization: Token ${jwt}
}

Request Body:
{
    gameMasterId: 1,
    skillMasterId: 2,
    totalPeopleRequired: 1,
    frequencyOfPlay: '',
    lookingFor: '',
    description: ''
}

Response Body:
{
    gameId
}

Possible status: 201, 400, 401
```

### Join Game

```
URL: ${GAMES_BASE_URL}/join
METHOD: POST

Request Headers: 
{
    Authorization: Token ${jwt}
}

Request Body:
{
    gameId: 1,
    username: 'sanil21'
}

Response Body:
{
    
}

Possible status: 200, 400, 401, 403
```

### Delete Game
Only allow the user to delete the games he has hosted

```
URL: ${GAMES_BASE_URL}/delete
METHOD: POST

Request Headers: 
{
    Authorization: Token ${jwt}
}

Request Body:
{
    gameId
}

Response Body:
{
    gameId
}

Possible status: 200, 400, 401, 403
```

### Update Game
Only allow the user to update the games he has hosted

```
URL: ${GAMES_BASE_URL}/update
METHOD: POST

Request Headers: 
{
    Authorization: Token ${jwt}
}

Request Body:
{
    gameId,
    updatedGameData
}

Response Body:
{
    gameId
}

Possible status: 200, 400, 401, 403
```