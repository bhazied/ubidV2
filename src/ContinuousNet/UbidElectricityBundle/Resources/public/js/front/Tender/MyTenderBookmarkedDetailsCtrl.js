'use strict';

/**
 * Controller for Tender Bookmark Details
 */

app.controller('MyTenderBookmarkedDetailsCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$tenderBookmarksDataFactory',
    function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $tenderBookmarksDataFactory) {

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
            $state.go('front.bookmarkproject.list');
        };



        if (angular.isDefined($stateParams.id)) {
            $tenderBookmarksDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
                $scope.tenderBookmark = data;
            });
        }

    }]);
