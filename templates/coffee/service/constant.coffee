# <%= _.classify(name) %> constant.
angular.module('<%= _.camelize(appConfig.ngModule) %>.services').constant '<%= _.classify(name) %>', 'Yeoman rulz.'
