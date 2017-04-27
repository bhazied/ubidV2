'use strict';

/**
 * Categories Data Factory
 */
app.factory('$categoriesFrontDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {

        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion;
        return $resource(url, {
            locale: '@locale'
        }, {
            category: { method: 'GET', url:'/:locale' + url +  'publicCategory/:slug/:target', isArray: false}
        });

    }]);
