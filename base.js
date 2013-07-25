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
    scripts : (this.appConfig.engines.coffeeScript) ? 'coffee' : 'js',
    styles  : (this.appConfig.engines.compass) ? 'scss' : 'css',
    views   : (this.appConfig.engines.jade) ? 'jade' : 'html'
  }

  // Determine paths based on appConfig.
  this.folders = {
    src       : this.appConfig.src + '/',
    scripts   : this.appConfig.src + '/' + this.appConfig.assets.scripts + '/',
    styles    : this.appConfig.src + '/' + this.appConfig.assets.styles + '/',
    templates : this.appConfig.src + '/' + this.appConfig.assets.templates + '/'
  };
};

util.inherits(GeneratorUtils, yeoman.generators.NamedBase);

// Create a view with a given name.
GeneratorUtils.prototype.createView = function (type, name) {
  yeoman.generators.Base.prototype.template.apply(this, [
    '../../templates/' + this.engines.views + '/' + type + '.' + this.engines.views,
    this.folders.templates + type + 's/' + name + '.' + this.engines.views
  ]);
};

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
    file      : this.folders.src + 'index.' + this.engines.views,
    needle    : (this.engines.views === 'jade') ? '// ' + beforeString : '<!-- ' + beforeString + ' -->',
    splicable : [
      this.engines.views === 'jade' ? 'script(src=\'' + this.appConfig.assets.scripts + '/' + scriptName + '.js\')' : '<script src="' + this.appConfig.assets.scripts + '/' + scriptName + '.js"></script>'
    ]
  });
}

// Add a route to app.{coffee, js}.
GeneratorUtils.prototype.addRoute = function (name) {
  var splicable;
  var route = (name === 'main') ? '' : name;

  if (this.engines.scripts === 'coffee') {
    splicable = [
      '.when \'/' + route + '\',',
      '  controller  : \'' + this._.classify(name) + 'Ctrl as ' + name + '\'',
      '  templateUrl : \'' + this.appConfig.assets.templates + '/views/' + name + '.html\'',
      ''
    ];
  }
  else {
    splicable = [
      '.when(\'/' + route + '\', {',
      '  controller  : \'' + this._.classify(name) + 'Ctrl as ' + name + '\',',
      '  templateUrl : \'' + this.appConfig.assets.templates + '/views/' + name + '.html\'',
      '})',
      ''
    ];
  };

  angularUtils.rewriteFile({
    file      : this.folders.scripts + 'app.' + this.engines.scripts,
    needle    : '.otherwise',
    splicable : splicable
  })
}
