'use strict';

/**
 * Controller for Audio Type Details
 */

app.controller('AudioTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$audioTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $audioTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.webradio.audiotypes');
    };

    $scope.add = function() {
        $state.go('app.webradio.audiotypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webradio.audiotypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $audioTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.audioType = data;
        });
    }

}]);

