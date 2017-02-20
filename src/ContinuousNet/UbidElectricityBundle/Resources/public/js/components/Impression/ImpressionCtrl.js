'use strict';

/**
 * Controller for Impression Details
 */

app.controller('ImpressionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$impressionsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $impressionsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.adserving.impressions');
    };

    $scope.add = function() {
        $state.go('app.adserving.impressionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.adserving.impressionsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $impressionsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.impression = data;
        });
    }

}]);

