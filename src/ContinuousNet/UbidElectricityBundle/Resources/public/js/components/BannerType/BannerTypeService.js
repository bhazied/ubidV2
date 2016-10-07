'use strict';

/**
 * Banner Types Data Factory
 */
app.factory('$bannerTypesDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'bannertypes', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'bannertypes/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'bannertypes/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'bannertypes/:id' }
    });
   
}]);
