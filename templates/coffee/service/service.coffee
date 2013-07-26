# <%= _.classify(name) %> service.
angular.module('<%= _.camelize(appConfig.ngModule) %>.services').service '<%= _.classify(name) %>', ->

  # Write your service here.
