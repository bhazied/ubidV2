'use strict';

/**
 * Buyers Data Factory
 */
app.factory('$buyersFrontDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {

        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion;
        return $resource(url, {
            locale: '@locale',
            id: '@id',
            page: '@page',
            pageCount: '@pageCount',
            sortField: '@sortField',
            sortDirection: '@sortDirection'
        }, {
            list : { method: 'GET', url: '/:locale' + url + 'buyers/:page/:pageCount/:sortField/:sortDirection', isArray: false},
            one : { methof: 'GET', url:'/:locale' + url +  'buyerDetails/:id', isArray: false}
        });

    }]);
