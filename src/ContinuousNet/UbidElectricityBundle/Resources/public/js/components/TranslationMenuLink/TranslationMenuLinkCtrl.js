'use strict';

/**
 * Controller for Translation Menu Link Details
 */

app.controller('TranslationMenuLinkCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationMenuLinksDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationMenuLinksDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationmenulinks');
    };

    $scope.add = function() {
        $state.go('app.translation.translationmenulinksnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationmenulinksedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationMenuLinksDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationMenuLink = data;
        });
    }

}]);

