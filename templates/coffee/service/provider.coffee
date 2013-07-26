# <%= _.classify(name) %> provider.
angular.module('<%= _.camelize(appConfig.ngModule) %>.services').provider '<%= _.classify(name) %>', ->

  # Private methods and variables.
  myName = 'Anonymous'

  # Configuration API.
  @setName = (name) ->
    myName = name

  # Instantiating method.
  @$get = ->

    # Say Hello to your user.
    @sayHello = ->
      "Hello, #{myName}. Have a nice day!"

    # Return public API.
    return @

  # Return API.
  return @
