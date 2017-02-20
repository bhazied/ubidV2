'use strict';

/**
 * Controller for Region Details
 */

app.controller('RegionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$regionsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $regionsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.settings.regions');
    };

    $scope.add = function() {
        $state.go('app.settings.regionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.settings.regionsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $regionsDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.region = data;
        });
    }

}]);

