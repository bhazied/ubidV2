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
        sortDirection: '@sortDirection',
        section: '@section'
    }, {
        //buyers: { method: 'GET', url: '/:locale' + url + 'tenders/:page/:pageCount/:sortField/:sortDirection', isArray: false},
        //buyer : { methof: 'GET', url:'/:locale' + url +  'tenders/:id', isArray: false},
        homeTenders: {method: 'GET', url:'/:locale' + url +  'homeTenders/:section/:page/:pageCount/:sortField/:sortDirection', isArray: false},
        categoriesTenders: { method: 'GET', url: '/:locale' + url + 'categoriesTenders', isArray: false},
        getTender : { method: 'GET', url:'/:locale' + url +  'homeTender/:id', isArray: false},
        bookmarkTender: { method: 'GET', url:'/:locale' + url +  'bookmarkTender/:id', isArray: false},
        category: { method: 'GET', url:'/:locale' + url +  'publicCategory/:slug', isArray: false},
        checkBid : {method: 'GET', url: '/:locale'+ url + 'checkbid/:user/:tender', isArray: false}
    });
   
}]);
