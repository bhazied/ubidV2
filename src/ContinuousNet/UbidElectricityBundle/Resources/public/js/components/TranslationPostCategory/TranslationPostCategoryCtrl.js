'use strict';

/**
 * Controller for Translation Post Category Details
 */

app.controller('TranslationPostCategoryCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationPostCategoriesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationPostCategoriesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationpostcategories');
    };

    $scope.add = function() {
        $state.go('app.translation.translationpostcategoriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationpostcategoriesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationPostCategoriesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationPostCategory = data;
        });
    }

}]);

