'use strict';

/**
 * Product Types Data Factory
 */
app.factory('$productTypesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'producttypes', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'producttypes/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'producttypes/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'producttypes/:id' }
    });
   
}]);
