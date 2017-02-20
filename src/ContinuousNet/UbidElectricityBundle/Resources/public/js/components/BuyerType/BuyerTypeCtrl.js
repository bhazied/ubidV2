'use strict';

/**
 * Controller for Buyer Type Details
 */

app.controller('BuyerTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$buyerTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $buyerTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.lists.buyertypes');
    };

    $scope.add = function() {
        $state.go('app.lists.buyertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.lists.buyertypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $buyerTypesDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.buyerType = data;
        });
    }

}]);

