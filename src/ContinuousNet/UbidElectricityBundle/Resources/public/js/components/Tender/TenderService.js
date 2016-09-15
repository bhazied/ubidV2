'use strict';

/**
 * Tenders Data Factory
 */
app.factory('$tendersDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'tenders', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'tenders/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'tenders/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'tenders/:id' }
    });
   
}]);
