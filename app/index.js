'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AngularjsGenerator = module.exports = function AngularjsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // Launch yeoman greet.
  console.log(this.yeoman);

  // Get app name or set a default name.
  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularjsGenerator, yeoman.generators.Base);

// Ask for project folders.
AngularjsGenerator.prototype.askForProjectFolders = function askForProjectFolders() {
  var cb = this.async();

  // Prompts list.
  var prompts = [
    {
      name    : 'devFolder',
      message : 'What would be your folder for temporary files while development?',
      default : '.dev'
    },
    {
      name    : 'distFolder',
      message : 'What would be your folder for production build?',
      default : 'dist'
    },
    {
      name    : 'srcFolder',
      message : 'What would be your source files folder?',
      default : 'app'
    },
    {
      name    : 'testFolder',
      message : 'What would be your folder for test files?',
      default : 'test'
    }
  ];

  // Instructions.
  console.log('\n1- Tell me about your project base directories...\n');

  // Launch prompts.
  this.prompt(prompts, function (props) {

    // Store project folders on "this" scope.
    this.projectFolders = {};

    for (var f in props) {
      this.projectFolders[f] = props[f];
    }

    cb();
  }.bind(this));
};

// Ask for assets folders.
AngularjsGenerator.prototype.askForAssetsFolders = function askForAssetsFolders() {
  var cb = this.async();

  // Prompts list.
  var prompts = [
    {
      name    : 'bowerFolder',
      message : 'Where do I need to download Bower dependencies?',
      default : 'lib'
    },
    {
      name    : 'fontsFolder',
      message : 'What would be your fonts folder?',
      default : 'fonts'
    },
    {
      name    : 'imagesFolder',
      message : 'What would be your images folder?',
      default : 'images'
    },
    {
      name    : 'scriptsFolder',
      message : 'What would be your scripts (CoffeeScript and/or JavaScript) folder?',
      default : 'scripts'
    },
    {
      name    : 'stylesFolder',
      message : 'What would be your styles folder?',
      default : 'styles'
    },
    {
      name    : 'templatesFolder',
      message : 'What would be your folder for AngularJS templates?',
      default : 'templates'
    }
  ];

  // Instructions.
  console.log('\n\n2- Now, let\'s populate your app source folder with some sub folders for assets...\n');

  // Launch prompts.
  this.prompt(prompts, function (props) {

    // Store project folders on "this" scope.
    this.assetsFolders = {};

    for (var f in props) {
      this.assetsFolders[f] = props[f];
    }

    cb();
  }.bind(this));
};

// Ask for Angular modules.
AngularjsGenerator.prototype.askForAngularModules = function askForAngularModules() {
  var cb = this.async();

  // Prompts list.
  var prompts = [
    {
      type    : 'confirm',
      name    : 'resource',
      message : 'Would you like to include angular-resource.js?',
      default : true
    },
    {
      type    : 'confirm',
      name    : 'restangular',
      message : 'If so, would you like to use Restangular to handle your REST requests?',
      default : true,
      when    : function (props) {
        return props.resource;
      }
    }
  ];

  // Instructions.
  console.log('\n\n3- Let\'s figure out which AngularJS modules did you like to include...\n');

  // Launch prompts.
  this.prompt(prompts, function (props) {

    // Store angular modules on "this" scope.
    this.angularModules = {};

    for (var f in props) {
      this.angularModules[f] = props[f];
    }

    cb();
  }.bind(this));
};

// Ask for pre-processors.
AngularjsGenerator.prototype.askForPreprocessors = function askForPreprocessors() {
  var cb = this.async();

  // Prompts list.
  var prompts = [
    {
      type    : 'confirm',
      name    : 'coffeeScript',
      message : 'Would you like to use CoffeeScript in your project?',
      default : true
    },
    {
      type    : 'confirm',
      name    : 'compass',
      message : 'Would you like to style your project with Compass?',
      default : true
    },
    {
      type    : 'confirm',
      name    : 'jade',
      message : 'Would you like to pre-process your HTML with Jade?',
      default : false
    }
  ];

  // Instructions.
  console.log('\n\n4- Finally, let\'s talk in pre-processors terms...\n');

  // Launch prompts.
  this.prompt(prompts, function (props) {

    // Store engines on "this" scope.
    this.engines = {};

    for (var f in props) {
      this.engines[f] = props[f];
    }

    cb();
  }.bind(this));
};

// Scaffold project files and folders.
AngularjsGenerator.prototype.app = function app() {

  // Create base folders.
  for (var f in this.projectFolders) {
    this.mkdir(this.projectFolders[f]);
  };

  // Configuration files.
  this.mkdir('config');
  this.template('common/config/appConfig.json', 'config/appConfig.json');
  this.copy('common/config/jshintrc', 'config/.jshintrc');

  // Create assets folders.
  for (var f in this.assetsFolders) {
    this.mkdir(this.projectFolders.srcFolder + '/' + this.assetsFolders[f]);
  };

  // Project description files.
  this.copy('common/editorconfig', '.editorconfig');
  this.copy('common/gitattributes', '.gitattributes');
  this.copy('common/travis.yml', '.travis.yml');
  this.template('common/gitignore', '.gitignore');
  this.template('common/README.md', 'README.md');

  // Package files.
  this.template('common/_package.json', 'package.json');
  this.template('common/_bower.json', 'bower.json');
  this.template('common/bowerrc', '.bowerrc');
  this.template('common/Gruntfile.js', 'Gruntfile.js');

  // App files.
  var views = this.engines.jade ? 'jade' : 'html';
  var scripts = this.engines.coffeeScript ? 'coffee' : 'js';
  var styles = this.engines.compass ? 'scss' : 'css';

  // index.{jade, html} file.
  this.template(views + '/index.' + views, this.projectFolders.srcFolder + '/index.' + views);

  // app.{coffee, js} file.
  this.template(scripts + '/app.' + scripts, this.projectFolders.srcFolder + '/' + this.assetsFolders.scriptsFolder + '/app.' + scripts);

  // templates.{coffee, js} file.
  this.template(scripts + '/templates.' + scripts, this.projectFolders.srcFolder + '/' + this.assetsFolders.scriptsFolder + '/templates.' + scripts);

  // screen.{scss, css} file.
  this.template(styles + '/screen.' + styles, this.projectFolders.srcFolder + '/' + this.assetsFolders.stylesFolder + '/screen.' + styles);

  this.copy('common/favicon.ico', this.projectFolders.srcFolder + '/favicon.ico');
};
