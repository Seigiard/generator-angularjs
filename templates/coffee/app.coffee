# Services module.
angular.module '<%= _.camelize(appname) %>.services', [ ]

# Controllers module.
angular.module '<%= _.camelize(appname) %>.controllers', [ ]

# Directives module.
angular.module '<%= _.camelize(appname) %>.directives', [ ]

# Filters module.
angular.module '<%= _.camelize(appname) %>.filters', [ ]

# Application module.
angular.module('<%= _.camelize(appname) %>', [
  '<%= _.camelize(appname) %>.services'
  '<%= _.camelize(appname) %>.controllers'
  '<%= _.camelize(appname) %>.directives'
  '<%= _.camelize(appname) %>.filters'<% if (angularModules.restangular) { %>
  'restangular' <% } %>
])

  # Application configuration.
  .config (<% if (angularModules.restangular) { %>RestangularProvider, <% } %>$httpProvider, $routeProvider) ->

    <% if (angularModules.restangular) { %># API base URL.
    RestangularProvider.setBaseUrl '/api/'<% } %>

    # Enable CORS.
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']

    # Application routes.
    $routeProvider

      .when '/',
        controller  : 'MainCtrl',
        templateUrl : '<%= assetsFolders.templatesFolder %>/views/main.html'

      .otherwise
        redirectTo : '/'

  # Application runtime configuration and events.
  .run ($rootScope) ->

    # Show loading message on route change start.
    $rootScope.$on '$routeChangeStart', (event, next, current) ->
      $rootScope.showLoader = true

    # Hide loading message on route change success.
    $rootScope.$on '$routeChangeSuccess', (e, current, previous) ->
      $rootScope.showLoader = false
