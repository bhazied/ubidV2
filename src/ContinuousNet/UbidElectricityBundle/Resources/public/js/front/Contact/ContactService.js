'use strict';
app.factory('$contactDataFactory',  ['$resource', '$rootScope',
    function($resource, $rootScope) {
        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion;
        return $resource(url, {locale: '@locale'}, {
            contact: { method: 'POST', url: '/:locale' + url + 'contact', isArray: false},
        });
    }]);