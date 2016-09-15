'use strict';

/**
 * Notifications Data Factory
 */
app.factory('$notificationsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'notifications', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'notifications/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'notifications/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'notifications/:id' }
    });
   
}]);
