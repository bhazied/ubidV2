'use strict';

/**
 * Tenders Data Factory
 */
app.factory('$bidsFrontDataFactory', ['$resource', '$rootScope',
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
            bids: { method: 'GET', url: '/:locale' + url + 'bids/:page/:pageCount/:sortField/:sortDirection', isArray: false},
            bid : { methof: 'GET', url:'/:locale' + url +  'bids/:id', isArray: false},
            bookmark: {method: 'GET', url:'/:locale' + url +  'bookmark/:id', isArray: false},
        });

    }]);
