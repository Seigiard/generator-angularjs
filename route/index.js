'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var base = require('../base');

var RouteGenerator = module.exports = function RouteGenerator(args, options, config) {
  base.apply(this, arguments);

  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  // Call sub-generators in order to create the controller and the view.
  this.hookFor('angularjs:controller');
  this.hookFor('angularjs:view');
};

util.inherits(RouteGenerator, base);

RouteGenerator.prototype.files = function files() {
  this.addRoute(this.name);
};
