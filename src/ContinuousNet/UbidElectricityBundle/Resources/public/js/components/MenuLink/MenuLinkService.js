'use strict';

/**
 * Menu Links Data Factory
 */
app.factory('$menuLinksDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'menulinks', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'menulinks/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'menulinks/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'menulinks/:id' }
    });
   
}]);
