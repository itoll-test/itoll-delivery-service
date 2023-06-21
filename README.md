# Description

This is a B2B service to register delivery by business. Courier by checking the delivery list, can accept and delivers goods.

# TODO:
1. Use a message broker(RabbitMQ) to keep the latest message update when the webhook doesn't accessible.
2. Use an In-memory database (Redis) to reduce the latency of updating the database. data should remain in memory until the state equals `Delivered`.

#APIs summery
| METHOD |                  ENDPOINT                     |                         DESCRIPTION                         |
| ------ | ----------------------------------------------|--------------------------------------------------------------
|  POST  | /api/v1/auth/login                            | This API accept username and password and returns a JWT_TOKEN
|  POST  | /api/v1/delivery                              | Add new delivery by **business** role
|  PATCH | /api/v1/delivery/{id}/cancel                  | Cancel delivery if the state is NOTE_ACCPTED_BY_COURIER or ACCEPTED_BY_COURIER by **business** role
|  GET   | /api/v1/delivery/NOT_ACCPTED_BY_COURIER/state | Retrieve all deliveries that are not accepted by any **courier**
|  PATCH | /api/v1/delivery/{ID}/confirm                 | Confirm a delivery request by **courier** role
|  PATCH | /api/v1/delivery/{ID}/state                   | Update delivery state by **courier** role
|  PATCH | /api/v1/delivery/{ID}/location                | Update delivery location by **Courier** role
# Installation
## 1. From the source

### Backing service
```bash
$ docker volume create pgdata

$ docker container run --name postgres -d \
-v pgdata:/var/lib/postgresql/data \
-e POSTGRES_USER=itoll \
-e POSTGRES_PASSWORD=itoll \
-e POSTGRES_DB=itoll \
-p 5432:5432 \
postgis/postgis:15-3.3
```
### Create a `.env` file and put the following environment variables in it.
```bash
NODE_ENV=development
ITOLL_BIND_IP=0.0.0.0
ITOLL_PORT=3000
ITOLL_DB_TYPE=postgres
ITOLL_DB_HOST=0.0.0.0
ITOLL_DB_PORT=5432
ITOLL_DB_USERNAME=itoll
ITOLL_DB_PASSWORD=itoll
ITOLL_DB=itoll
ITOLL_PASSPORT_SECRET=itoll_secret
ITOLL_PASSPORT_EXPIRATION_TIME=1h
```

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### Open the following address in your browser to access Swagger-UI and test APIs:
```
http://localhost:3000/doc
```
**notice: Token-generating mechanism is simple; you can just take a token per user's role when the server starts. for taking a new token the server must be restarted.**

## 2. With docker-compose
Simply run the following command to use delivery service:

### Setup environment variables. Because credential information in environment variables, it's best practice to keep Variables in `.env` files.
#### .env.itoll
```bash
NODE_ENV=development
ITOLL_BIND_IP=0.0.0.0
ITOLL_PORT=3000
ITOLL_DB_TYPE=postgres
ITOLL_DB_HOST=postgis
ITOLL_DB_PORT=5432
ITOLL_DB_USERNAME=itoll
ITOLL_DB_PASSWORD=itoll
ITOLL_DB=itoll
ITOLL_PASSPORT_SECRET=itoll_secret
ITOLL_PASSPORT_EXPIRATION_TIME=1h
```
#### .env.postgres
```bash
POSTGRES_USER=itoll 
POSTGRES_PASSWORD=itoll
POSTGRES_DB=itoll
```
### Run Services with docker compose(or docker-compose):

```bash
$ docker compose up -d

or

$ docker-compose up -d
```

### Bring down services:
```bash
$ docker compose down

or

$ docker-compose down
```

### Open the following address in your browser to access Swagger-UI and test APIs:
```
http://localhost:3000/doc
```
**notice: Token-generating mechanism is simple; you can just take a token per user's role when the server starts. for taking a new token the server must be restarted.**

## Stay in touch

- Author - [SeyedMilad Hashemi](https://www.linkedin.com/in/seyed-milad-hashemi/)
