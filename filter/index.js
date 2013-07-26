'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var base = require('../base');

var FilterGenerator = module.exports = function FilterGenerator(args, options, config) {
  base.apply(this, arguments);

  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(FilterGenerator, base);

// Create controller files.
FilterGenerator.prototype.files = function files() {
  this.createScript('filter', 'filters/' + this.name);
  this.addScript('filters/' + this.name, 'endbuild');
};
