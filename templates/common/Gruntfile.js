'use strict'

// Module dependencies.
var livereloadSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var path              = require('path');

// Mount folder to connect.
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

  // Load all Grunt tasks
  require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

  // Grunt configuration.
  // --------------------
  grunt.initConfig({

    // Load folders configuration.
    appConfig: grunt.file.readJSON('./config/appConfig.json'),

    // Clean folders before compile assets.
    clean: {
      dev     : '<%%= appConfig.app.dev %>',
      dist    : '<%%= appConfig.app.dist %>',
      html    : '<%%= appConfig.app.dev %>/**/*.html',
      scripts : '<%%= appConfig.app.dev %>/<%%= appConfig.app.assets.scripts %>',
      styles  : '<%%= appConfig.app.dev %>/<%%= appConfig.app.assets.styles %>',
      test    : '<%%= appConfig.app.dev %>/<%%= appConfig.app.test %>',

      options : {
        force : true
      }
    },

    // <% if (engines.coffeeScript) { %>Compile CoffeeScript.
    coffee: {

      // Compile Coffee for development environment.
      app: {
        expand : true,
        cwd    : '<%%= appConfig.app.src %>/<%%= appConfig.app.assets.scripts %>',
        dest   : '<%%= appConfig.app.dev %>/<%%= appConfig.app.assets.scripts %>',
        src    : '**/*.coffee',
        ext    : '.js'
      },

      // Compile Coffee for tests.
      test: {
        expand : true,
        cwd    : '<%%= appConfig.app.test %>',
        dest   : '<%%= appConfig.app.dev %>/<%%= appConfig.app.test %>',
        src    : '**/*.coffee',
        ext    : '.js'
      }
    },
    <% } %>

    // <% if (engines.compass) { %>Compile Compass.
    compass: {

      // Compile Compass for development environment.
      dev: {
        options: {
          debugInfo      : true,
          cssDir         : '<%%= appConfig.app.dev %>/<%%= appConfig.app.assets.styles %>',
          fontsDir       : '<%%= appConfig.app.src %>/<%%= appConfig.app.assets.fonts %>',
          httpFontsPath  : '../<%%= appConfig.app.assets.fonts %>',
          imagesDir      : '<%%= appConfig.app.src %>/<%%= appConfig.app.assets.images %>',
          httpImagesPath : '../<%%= appConfig.app.assets.images %>',
          importPath     : '<%%= appConfig.app.src %>/<%%= appConfig.app.assets.lib %>',
          javascriptsDir : '<%%= appConfig.app.dev %>/<%%= appConfig.app.assets.scripts %>',
          sassDir        : '<%%= appConfig.app.src %>/<%%= appConfig.app.assets.styles %>'
        }
      }
    },
    <% } %>

    // Start local server.
    connect: {
      dev: {
        options: {
          port       : 3000,
          hostname   : 'localhost',
          middleware : function (connect) {
            return [
              livereloadSnippet,
              mountFolder(connect, grunt.template.process('<%%= appConfig.app.dev %>')),
              mountFolder(connect, grunt.template.process('<%%= appConfig.app.src %>'))
            ]
          }
        }
      },

      dist: {
        options: {
          port       : 3000,
          hostname   : 'localhost',
          middleware : function (connect) {
            return [
              mountFolder(connect, grunt.template.process('<%%= appConfig.app.dist %>'))
            ]
          }
        }
      }
    },

    // Copy files and folders.
    copy: {
      dev: {
        files: [{
          cwd    : '<%%= appConfig.app.src %>',
          dest   : '<%%= appConfig.app.dev %>',
          expand : true,
          src    : [ '**/*' ]
        }]
      },

      dist: {
        files: [{
          cwd    : '<%%= appConfig.app.dev %>',
          dest   : '<%%= appConfig.app.dist %>',
          dot    : true,
          expand : true,
          src    : [
            '**/*',
            '!test/**',
            '!**/lib/**',
            '!**/*.jade',
            '!**/<%%= appConfig.app.assets.templates %>/**',
            '!**/<%%= appConfig.app.assets.scripts %>/**',
            '!**/<%%= appConfig.app.assets.styles %>/**'
          ]
        }]
      }
    },

    // Minify HTML files.
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA   : true,
          collapseWhitespace        : true,
          collapseBooleanAttributes : true,
          removeAttributeQuotes     : true,
          removeRedundantAttributes : true,
          useShortDoctype           : true,
          removeEmptyAttributes     : true,
          removeOptionalTags        : true
        },

        files: [{
          expand : true,
          cwd    : '<%%= appConfig.app.dist %>',
          dest   : '<%%= appConfig.app.dist %>',
          src    : '**/*.html'
        }]
      }
    },

    // <% if (engines.jade) { %>Compile Jade.
    jade: {
      dev: {
        files: {
          '<%%= appConfig.app.dev %>/' : '<%%= appConfig.app.src %>/**/*.jade'
        }
      },
      options: {
        basePath     : '<%%= appConfig.app.src %>',
        client       : false,
        compileDebug : false,
        pretty       : true
      }
    },
    <% } %>

    // Run unit tests.
    karma: {
      unit: {
        configFile : 'config/unit.conf.js'
      },
      continuous: {
        configFile : 'config/unit.conf.js',
        singleRun  : true,
        browsers   : [ 'PhantomJS' ]
      }
    },

    // Generate anotations for angular injections.
    ngmin: {
      dist: {
        cwd    : '<%%= appConfig.app.dist %>/<%%= appConfig.app.assets.scripts %>',
        expand : true,
        src    : [ '**/*.js' ],
        dest   : '<%%= appConfig.app.dist %>/<%%= appConfig.app.assets.scripts %>'
      }
    },

    // Inline AngularJS templates.
    ngtemplates: {
      dist: {
        options: {
          base   : '<%%= appConfig.app.dev %>',
          module : '<%%= appConfig.app.ngModule %>'
        },
        src  : '<%%= appConfig.app.dev %>/<%%= appConfig.app.assets.templates %>/**/*.html',
        dest : '<%%= appConfig.app.dev %>/<%%= appConfig.app.assets.scripts %>/templates.js'
      }
    },

    // Open a web server with a given URL.
    open: {
      server: {
        path: 'http://localhost:3000'
      }
    },

    // Watch for changes in assets and compile.
    watch: {
      app: {
        files   : '{<%%= appConfig.app.dev %>,<%%= appConfig.app.src %>}/**/*.{css,html,js,jpg,jpeg,png}',
        options : {
          livereload : true
        }
      },<% if (engines.coffeeScript) { %>
      coffee: {
        files   : '<%%= appConfig.app.src %>/<%%= appConfig.app.assets.scripts %>/**/*.coffee',
        tasks   : 'compile:coffee',
        options : {
          livereload : true
        }
      },<% } if (engines.compass) { %>
      compass: {
        files   : '<%%= appConfig.app.src %>/<%%= appConfig.app.assets.styles %>/**/*.{sass,scss}',
        tasks   : 'compile:compass',
        options : {
          livereload : true
        }
      },<% } if (engines.jade) { %>
      jade: {
        files   : '<%%= appConfig.app.src %>/**/*.jade',
        tasks   : 'compile:jade',
        options : {
          livereload : true
        }
      },<% } %>
      karma: {
        files   : '{<%%= appConfig.app.dev %>/test,<%%= appConfig.app.test %>}/**/*.js',
        tasks   : 'karma:continuous'
      },
      test: {
        files : '<%%= appConfig.app.test %>/**/*.coffee',
        tasks : 'compile:coffeeTest'
      }
    },


    // Use minified assets on HTML files depending on environment.
    usemin: {
      html : [ '<%%= appConfig.app.dist %>/**/*.html' ]
    },

    // Prepare usemin to compile assets in the specified order.
    useminPrepare: {
      html    : '<%%= appConfig.app.dev %>/**/*.html',
      options : {
        dest : '<%%= appConfig.app.dist %>'
      }
    }
  });

  // Custom tasks.
  // -------------

  <% if (engines.coffeeScript || engines.compass || engines.jade) { %>// Compile assets.
  grunt.registerTask('compile', function (task) {

    if (task === undefined) {
      grunt.log.ok('Running all compilers.');

      return grunt.task.run([<% if (engines.coffeeScript) { %>
        'compile:coffee',
        'compile:coffeeTest',<% } if (engines.compass) { %>
        'compile:compass',<% } if (engines.jade) { %>
        'compile:jade'<% } %>
      ]);
    };

    var cleaner;

    switch (task) {<% if (engines.coffeeScript) { %>
      case 'coffee':
        cleaner = 'clean:scripts'
        task    = 'coffee:app'
        break;
      case 'coffeeTest':
        cleaner = 'clean:test'
        task    = 'coffee:test'
        break;<% } if (engines.compass) { %>
      case 'compass':
        cleaner = 'clean:styles'<% } if (engines.jade) { %>
      case 'jade':
        cleaner = 'clean:html'
        break;<% } %>
    }

    grunt.task.run([
      cleaner,
      task
    ]);
  });<% } %>

  // Compress, concatenate, generate documentation and run unit tests.
  grunt.registerTask('build', function () {

    // Run all builder tasks.
    grunt.task.run([
      'clean:dist',<% if (engines.coffeeScript || engines.compass || engines.jade) { %>
      'compile',<% } %>
      'copy:dev',
      'copy:dist',
      'ngtemplates',
      'useminPrepare',
      'concat',
      'cssmin',
      'ngmin',
      'uglify',
      'usemin',
      'htmlmin',
      'clean:dev'
    ]);

    // Passing the flag --preview, after the build a server will be started to
    // preview your build.
    if (grunt.option('preview')) {
      grunt.task.run([ 'open', 'connect:dist:keepalive' ]);
    };
  });

  // Start local server and watch for changes in files.
  grunt.registerTask('dev', [<% if (engines.coffeeScript || engines.compass || engines.jade) { %>
    'compile',<% } %>
    'connect:dev',
    'open',
    'watch'
  ]);

  // Alias build task as Grunt default task.
  grunt.registerTask('default', [
    'build'
  ]);
};
