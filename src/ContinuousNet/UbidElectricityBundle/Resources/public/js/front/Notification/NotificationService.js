'use strict';
app.factory('$NotificationFrontDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {

        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion ;
        return $resource(url, {locale: '@locale'}, {
            readAll: { method: 'GET', url: '/:locale' + url + 'readAllNotification'},
        });
    }
]);