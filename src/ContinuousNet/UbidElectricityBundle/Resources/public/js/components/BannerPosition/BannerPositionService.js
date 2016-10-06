'use strict';

/**
 * Banner Positions Data Factory
 */
app.factory('$bannerPositionsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'bannerpositions', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'bannerpositions/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'bannerpositions/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'bannerpositions/:id' }
    });
   
}]);
