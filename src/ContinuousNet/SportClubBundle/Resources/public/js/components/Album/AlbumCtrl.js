'use strict';

/**
 * Controller for Album Details
 */

app.controller('AlbumCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$albumsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $albumsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.webradio.albums');
    };

    $scope.add = function() {
        $state.go('app.webradio.albumsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webradio.albumsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $albumsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.album = data;
        });
    }

}]);

