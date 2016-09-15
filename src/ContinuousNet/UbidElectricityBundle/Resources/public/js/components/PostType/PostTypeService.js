'use strict';

/**
 * Post Types Data Factory
 */
app.factory('$postTypesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'posttypes', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'posttypes/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'posttypes/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'posttypes/:id' }
    });
   
}]);
