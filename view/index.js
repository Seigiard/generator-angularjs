'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var base = require('../base');

var ViewGenerator = module.exports = function ViewGenerator(args, options, config) {
  base.apply(this, arguments);

  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ViewGenerator, base);

// Create view file.
ViewGenerator.prototype.files = function files() {
  this.createView('view', this.name);
};
