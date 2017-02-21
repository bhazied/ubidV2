'use strict';

/**
 * Controller for Tender Bookmark Details
 */

app.controller('TenderBookmarkCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$tenderBookmarksDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $tenderBookmarksDataFactory) {

    $scope.statuses = [{
        id: 'Active',
        title: $filter('translate')('content.list.fields.statuses.ACTIVE'),
        css: 'primary'
    }, {
        id: 'Inactive',
        title: $filter('translate')('content.list.fields.statuses.INACTIVE'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.access.tenderbookmarks');
    };

    $scope.add = function() {
        $state.go('app.access.tenderbookmarksnew');
    };

    $scope.edit = function(row) {
        $state.go('app.access.tenderbookmarksedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $tenderBookmarksDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.tenderBookmark = data;
        });
    }

}]);

