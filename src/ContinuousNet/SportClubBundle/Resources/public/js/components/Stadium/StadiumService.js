'use strict';

/**
 * Stadia Data Factory
 */
app.factory('$stadiaDataFactory', ['$resource', '$rootScope', '$localStorage', 
function($resource, $rootScope, $localStorage) {

   var baseURL = '/' + $localStorage.language + $rootScope.app.apiURL + 'stadia';
   return $resource(baseURL, {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: baseURL + '/:id' },
        remove: { method: 'DELETE', url: baseURL + '/:id' },
        update: { method: 'PUT', url: baseURL + '/:id' }
    });
   
}]);
