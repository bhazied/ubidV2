'use strict';

/**
 * Controller for Stadium Details
 */

app.controller('StadiumCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$stadiaDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $stadiaDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.events.stadia');
    };

    $scope.add = function() {
        $state.go('app.events.stadianew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.stadiaedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $stadiaDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.stadium = data;
        });
    }

}]);

