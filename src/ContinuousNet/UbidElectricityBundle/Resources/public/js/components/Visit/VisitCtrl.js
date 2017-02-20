'use strict';

/**
 * Controller for Visit Details
 */

app.controller('VisitCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$visitsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $visitsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.statistics.visits');
    };

    $scope.add = function() {
        $state.go('app.statistics.visitsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.statistics.visitsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $visitsDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.visit = data;
        });
    }

}]);

