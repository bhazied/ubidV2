'use strict';

/**
 * Controller for Gallery Details
 */

app.controller('GalleryCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$galleriesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $galleriesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.photos.galleries');
    };

    $scope.add = function() {
        $state.go('app.photos.galleriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.photos.galleriesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $galleriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.gallery = data;
        });
    }

}]);

