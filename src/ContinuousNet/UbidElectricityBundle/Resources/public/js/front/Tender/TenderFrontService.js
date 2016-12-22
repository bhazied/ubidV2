'use strict';

/**
 * Tenders Data Factory
 */
app.factory('$tendersFrontDataFactory', ['$resource', '$rootScope',
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
        buyers: { method: 'GET', url: '/:locale' + url + 'tenders/:page/:pageCount/:sortField/:sortDirection', isArray: false},
        buyer : { methof: 'GET', url:'/:locale' + url +  'tenders/:id', isArray: false},
        categoriesTenders: { method: 'GET', url: '/:locale' + url + 'categoriesTenders', isArray: false},
        getTender : { methof: 'GET', url:'/:locale' + url +  'homeTender/:id', isArray: false}
    });
   
}]);
