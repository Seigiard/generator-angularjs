// <%= _.camelize(name) %> filter.
// Your filter description here.

angular.module('<%= _.camelize(appConfig.ngModule) %>.filters').filter('<%= _.camelize(name) %>', function() {
  function (input) {

    // Return filtered input.
    return 'I was filtered by <%= _.camelize(name) %>.'
  };
});
