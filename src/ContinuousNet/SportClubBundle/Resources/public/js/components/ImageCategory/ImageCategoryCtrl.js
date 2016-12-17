'use strict';

/**
 * Controller for Image Category Details
 */

app.controller('ImageCategoryCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$imageCategoriesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $imageCategoriesDataFactory) {

    $scope.statuses = [{
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Online',
        title: $filter('translate')('content.list.fields.statuses.ONLINE'),
        css: 'success'
    }, {
        id: 'Deactivated',
        title: $filter('translate')('content.list.fields.statuses.DEACTIVATED'),
        css: 'warning'
    }, {
        id: 'Offline',
        title: $filter('translate')('content.list.fields.statuses.OFFLINE'),
        css: 'danger'
    }, {
        id: 'Deleted',
        title: $filter('translate')('content.list.fields.statuses.DELETED'),
        css: 'default'
    }, {
        id: 'Archived',
        title: $filter('translate')('content.list.fields.statuses.ARCHIVED'),
        css: 'info'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.photos.imagecategories');
    };

    $scope.add = function() {
        $state.go('app.photos.imagecategoriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.photos.imagecategoriesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $imageCategoriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.imageCategory = data;
        });
    }

}]);

