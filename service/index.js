'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var base = require('../base');

var ServiceGenerator = module.exports = function ServiceGenerator(args, options, config) {
  base.apply(this, arguments);

  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ServiceGenerator, base);

// Ask for the type of service.
ServiceGenerator.prototype.askForService = function askForService() {
  var cb = this.async();

  // Prompts list.
  var prompts = [
    {
      type    : 'list',
      name    : 'service',
      message : 'What type of service did you want to create?',
      choices : [ 'service', 'factory', 'provider', 'constant', 'value' ]
    }
  ];

  // Launch prompts.
  this.prompt(prompts, function (props) {
    this.serviceType = props.service;
    cb();
  }.bind(this));
};

// Create Service file.
ServiceGenerator.prototype.files = function files() {
  this.createScript('service/' + this.serviceType, 'services/' + this.name + this._.classify(this.serviceType));
  this.addScript('services/' + this.name + this._.classify(this.serviceType), 'Controllers.');
};
