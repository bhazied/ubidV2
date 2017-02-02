'use strict';
app.factory('$userMenuDataFactory', ['$resource', '$rootScope', '$rootScope', '$localStorage',
    function($resource, $rootScope, $localStorage) {

        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion ;
        return $resource(url, {locale: '@locale'}, {
            getUserMenu: { method: 'GET', url: '/:locale' + url + 'getUserMenu'}
        });
    }
]);