'use strict';

/**
 * Controller for Translation Buyer Type Details
 */

app.controller('TranslationBuyerTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationBuyerTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationBuyerTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationbuyertypes');
    };

    $scope.add = function() {
        $state.go('app.translation.translationbuyertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationbuyertypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationBuyerTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationBuyerType = data;
        });
    }

}]);

