'use strict';

/**
 * Controller for Bidding Type Details
 */

app.controller('BiddingTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$biddingTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $biddingTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.tenders.biddingtypes');
    };

    $scope.add = function() {
        $state.go('app.tenders.biddingtypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.tenders.biddingtypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $biddingTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.biddingType = data;
        });
    }

}]);

