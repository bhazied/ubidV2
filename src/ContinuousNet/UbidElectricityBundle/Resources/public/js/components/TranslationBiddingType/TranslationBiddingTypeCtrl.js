'use strict';

/**
 * Controller for Translation Bidding Type Details
 */

app.controller('TranslationBiddingTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationBiddingTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationBiddingTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationbiddingtypes');
    };

    $scope.add = function() {
        $state.go('app.translation.translationbiddingtypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationbiddingtypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationBiddingTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationBiddingType = data;
        });
    }

}]);

