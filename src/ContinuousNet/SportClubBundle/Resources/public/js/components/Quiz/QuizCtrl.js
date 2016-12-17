'use strict';

/**
 * Controller for Quiz Details
 */

app.controller('QuizCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$quizzesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $quizzesDataFactory) {

    $scope.kinds = [{
        id: 'SingleChoice',
        title: $filter('translate')('content.list.fields.kinds.SINGLECHOICE'),
        css: 'primary'
    }, {
        id: 'MultipleChoice',
        title: $filter('translate')('content.list.fields.kinds.MULTIPLECHOICE'),
        css: 'success'
    }];
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
        $state.go('app.quizzesmanager.quizzes');
    };

    $scope.add = function() {
        $state.go('app.quizzesmanager.quizzesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.quizzesmanager.quizzesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $quizzesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.quiz = data;
        });
    }

}]);

