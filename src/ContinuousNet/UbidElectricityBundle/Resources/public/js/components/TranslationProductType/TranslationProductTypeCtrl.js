'use strict';

/**
 * Controller for Translation Product Type Details
 */

app.controller('TranslationProductTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationProductTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationProductTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationproducttypes');
    };

    $scope.add = function() {
        $state.go('app.translation.translationproducttypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationproducttypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationProductTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationProductType = data;
        });
    }

}]);

