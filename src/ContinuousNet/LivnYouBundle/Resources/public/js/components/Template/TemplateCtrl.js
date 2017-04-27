'use strict';

/**
 * Controller for Template Details
 */

app.controller('TemplateCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$templatesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $templatesDataFactory) {

    $scope.shareLevels = [{
        id: 'None',
        title: $filter('translate')('content.list.fields.sharelevels.NONE'),
        css: 'primary'
    }, {
        id: 'Everyone',
        title: $filter('translate')('content.list.fields.sharelevels.EVERYONE'),
        css: 'success'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.templatemanager.templates');
    };

    $scope.add = function() {
        $state.go('app.templatemanager.templatesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.templatemanager.templatesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $templatesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $scope.template = data;
        });
    }

}]);

