'use strict';

/**
 * Tender Categories Data Factory
 */
app.factory('$tenderCategoriesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'tendercategories', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'tendercategories/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'tendercategories/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'tendercategories/:id' }
    });
   
}]);
