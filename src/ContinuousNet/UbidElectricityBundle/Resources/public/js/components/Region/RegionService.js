'use strict';

/**
 * Regions Data Factory
 */
app.factory('$regionsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'regions', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'regions/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'regions/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'regions/:id' }
    });
   
}]);
