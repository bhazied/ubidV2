'use strict';

/**
 * Post Categories Data Factory
 */
app.factory('$postCategoriesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'postcategories', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'postcategories/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'postcategories/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'postcategories/:id' }
    });
   
}]);
