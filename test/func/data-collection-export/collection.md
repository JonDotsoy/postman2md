# API SMU Unimarc Auth Service
abc Auth...
## Auth
- Header Bearer: `Bearer {{access_token}}`

## Variables
| Variable | Type | Sample value |
| ---- | ---- | ---- |
| HOST | string | http://localhost:4080 |

## Items
### `POST`: Register with Firebase
Require a `id_token` from firebase auth to register an user.

This return an `access_token` and a `refresh_token`.

*warning*: this endpoint revoke the firebase refresh token.

`{{HOST}}/auth/authorize`

**Header**

| Header | type | Value | Description |
| --- | --- | --- | --- |
| Content-Type | text | application/json | application/json |

**Body**
```json
{
    "grant_type": "firebase",
    "id_token": "{{firebase_id_token}}"
}
```

**Sample**
```shell
$ curl -X POST {{HOST}}/auth/authorize \
    -H 'Content-Type: application/json' \
    -d '{
    "grant_type": "firebase",
    "id_token": "{{firebase_id_token}}"
}'
```

### `POST`: Refresh Token
Allows the re-creation of a valid access token, invalidating the previous refresh token.

`{{HOST}}/auth/token/refresh`

**Header**

| Header | type | Value | Description |
| --- | --- | --- | --- |
| Content-Type | text | application/json |  |

**Body**
```json
{
    "grant_type": "refresh_token",
    "refresh_token": "{{REFRESH_TOKEN}}"
}
```

**Sample**
```shell
$ curl -X POST {{HOST}}/auth/token/refresh \
    -H 'Content-Type: application/json' \
    -d '{
    "grant_type": "refresh_token",
    "refresh_token": "{{REFRESH_TOKEN}}"
}'
```

### `GET`: Test Token
`{{HOST}}/auth/token/test`

**Auth**
- Header Bearer: `Bearer {{ACCESS_TOKEN}}`

**Sample**
```shell
$ curl -X GET {{HOST}}/auth/token/test \
    -H 'Authorization: Bearer {{ACCESS_TOKEN}}'
```

### `GET`: Health
It is used to inspect the state api service.

The parameter `status` returns `pass` if there is no problem. `warn` if there are momentary problems or it is unstable. and `fail` if the service is inaccessible.

`{{HOST}}/health`

**Header**

| Header | type | Value | Description |
| --- | --- | --- | --- |
| Accept | text | application/json |  |

**Sample**
```shell
$ curl -X GET {{HOST}}/health \
    -H 'Accept: application/json'
```

### `GET`: Get info user
`{{HOST}}/user/:userId`

**Path Variable**

| Key | Value | Description |
| ---- | ---- | ---- |
| userId | me |  |


**Auth**
- Header Bearer: `Bearer {{ACCESS_TOKEN}}`

**Sample**
```shell
$ curl -X GET {{HOST}}/user/:userId \
    -H 'Authorization: Bearer {{ACCESS_TOKEN}}'
```

### `PUT`: Update info user
`{{HOST}}/user/:userId`

**Path Variable**

| Key | Value | Description |
| ---- | ---- | ---- |
| userId | me |  |


**Auth**
- Header Bearer: `Bearer {{ACCESS_TOKEN}}`

**Header**

| Header | type | Value | Description |
| --- | --- | --- | --- |
| Content-Type | text | application/json |  |

**Body**
```json
{
    "name": "JAcon ribera",
    "birthdate": "1992-01-28"
}
```

**Sample**
```shell
$ curl -X PUT {{HOST}}/user/:userId \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer {{ACCESS_TOKEN}}' \
    -d '{
    "name": "JAcon ribera",
    "birthdate": "1992-01-28"
}'
```

### `GET`: note

### `GET`: r

