'use strict';

/**
 * advanced search  Data Factory
 */
app.factory('$advancedSearchDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {
        var url = $rootScope.app.apiURL ;
        var urlGen = '/en' + url ;
        return $resource(url, {
            locale: '@locale'
        }, {
            getResults: { method: 'POST', url: '/:locale' + url + 'sr' , isArray: false},
            genericSearch: {method: 'POST', url: urlGen + 'genericSearch', isArray : false }
        });

    }]);
