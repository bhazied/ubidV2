'use strict';

/**
 * Controller for Video Type Details
 */

app.controller('VideoTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$videoTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $videoTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.webtv.videotypes');
    };

    $scope.add = function() {
        $state.go('app.webtv.videotypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webtv.videotypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $videoTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.videoType = data;
        });
    }

}]);

