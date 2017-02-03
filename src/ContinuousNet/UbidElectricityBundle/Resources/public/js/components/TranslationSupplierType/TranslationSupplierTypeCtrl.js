'use strict';

/**
 * Controller for Translation Supplier Type Details
 */

app.controller('TranslationSupplierTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationSupplierTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationSupplierTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationsuppliertypes');
    };

    $scope.add = function() {
        $state.go('app.translation.translationsuppliertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationsuppliertypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationSupplierTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationSupplierType = data;
        });
    }

}]);

