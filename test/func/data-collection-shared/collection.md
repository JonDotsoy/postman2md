# SMU Unimarc Auth Service
abc Auth...

## Authorization
**Type**: Bearer Token

```http
Authorization: Bearer {{ACCESS_TOKEN}}
```
## Variables
- HOST: http://localhost:4080

## Requests
### Register with Firebase
`POST` `{{HOST}}/auth/authorize`

Require a `id_token` from firebase auth to register an user.

This return an `access_token` and a `refresh_token`.

*warning*: this endpoint revoke the firebase refresh token.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Content-Type | `text` | application/json |  |

**Body**

```json
{
    "grant_type": "firebase",
    "id_token": "{{firebase_id_token}}"
}
```
**Sample cURL**

```shell
$ curl -X POST {{HOST}}/auth/authorize\
    -H "Content-Type: application/json"\
    -d '{
    "grant_type": "firebase",
    "id_token": "{{firebase_id_token}}"
}'
```

### Get info user
`GET` `{{HOST}}/user/:userId`

**Authorization** **Type**: Bearer Token

```http
Authorization: Bearer {{ACCESS_TOKEN}}
```
**Path Variables**

| key | value | description |
| ---- | ---- | ---- |
| userId | me | User Id, Use `me` to get user id from `access_token`. |

**Sample cURL**

```shell
$ curl -X GET {{HOST}}/user/:userId
```

### Health
`GET` `{{HOST}}/health`

It is used to inspect the state api service.

The parameter `status` returns `pass` if there is no problem. `warn` if there are momentary problems or it is unstable. and `fail` if the service is inaccessible.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Accept | `text` | application/json |  |

**Sample cURL**

```shell
$ curl -X GET {{HOST}}/health\
    -H "Accept: application/json"
```

### Update info user
`PUT` `{{HOST}}/user/:userId`

**Authorization** **Type**: Bearer Token

```http
Authorization: Bearer {{ACCESS_TOKEN}}
```
**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Content-Type | `text` | application/json |  |

**Path Variables**

| key | value | description |
| ---- | ---- | ---- |
| userId | me | User Id, Use `me` to get user id from `access_token`. |

**Body**

```json
{
	"name": "JAcon ribera",
	"birthdate": "1992-01-28"
}

```
**Sample cURL**

```shell
$ curl -X PUT {{HOST}}/user/:userId\
    -H "Content-Type: application/json"\
    -d '{
	"name": "JAcon ribera",
	"birthdate": "1992-01-28"
}
'
```

### Refresh Token
`POST` `{{HOST}}/auth/token/refresh`

Allows the re-creation of a valid access token, invalidating the previous refresh token.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Content-Type | `text` | application/json |  |

**Body**

```json
{
    "grant_type": "refresh_token",
    "refresh_token": "{{REFRESH_TOKEN}}"
}
```
**Sample cURL**

```shell
$ curl -X POST {{HOST}}/auth/token/refresh\
    -H "Content-Type: application/json"\
    -d '{
    "grant_type": "refresh_token",
    "refresh_token": "{{REFRESH_TOKEN}}"
}'
```

### Test Token
`GET` `{{HOST}}/auth/token/test`

**Only Development**

Try and decode to `access_token`.

**Authorization** **Type**: Bearer Token

```http
Authorization: Bearer {{ACCESS_TOKEN}}
```
**Sample cURL**

```shell
$ curl -X GET {{HOST}}/auth/token/test
```

### red
`GET` `{{HOST}}/user/:userId?eradas=das`

**Path Variables**

| key | value | description |
| ---- | ---- | ---- |
| userId | me | abc |

**Query Params**

| key | value | description |
| ---- | ---- | ---- |
| eradas | das | asd |

**Sample cURL**

```shell
$ curl -X GET {{HOST}}/user/:userId?eradas=das
```

