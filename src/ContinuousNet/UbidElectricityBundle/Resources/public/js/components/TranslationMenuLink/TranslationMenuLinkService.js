'use strict';

/**
 * Translation Menu Links Data Factory
 */
app.factory('$translationMenuLinksDataFactory', ['$resource', '$rootScope', '$localStorage', 
function($resource, $rootScope, $localStorage) {

   return $resource('/:locale' + $rootScope.app.apiURL + '/:controller', {locale: $localStorage.language, controller: 'translationmenulinks', id: '@id'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: '/:locale' + $rootScope.app.apiURL + '/:controller/:id' },
        remove: { method: 'DELETE', url: '/:locale' + $rootScope.app.apiURL + '/:controller/:id' },
        update: { method: 'PUT', url: '/:locale' + $rootScope.app.apiURL + '/:controller/:id' }
    });
   
}]);
