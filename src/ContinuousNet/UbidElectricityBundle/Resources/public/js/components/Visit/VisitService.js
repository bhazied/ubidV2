'use strict';

/**
 * Visits Data Factory
 */
app.factory('$visitsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'visits', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'visits/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'visits/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'visits/:id' }
    });
   
}]);
