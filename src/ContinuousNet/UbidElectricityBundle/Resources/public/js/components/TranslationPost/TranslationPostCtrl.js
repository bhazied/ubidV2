'use strict';

/**
 * Controller for Translation Post Details
 */

app.controller('TranslationPostCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$translationPostsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $translationPostsDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.translation.translationposts');
    };

    $scope.add = function() {
        $state.go('app.translation.translationpostsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationpostsedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $translationPostsDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.translationPost = data;
        });
    }

}]);

