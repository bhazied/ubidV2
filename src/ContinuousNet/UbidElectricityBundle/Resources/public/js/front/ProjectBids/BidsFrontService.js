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
            //tender: { method: 'GET', url: '/:locale' + url + 'tenders/:page/:pageCount/:sortField/:sortDirection', isArray: false},
            bidsByProject : { methof: 'GET', url:'/:locale' + url +  'bidsbyproject/:projectId/:page/:pageCount/:sortField/:sortDirection', isArray: false},
            bookmarkBid: {method: 'GET', url:'/:locale' + url +  'bookmarkBid/:id', isArray: false},
            bidsShorListed: {method: 'GET', url:'/:locale' + url +  'bidsShorListed/', isArray: false}
        });

    }]);
