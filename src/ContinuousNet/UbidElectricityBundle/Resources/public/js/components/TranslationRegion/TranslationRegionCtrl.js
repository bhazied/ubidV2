'use strict';

/**
 * Controller for Translation Region Details
 */

app.controller('TranslationRegionCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationRegionsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationRegionsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationregions');
    };

    $scope.add = function() {
        $state.go('app.translation.translationregionsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationregionsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationRegionsDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationRegion = data;
        });
    }

}]);

