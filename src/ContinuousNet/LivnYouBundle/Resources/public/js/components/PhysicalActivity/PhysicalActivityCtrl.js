'use strict';

/**
 * Controller for Physical Activity Details
 */

app.controller('PhysicalActivityCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$physicalActivitiesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $physicalActivitiesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.systemsettings.physicalactivities');
    };

    $scope.add = function() {
        $state.go('app.systemsettings.physicalactivitiesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.systemsettings.physicalactivitiesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $physicalActivitiesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.physicalActivity = data;
        });
    }

}]);

