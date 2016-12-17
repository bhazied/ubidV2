'use strict';

/**
 * Controller for Scorer Details
 */

app.controller('ScorerCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$scorersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $scorersDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.events.scorers');
    };

    $scope.add = function() {
        $state.go('app.events.scorersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.scorersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $scorersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.scorer = data;
        });
    }

}]);

