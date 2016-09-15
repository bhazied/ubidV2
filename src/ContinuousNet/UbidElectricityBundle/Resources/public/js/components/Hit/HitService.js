'use strict';

/**
 * Hits Data Factory
 */
app.factory('$hitsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'hits', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'hits/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'hits/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'hits/:id' }
    });
   
}]);
