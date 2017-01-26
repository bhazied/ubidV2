'use strict';

/**
 * Controller for Translation Menu Details
 */

app.controller('TranslationMenuCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationMenusDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationMenusDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationmenus');
    };

    $scope.add = function() {
        $state.go('app.translation.translationmenusnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationmenusedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationMenusDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationMenu = data;
        });
    }

}]);

