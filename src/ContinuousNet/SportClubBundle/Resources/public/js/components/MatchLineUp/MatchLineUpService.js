'use strict';

/**
 * Match Line Ups Data Factory
 */
app.factory('$matchLineUpsDataFactory', ['$resource', '$rootScope', '$localStorage', 
function($resource, $rootScope, $localStorage) {

   var baseURL = '/' + $localStorage.language + $rootScope.app.apiURL + 'matchlineups';
   return $resource(baseURL, {id: '@id'}, {
        create: { method: 'POST', isArray: true},
        query: { method: 'GET'},
        get: { method: 'GET', url: baseURL + '/:id' },
        remove: { method: 'DELETE', url: baseURL + '/:id' },
        update: { method: 'PUT', url: baseURL + '/:id' }
    });
   
}]);
