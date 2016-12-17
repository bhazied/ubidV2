'use strict';

/**
 * Controller for Like Details
 */

app.controller('LikeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$likesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $likesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.activities.likes');
    };

    $scope.add = function() {
        $state.go('app.activities.likesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.activities.likesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $likesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.like = data;
        });
    }

}]);

