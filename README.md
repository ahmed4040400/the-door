##### Note

this code is only for the back-end of the door (the communication part),
there is gonna be 2 front-end repositories

- the door front-end (probably esp chip with sensors and actuator to handle the movements and the connection)
- the door owner front-end (mobile application)

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

  #### door owner use cases

  - can send action command to the door (open - close - move to certain angle)
  - set the auto close time of the door

### code style

the system is implemented using the **Clean Architecture**
which makes the app components decoupled and testable and future proof

### flow of control

the flow of control of the system will be something like this figure

Classes marked with \<i\> are interfaces; Open arrowheads are using relationships. Closed arrowheads are
implements or inheritance relationships.

the dashed lines are defined boundaries
note that the arrows never point outside the boundaries they always pointing inward

this is a following of the dependency rule to keep the high level components decoupled from the low level components

note: this is not the a detailed chart but it shows the idea
read more about <a href="https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html">**_Clean Architecture_** </a>

<p align="center">
  <img src="https://github.com/ahmed4040400/the-door/blob/master/flow%20of%20controle%20for%20(the-door).png?raw=true"  alt="flow of control" />
</p>

### REST API framework

the framework used for the rest api is <a href="https://nestjs.com/">**_nest.js_** </a>, this is an early decision that can be delayed if we want to (
thanks to the clean architecture)

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
