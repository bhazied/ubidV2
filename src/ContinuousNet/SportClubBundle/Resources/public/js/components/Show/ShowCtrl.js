'use strict';

/**
 * Controller for Show Details
 */

app.controller('ShowCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$showsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $showsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.webtv.shows');
    };

    $scope.add = function() {
        $state.go('app.webtv.showsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webtv.showsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $showsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.show = data;
        });
    }

}]);

