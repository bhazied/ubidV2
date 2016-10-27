'use strict';

/**
 * Tenders Data Factory
 */
app.factory('$tendersFrontDataFactory', ['$resource', '$rootScope',
function($resource, $rootScope) {

    var url = $rootScope.app.apiURL + $rootScope.app.apiVersion;
    return $resource(url, {locale: '@locale'}, {
        categoriesTenders: { method: 'GET', url: '/:locale' + url + 'categoriesTenders', isArray: false},
    });
   
}]);
