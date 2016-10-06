'use strict';

/**
 * Buyer Types Data Factory
 */
app.factory('$buyerTypesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'buyertypes', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'buyertypes/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'buyertypes/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'buyertypes/:id' }
    });
   
}]);
