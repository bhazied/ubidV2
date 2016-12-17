'use strict';

/**
 * Controller for Prize Winner Details
 */

app.controller('PrizeWinnerCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$prizeWinnersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $prizeWinnersDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.events.prizewinners');
    };

    $scope.add = function() {
        $state.go('app.events.prizewinnersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.prizewinnersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $prizeWinnersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.prizeWinner = data;
        });
    }

}]);

