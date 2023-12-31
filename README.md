<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)





## Module

Modules are singletons, therefore a module can be imported by multiple other modules.

It is a good practice to have a folder per module, containing the module's components

### @Module Decorator Properties

- Providers[]: available within the module via dependency injection

- Controllers[]

- Exports[]: of providers to export to other modules.

- Imports[]: of modules required by this module.

## Controllers

Handling incoming requests and returning responses to the client.

Bound to a specific path.

Contain handlers.

Can take advantage of dependency injection.

## Providers

Can be injected into constructors.

Can be a plain value, a class, sync/async factory

Providers must be provided to a module for them to be usable.

Can be exported from a module - and then be available to other modules that import it.

## Services

Defined as providers. Not all providers are services.

Common concept within software development.

Singleton when wrapped with @Injectable and provided to a module.

A service will be called from a controller to validate data, create an item in the db, etc.

## NESTJS PIPES

Operate on the arguments to be processed by the route handler, just before the handler is called.
Can perform data transformation or data validation.
Can return data - either original or modified - which will be passed on to the route handler.
Can throw exceptions. 
Can be Async.


Parameter-level pipes: Tend to be slimmer and cleaner. However, they often result in extra code added to handlers - this can get hard to maintain.

Handler-level pipes require some more code, but provide some great benefits:
  - Do not require extra code at the param level.
  - Easier to maintain and expand. 
  - Responsibility of identifying the arguments to process is shifted to one central file - the pipe file
  - Promote usage of DTOs which is very good practice.

## LOGGIN

Log - General purpose logging of important info.

Warning - Unhandled issue that is NOT fatal or destructive

Error - Unhandled issue that is fatal or destructive

Debug - Useful info that can help us debug the logic in case of an error/warning. Intended for Devs

Verbose - Info providing insights about the behavior of the application. Intended for operators.


## License

Nest is [MIT licensed](LICENSE).
