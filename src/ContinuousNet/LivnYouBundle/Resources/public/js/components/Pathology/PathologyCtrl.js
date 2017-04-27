'use strict';

/**
 * Controller for Pathology Details
 */

app.controller('PathologyCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$pathologiesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $pathologiesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.systemsettings.pathologies');
    };

    $scope.add = function() {
        $state.go('app.systemsettings.pathologiesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.systemsettings.pathologiesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $pathologiesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.pathology = data;
        });
    }

}]);

