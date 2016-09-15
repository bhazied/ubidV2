'use strict';

/**
 * Posts Data Factory
 */
app.factory('$postsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'posts', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'posts/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'posts/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'posts/:id' }
    });
   
}]);
