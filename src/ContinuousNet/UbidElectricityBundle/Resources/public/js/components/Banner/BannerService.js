'use strict';

/**
 * Banners Data Factory
 */
app.factory('$bannersDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'banners', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'banners/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'banners/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'banners/:id' }
    });
   
}]);
