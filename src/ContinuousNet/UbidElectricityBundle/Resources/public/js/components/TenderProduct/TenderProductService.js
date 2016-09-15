'use strict';

/**
 * Tender Products Data Factory
 */
app.factory('$tenderProductsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'tenderproducts', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'tenderproducts/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'tenderproducts/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'tenderproducts/:id' }
    });
   
}]);
