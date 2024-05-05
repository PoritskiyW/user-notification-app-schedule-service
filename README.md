<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Description

Scheduler microservice for project ["User notification app"](https://github.com/PoritskiyW/user-notification-app)

Built using NestJS, Redis.

# Requirements

NodeJS

Redis server obtained in any way (via docker image/cloud server/local installation)

NestJS CLI

# Installation

```bash
$ npm install
```

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

# ENV

For local development ".env" file is needed to be located in the root directory

Example file 
```md
REDIS_HOST=redis
REDIS_PORT=6379
# USER_NOTIFICATION_TIMEOUT_MS=86400000 # 24h
USER_NOTIFICATION_TIMEOUT_MS=120000 # 2m (test)
```
