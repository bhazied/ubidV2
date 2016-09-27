'use strict';

/**
 * Bids Data Factory
 */
app.factory('$bidsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'bids', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'bids/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'bids/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'bids/:id' }
    });
   
}]);
