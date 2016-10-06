'use strict';

/**
 * Buyers Data Factory
 */
app.factory('$buyersDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'buyers', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'buyers/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'buyers/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'buyers/:id' }
    });
   
}]);
