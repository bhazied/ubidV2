'use strict';

/**
 * Controller for Banner Position Details
 */

app.controller('BannerPositionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$bannerPositionsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $bannerPositionsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.adserving.bannerpositions');
    };

    $scope.add = function() {
        $state.go('app.adserving.bannerpositionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.adserving.bannerpositionsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $bannerPositionsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.bannerPosition = data;
        });
    }

}]);

