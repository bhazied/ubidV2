'use strict';

/**
 * Controller for Translation Post Type Details
 */

app.controller('TranslationPostTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationPostTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationPostTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationposttypes');
    };

    $scope.add = function() {
        $state.go('app.translation.translationposttypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationposttypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationPostTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationPostType = data;
        });
    }

}]);

