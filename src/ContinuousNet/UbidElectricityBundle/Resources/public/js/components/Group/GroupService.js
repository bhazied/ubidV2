'use strict';

/**
 * Groups Data Factory
 */
app.factory('$groupsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'groups', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'groups/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'groups/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'groups/:id' }
    });
   
}]);
