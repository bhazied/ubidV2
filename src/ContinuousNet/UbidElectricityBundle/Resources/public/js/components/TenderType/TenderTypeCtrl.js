'use strict';

/**
 * Controller for Tender Type Details
 */

app.controller('TenderTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$tenderTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $tenderTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.lists.tendertypes');
    };

    $scope.add = function() {
        $state.go('app.lists.tendertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.lists.tendertypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $tenderTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.tenderType = data;
        });
    }

}]);

