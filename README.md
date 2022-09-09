<!-- <p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p> -->

## Description

### the Door

this is a software designed to connect a specific smart door
to it's owner with to allow communication and control across internet connection

### use cases

the app has 2 main actors

- door
- door owner

#### door use cases

- the door can detect if it has been opened or closed or moved manually so it saves this event in some kind of storage with the angle movements

- the door will get commands from the door owner act on the command
  and then save this act as an event (done in the front end in another repo)

- the door can look for the auto close time and if in the time the door
  auto closes if opened

### door owner use cases

- can send action command to the door (open - close - move to certain angle)
- set the auto close time of the door

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - ahmed4040400@gmail.com
- Website - el-shentenawy.com
