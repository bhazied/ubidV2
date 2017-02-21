'use strict';

/**
 * Controller for Product Type Details
 */

app.controller('ProductTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$productTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $productTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.lists.producttypes');
    };

    $scope.add = function() {
        $state.go('app.lists.producttypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.lists.producttypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $productTypesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.productType = data;
        });
    }

}]);

