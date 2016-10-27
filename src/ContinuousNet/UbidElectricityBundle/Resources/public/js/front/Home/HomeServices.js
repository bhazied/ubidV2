'use strict';
app.factory('$HomeDataFactory',  ['$resource', '$rootScope',
    function($resource, $rootScope) {
        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion;
        return $resource(url, {locale: '@locale'}, {
            homeTenders: { method: 'GET', url: '/:locale' + url + 'homeTenders', isArray: false},
            homeSectors: {method: 'GET', url: '/:locale' + url + 'homeSectors', isArray:false},
            categories : {method: 'GET', url:''}
        });
    }]);