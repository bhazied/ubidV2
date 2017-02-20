'use strict';

/**
 * Controller for Post Type Details
 */

app.controller('PostTypeCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$postTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $postTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.news.posttypes');
    };

    $scope.add = function() {
        $state.go('app.news.posttypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.news.posttypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $postTypesDataFactory.get({locale: $localeStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.postType = data;
        });
    }

}]);

