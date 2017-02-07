'use strict';

/**
 * Suppliers Data Factory
 */
app.factory('$suppliersFrontDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {

        var url = $rootScope.app.apiURL + $rootScope.app.apiVersion;
        var supplierProductUrl = $rootScope.app.apiURL + 'supplierproducts';
        console.log(url);
        return $resource(url, {
            locale: '@locale',
            id: '@id',
            page: '@page',
            pageCount: '@pageCount',
            sortField: '@sortField',
            sortDirection: '@sortDirection'
        }, {
            list : { method: 'GET', url: '/:locale' + url + 'suppliers/:page/:pageCount/:sortField/:sortDirection', isArray: false},
            supplier : { method: 'GET', url:'/:locale' + url +  'supplierDetails/:id', isArray: false}
        });

    }]);
