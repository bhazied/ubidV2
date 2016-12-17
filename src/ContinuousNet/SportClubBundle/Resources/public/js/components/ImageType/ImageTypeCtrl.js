'use strict';

/**
 * Controller for Image Type Details
 */

app.controller('ImageTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$imageTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $imageTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.photos.imagetypes');
    };

    $scope.add = function() {
        $state.go('app.photos.imagetypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.photos.imagetypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $imageTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.imageType = data;
        });
    }

}]);

