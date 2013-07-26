# <%= _.classify(name) %> factory.
angular.module('<%= _.camelize(appConfig.ngModule) %>.services').factory '<%= _.classify(name) %>', ->

  # Private methods and variables.
  # ...

  # Public API.
  sayHello : (name) ->
    "Hello, #{name}. Have a nice day!"
