// <%= _.classify(name) %> controller.
angular.module('<%= _.camelize(appConfig.ngModule) %>.controllers').controller('<%= _.classify(name) %>Ctrl', function() {

  // Awesome stuff.
  this.awesome = [
    'Yeoman',
    'Grunt',
    'Bower',
    'AngularJS'
  ];

  // Return controller data.
  return this;
});
