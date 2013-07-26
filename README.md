# Generator-angularjs
[![Build Status](https://secure.travis-ci.org/kevin-wolf/generator-angularjs.png?branch=master)](https://travis-ci.org/kevin-wolf/generator-angularjs)

A generator for Yeoman.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed: `npm install -g yo`.
- Install the generator: `npm install -g generator-angularjs`.
- Make a new directory and `cd` into it `mkdir myApp && cd $_`.
- Run `yo angularjs` if you want a custom app name run `yo angularjs myAwesomeApp`.
- Run `grunt dev` to start developing and `grunt` for building.

## Generators
* [angularjs](#app)
* [angularjs:controller](#controller)
* [angularjs:view](#view)
* [angularjs:route](#route)
* [angularjs:filter](#filter)
* [angularjs:service](#service)

### App
Scaffolds a new AngularJS application, you will be prompted for some configuration params such as folder names, engines (CoffeeScript, Compass, Jade) and ngModules (angular-resource, restangular).

```bash
yo angularjs
```

Or

```bash
yo angularjs:myAwesomeApp
```

### Controller
Generates a new controller in `app/scripts/controllers/`. And adds it to your index (dot jade or dot html depending on your engines configuration).

```bash
yo angularjs:controller awesome
```

### View
Generates a new view in `app/templates/views/`.

```bash
yo angularjs:view awesomeView
```

### Route
Hooks for `angularjs:controller` and `angularjs:view` and add the new view to your `app.coffee` or `app.js`.

```bash
yo angularjs:route awesome
```

_Note: if your route name is "main", the route will be `.when('/', {})`._

### Filter
Creates a new filter.

```bash
yo angularjs:filter reverse
```

### Service
This is a more interactive generator, when you fire it, it will prompt you which kind of service did you want to create (service, factory, provider, value or constant).

```bash
yo angularjs:service awesome
```

## Application configuration.
One of the features that makes this generator different than others, is the implementation of `config/appConfig.json` file.

### What it is?
Is a folder in which you will have your application configuration, such as folders, your angular application module name, etc.

Everytime you run a generator, it would read your `config/appConfig.json` file to figure out what engines are you using (CoffeeScript, Compass, Jade) and generate the appropriately file on the appropriately folder name.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
