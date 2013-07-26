// <%= _.classify(name) %> factory.
angular.module('<%= _.camelize(appConfig.ngModule) %>.services').factory('<%= _.classify(name) %>', function() {

  // Private methods and variables.
  // ...

  // Public API.
  return {
    sayHello : function (name) {
      return 'Hello, ' + name + '. Have a nice day!';
    }
  };
});
