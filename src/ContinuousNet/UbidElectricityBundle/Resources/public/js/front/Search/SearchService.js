'use strict';

/**
 * advanced search  Data Factory
 */
app.factory('$advancedSearchDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {
        var url = $rootScope.app.apiURL;
        return $resource(url, {}, {
            getResults: { method: 'POST', url: url + 'sr' , isArray: false},
            getMaxEstimatedCost : {method: 'GET', url: url + 'maxCost', isArray: false}
        });

    }]);
