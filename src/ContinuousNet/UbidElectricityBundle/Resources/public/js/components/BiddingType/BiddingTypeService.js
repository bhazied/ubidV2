'use strict';

/**
 * Bidding Types Data Factory
 */
app.factory('$biddingTypesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'biddingtypes', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'biddingtypes/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'biddingtypes/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'biddingtypes/:id' }
    });
   
}]);
