'use strict';

/**
 * Controller for Menu Link Details
 */

app.controller('MenuLinkCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$menuLinksDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $menuLinksDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.settings.menulinks');
    };

    $scope.add = function() {
        $state.go('app.settings.menulinksnew');
    };

    $scope.edit = function(row) {
        $state.go('app.settings.menulinksedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $menuLinksDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.menuLink = data;
        });
    }

}]);

