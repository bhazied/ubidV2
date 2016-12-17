'use strict';

/**
 * Controller for Rating Details
 */

app.controller('RatingCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$ratingsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $ratingsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.activities.ratings');
    };

    $scope.add = function() {
        $state.go('app.activities.ratingsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.activities.ratingsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $ratingsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.rating = data;
        });
    }

}]);

