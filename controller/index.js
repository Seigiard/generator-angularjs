'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var base = require('../base');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  base.apply(this, arguments);

  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ControllerGenerator, base);

// Create controller files.
ControllerGenerator.prototype.files = function files() {
  this.createScript('controller', 'controllers/' + this.name);
  this.addScript('controllers/' + this.name, 'Directives.');
};
