'use strict';

/**
 * advanced search  Data Factory
 */
app.factory('$advancedSearchDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {
        var url = $rootScope.app.apiURL ;
        return $resource(url, {
            locale: '@locale'
        }, {
            getResults: { method: 'POST', url: '/:locale' + url + 'sr' , isArray: false},
            genericSearch: {method: 'POST', url: +'/:locale'+ url + 'genericSearch', isArray : false }
        });

    }]);
