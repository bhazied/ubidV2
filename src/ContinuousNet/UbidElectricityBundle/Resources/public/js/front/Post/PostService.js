'use strict';

/**
 * Posts Data Factory
 */
app.factory('$postsDataFactory', ['$resource', '$rootScope', '$localStorage', 
function($resource, $rootScope, $localStorage) {

    var url = $rootScope.app.apiURL + $rootScope.app.apiVersion ;
    return $resource(url, {locale: '@locale', slug: '@slug'}, {
        getBySlug: { method: 'GET', url: '/:locale' + url + 'getPostBySlug/:slug'}
    });
   
}]);
