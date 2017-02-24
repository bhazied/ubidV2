'use strict';

/**
 * Controller for Banner Type Details
 */

app.controller('BannerTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$bannerTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $bannerTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.adserving.bannertypes');
    };

    $scope.add = function() {
        $state.go('app.adserving.bannertypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.adserving.bannertypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $bannerTypesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.bannerType = data;
        });
    }

}]);

