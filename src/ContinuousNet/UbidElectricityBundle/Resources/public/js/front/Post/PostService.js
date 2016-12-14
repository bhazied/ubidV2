'use strict';

/**
 * Posts Data Factory
 */
app.factory('$postsDataFactory', ['$resource', '$rootScope', '$localStorage', 
function($resource, $rootScope, $localStorage) {

   var baseURL = '/' + $localStorage.language + $rootScope.app.apiURL + 'posts';
   return $resource(baseURL, {id: '@id', slug: '@slug'}, {
        create: { method: 'POST', isArray: false},
        query: { method: 'GET'},
        get: { method: 'GET', url: baseURL + '/:id' },
        getBySlug: { method: 'GET', url: baseURL + '/getBySlug/:slug' },
        remove: { method: 'DELETE', url: baseURL + '/:id' },
        update: { method: 'PUT', url: baseURL + '/:id' }
    });
   
}]);
