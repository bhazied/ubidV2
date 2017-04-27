'use strict';

/**
 * Controller for Translation Physical Activity Details
 */

app.controller('TranslationPhysicalActivityCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationPhysicalActivitiesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationPhysicalActivitiesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationphysicalactivities');
    };

    $scope.add = function() {
        $state.go('app.translation.translationphysicalactivitiesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationphysicalactivitiesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationPhysicalActivitiesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationPhysicalActivity = data;
        });
    }

}]);

