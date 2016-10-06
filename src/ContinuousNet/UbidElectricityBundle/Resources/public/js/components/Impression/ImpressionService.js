'use strict';

/**
 * Impressions Data Factory
 */
app.factory('$impressionsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'impressions', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'impressions/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'impressions/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'impressions/:id' }
    });
   
}]);
