'use strict';

/**
 * Dashboard Data Factory
 */
app.factory('$dashboardDataFactory', ['$resource', '$rootScope', '$localStorage',
    function($resource, $rootScope, $localStorage) {

        var baseURL = '/' + $localStorage.language + $rootScope.app.apiURL + 'dashboard';
        return $resource(baseURL, {}, {
            data: { method: 'GET', url: baseURL + '/data' }
        });

    }]);
