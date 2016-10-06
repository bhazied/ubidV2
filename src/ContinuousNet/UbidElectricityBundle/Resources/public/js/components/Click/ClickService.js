'use strict';

/**
 * Clicks Data Factory
 */
app.factory('$clicksDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'clicks', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'clicks/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'clicks/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'clicks/:id' }
    });
   
}]);
