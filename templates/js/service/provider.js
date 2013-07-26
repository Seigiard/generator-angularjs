// <%= _.classify(name) %> provider.
angular.module('<%= _.camelize(appConfig.ngModule) %>.services').provider('<%= _.classify(name) %>', function() {

  // Private methods and variables.
  var myName = 'Anonymous';

  // Configuration API.
  this.setName = function (name) {
    myName = name;
  }

  // Instantiating method.
  this.$get = function() {
    return {

      // Say Hello to your user.
      sayHello : function() {
        return 'Hello, ' + myName + '. Have a nice day!';
      }
  }
});
