# SMU Unimarc Auth Service
Authentication Service SMU APP.

## Menu
- Auth: Principal apis to register and authorize.
  - Authorize
    - [Authorize with Firebase](#1f4d34d0-7be8-41ed-9388-c0490a83198e)
    - [Authorize with RUT](#1750b78e-6b6e-46cf-b42d-e9eb13987369)
    - [Authorize with Email](#2c25eb90-5e06-474e-a932-c249d110b09c)
  - Register: The register require validation using the phone number.
    - [Register by RUT](#5182ce85-ae9f-43ff-be65-eea8ee57c4d5)
    - [Active Register](#2402d825-8e27-4e93-a5bb-680707c77711)
  - Session
    - [Refresh Token](#a9a858a7-e1b3-4503-ad5c-cc3365fc2a7a)
    - [Test Token](#b35a341a-bb80-41ac-9f81-604af100bad5)
- Util
  - [Health](#765e531f-4a5c-4fe9-a64b-0db31764fb96)
- User
  - [Get info user](#5462dfaa-60cb-4825-89c0-574c2d0e5c03)
  - [Update info user](#92238fe6-7846-45c1-9fba-b3863a412dd1)

## Authorization
**Type**: Bearer Token

```http
Authorization: Bearer {{ACCESS_TOKEN}}
```
## Variables
- BASEURL: http://localhost:4080

## Requests
### <i id="1f4d34d0-7be8-41ed-9388-c0490a83198e"></i>Authorize with Firebase
`POST` `{{BASEURL}}/auth/authorize`

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
    "id_token": "{{FIREBASE_ID_TOKEN}}"
}
```
**Sample cURL**

```shell
$ curl -X POST {{BASEURL}}/auth/authorize \
    -H "Content-Type: application/json" \
    -d '{
    "grant_type": "firebase",
    "id_token": "{{FIREBASE_ID_TOKEN}}"
}'
```

### <i id="1750b78e-6b6e-46cf-b42d-e9eb13987369"></i>Authorize with RUT
`POST` `{{BASEURL}}/auth/authorize`

Use it to authorize the user using RUT.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Content-Type | `text` | application/json |  |

**Body**

```json
{
    "grant_type": "email",
    "rut": "9199951K",
    "password": "12342"
}
```
**Sample cURL**

```shell
$ curl -X POST {{BASEURL}}/auth/authorize \
    -H "Content-Type: application/json" \
    -d '{
    "grant_type": "email",
    "rut": "9199951K",
    "password": "12342"
}'
```

### <i id="2c25eb90-5e06-474e-a932-c249d110b09c"></i>Authorize with Email
`POST` `{{BASEURL}}/auth/authorize`

Use it to authorize the user using email.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Content-Type | `text` | application/json |  |

**Body**

```json
{
    "grant_type": "email",
    "email": "jonad.correo@gmail.com",
    "password": "12342"
}
```
**Sample cURL**

```shell
$ curl -X POST {{BASEURL}}/auth/authorize \
    -H "Content-Type: application/json" \
    -d '{
    "grant_type": "email",
    "email": "jonad.correo@gmail.com",
    "password": "12342"
}'
```

### <i id="5182ce85-ae9f-43ff-be65-eea8ee57c4d5"></i>Register by RUT
`POST` `{{BASEURL}}/auth/register`

Use to register a new user.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Content-Type | `text` | application/json |  |

**Body**

```json
{
    "grant_type": "email",
    "rut": "9199951K",
    "email": "jonad.correo@gmail.com",
    "phone": "56947331064",
    "password": "12342"
}
```
**Sample cURL**

```shell
$ curl -X POST {{BASEURL}}/auth/register \
    -H "Content-Type: application/json" \
    -d '{
    "grant_type": "email",
    "rut": "9199951K",
    "email": "jonad.correo@gmail.com",
    "phone": "56947331064",
    "password": "12342"
}'
```

### <i id="2402d825-8e27-4e93-a5bb-680707c77711"></i>Active Register
`POST` `{{BASEURL}}/auth/register/:registersPendingId`

Use to active the user with code.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Content-Type | `text` | application/json |  |

**Path Variables**

| key | value | description |
| ---- | ---- | ---- |
| registersPendingId | 5cd350f1aed446d49bc8c456 |  |

**Body**

```json
{
    "code": "6154"
}
```
**Sample cURL**

```shell
$ curl -X POST {{BASEURL}}/auth/register/:registersPendingId \
    -H "Content-Type: application/json" \
    -d '{
    "code": "6154"
}'
```

### <i id="a9a858a7-e1b3-4503-ad5c-cc3365fc2a7a"></i>Refresh Token
`POST` `{{BASEURL}}/auth/token/refresh`

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
$ curl -X POST {{BASEURL}}/auth/token/refresh \
    -H "Content-Type: application/json" \
    -d '{
    "grant_type": "refresh_token",
    "refresh_token": "{{REFRESH_TOKEN}}"
}'
```

### <i id="b35a341a-bb80-41ac-9f81-604af100bad5"></i>Test Token
`GET` `{{BASEURL}}/auth/token/test`

**Only Development**

Try and decode to `access_token`.

**Authorization** **Type**: Bearer Token

```http
Authorization: Bearer {{ACCESS_TOKEN}}
```
**Sample cURL**

```shell
$ curl -X GET {{BASEURL}}/auth/token/test
```

### <i id="765e531f-4a5c-4fe9-a64b-0db31764fb96"></i>Health
`GET` `{{BASEURL}}/health`

It is used to inspect the state api service.

The parameter `status` returns `pass` if there is no problem. `warn` if there are momentary problems or it is unstable. and `fail` if the service is inaccessible.

**Heders**

| key | type | value | description |
| ---- | ---- | ---- | ---- |
| Accept | `text` | application/json |  |

**Sample cURL**

```shell
$ curl -X GET {{BASEURL}}/health \
    -H "Accept: application/json"
```

### <i id="5462dfaa-60cb-4825-89c0-574c2d0e5c03"></i>Get info user
`GET` `{{BASEURL}}/user/:userId`

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
$ curl -X GET {{BASEURL}}/user/:userId
```

### <i id="92238fe6-7846-45c1-9fba-b3863a412dd1"></i>Update info user
`PUT` `{{BASEURL}}/user/:userId`

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
$ curl -X PUT {{BASEURL}}/user/:userId \
    -H "Content-Type: application/json" \
    -d '{
	"name": "JAcon ribera",
	"birthdate": "1992-01-28"
}
'
```

