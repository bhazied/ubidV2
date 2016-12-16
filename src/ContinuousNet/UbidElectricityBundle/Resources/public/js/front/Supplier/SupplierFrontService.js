'use strict';

/**
 * Suppliers Data Factory
 */
app.factory('$suppliersFrontDataFactory', ['$resource', '$rootScope',
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
            list : { method: 'GET', url: '/:locale' + url + 'suppliers/:page/:pageCount/:sortField/:sortDirection', isArray: false},
            one : { methof: 'GET', url:'/:locale' + url +  'supplierDetails/:id', isArray: false}
        });

    }]);
