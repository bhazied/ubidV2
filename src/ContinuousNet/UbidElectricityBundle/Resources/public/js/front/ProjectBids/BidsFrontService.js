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
            projectId: '@projectId'
            //page: '@page',
            //pageCount: '@pageCount',
            //sortField: '@sortField',
            //sortDirection: '@sortDirection'
        }, {
            //tender: { method: 'GET', url: '/:locale' + url + 'tenders/:page/:pageCount/:sortField/:sortDirection', isArray: false},
            bids : { methof: 'GET', url:'/:locale' + url +  'bids/:projectId', isArray: false},
            bookmark: {method: 'GET', url:'/:locale' + url +  'bookmark/:id', isArray: false},
        });

    }]);
