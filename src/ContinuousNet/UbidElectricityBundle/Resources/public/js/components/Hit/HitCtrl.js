'use strict';

/**
 * Controller for Hit Details
 */

app.controller('HitCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$hitsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $hitsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.statistics.hits');
    };

    $scope.add = function() {
        $state.go('app.statistics.hitsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.statistics.hitsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $hitsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.hit = data;
        });
    }

}]);

