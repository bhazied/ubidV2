'use strict';

/**
 * Menus Data Factory
 */
app.factory('$menusDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'menus', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'menus/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'menus/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'menus/:id' }
    });
   
}]);
