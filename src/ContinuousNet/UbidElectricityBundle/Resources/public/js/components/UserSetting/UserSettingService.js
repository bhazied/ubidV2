'use strict';

/**
 * User Settings Data Factory
 */
app.factory('$userSettingsDataFactory', ['$resource', '$rootScope', 
function($resource, $rootScope) {

   return $resource($rootScope.app.apiURL + 'usersettings', {id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: $rootScope.app.apiURL + 'usersettings/:id' },
        remove: { method: 'DELETE', url: $rootScope.app.apiURL + 'usersettings/:id' },
        update: { method: 'PUT', url: $rootScope.app.apiURL + 'usersettings/:id' }
    });
   
}]);
