'use strict';

/**
 * Controller for Translation Category Details
 */

app.controller('TranslationCategoryCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationCategoriesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationCategoriesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationcategories');
    };

    $scope.add = function() {
        $state.go('app.translation.translationcategoriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationcategoriesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationCategoriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationCategory = data;
        });
    }

}]);

