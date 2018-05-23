# keyserver
Servidor de Llaves para Blockchain

## Descripcion
Keyserver es un servidor que permite guardar protegidamente un conjunto de llaves de usuario (keystore)

## API Description

### Guardar Keystore

`POST /keystore/<identifier>`

Permite guardar un keystore protegiendolo con una token secreto

#### Body
```
{
  keystore: {
    <keystore.serialize() object>
  },
  token: <token to protect keystore>
}
```

#### Response

| Status |     Message    |                               |
|:------:|----------------|-------------------------------|
| 200    | Ok.            | Keystore guardado             |
| 400    | Bad Request    | Parameter missing or invalid  |
| 500    | Internal Error | Internal error                |


### Recuperar el Keystore

`GET /keystore/<identifier>`

Permite recuperar el keystore guardado 

#### Header
```
Authorization: Bearer <token that proctect keystore>
```

#### Response

| Status |     Message    |                               |
|:------:|----------------|-------------------------------|
| 200    | Ok.            | Keystore recuperado           |
| 400    | Bad Request    | Parameter missing or invalid  |
| 403    | Forbidden      | Token missing or invalid      |
| 404    | Not found      | Keystore not found            |
| 500    | Internal Error | Internal error                |

#### Response data
```
{
  keystore: {
    <keystore.serialize() object>
  }
}
```

## Install
```
yarn install
```
## Start Server (port 4000)
```
yarn start
```

## cURL tests

Store a keystore

```
curl -i \
  -d '{ "keystore": { "encSeed": {}, "version": 1	}, "token": "055e97f1736b6041640451d90cc209c1"}' \
  -X POST https://keyserver-ajunge.herokuapp.com/keystore/ajunge

```

Recover a keystore
```
curl -i  -H 'Authorization: Bearer 055e97f1736b6041640451d90cc209c1' \
  -X GET https://keyserver-ajunge.herokuapp.com/ajunge
```

