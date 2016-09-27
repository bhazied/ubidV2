'use strict';

/**
 * Bid Products Data Factory
 */
app.factory('$bidProductsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'bidproducts', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'bidproducts/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'bidproducts/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'bidproducts/:id' }
    });
   
}]);
