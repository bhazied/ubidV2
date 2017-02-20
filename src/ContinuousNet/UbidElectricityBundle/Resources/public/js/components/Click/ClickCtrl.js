'use strict';

/**
 * Controller for Click Details
 */

app.controller('ClickCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$clicksDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $clicksDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.adserving.clicks');
    };

    $scope.add = function() {
        $state.go('app.adserving.clicksnew');
    };

    $scope.edit = function(row) {
        $state.go('app.adserving.clicksedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $clicksDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.click = data;
        });
    }

}]);

