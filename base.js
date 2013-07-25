'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util');

var GeneratorUtils = module.exports = function GeneratorUtils() {
  yeoman.generators.NamedBase.apply(this, arguments);

  // Load app configuration file.
  this.appConfig = require(process.cwd() + '/config/appConfig.json').app;

  // Determine available pre-processors.
  this.engines = {
    html    : (this.appConfig.engines.jade) ? 'jade' : 'html',
    scripts : (this.appConfig.engines.coffeeScript) ? 'coffee' : 'js',
    styles  : (this.appConfig.engines.compass) ? 'scss' : 'css'
  }

  // Determine paths based on appConfig.
  this.folders = {
    src     : this.appConfig.src + '/',
    scripts : this.appConfig.src + '/' + this.appConfig.assets.scripts + '/',
    styles  : this.appConfig.src + '/' + this.appConfig.assets.styles + '/'
  };
};

util.inherits(GeneratorUtils, yeoman.generators.NamedBase);

// Create a script on a given route.
GeneratorUtils.prototype.createScript = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    '../../templates/' + this.engines.scripts + '/' + src + '.' + this.engines.scripts,
    this.folders.scripts + dest + '.' + this.engines.scripts
  ]);
};

// Add a script to the index.
GeneratorUtils.prototype.addScript = function (scriptName, beforeString) {
  angularUtils.rewriteFile({
    file      : this.folders.src + 'index.' + this.engines.html,
    needle    : (this.engines.html === 'jade') ? '// ' + beforeString : '<!-- ' + beforeString + ' -->',
    splicable : [
      this.engines.html === 'jade' ? 'script(src=\'' + this.appConfig.assets.scripts + '/' + scriptName + '.js\')' : '<script src="' + this.appConfig.assets.scripts + '/' + scriptName + '.js"></script>'
    ]
  });
}
