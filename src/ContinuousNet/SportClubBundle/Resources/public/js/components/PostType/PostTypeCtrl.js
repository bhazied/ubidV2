'use strict';

/**
 * Controller for Post Type Details
 */

app.controller('PostTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$postTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $postTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.news.posttypes');
    };

    $scope.add = function() {
        $state.go('app.news.posttypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.news.posttypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $postTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.postType = data;
        });
    }

}]);

