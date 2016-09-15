'use strict';

/**
 * Tender Types Data Factory
 */
app.factory('$tenderTypesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'tendertypes', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'tendertypes/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'tendertypes/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'tendertypes/:id' }
    });
   
}]);
