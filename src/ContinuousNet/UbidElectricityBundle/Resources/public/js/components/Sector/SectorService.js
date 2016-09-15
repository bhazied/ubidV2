'use strict';

/**
 * Sectors Data Factory
 */
app.factory('$sectorsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'sectors', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'sectors/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'sectors/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'sectors/:id' }
    });
   
}]);
