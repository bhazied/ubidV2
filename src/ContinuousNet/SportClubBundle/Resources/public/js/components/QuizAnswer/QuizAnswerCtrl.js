'use strict';

/**
 * Controller for Quiz Answer Details
 */

app.controller('QuizAnswerCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$quizAnswersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $quizAnswersDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.quizzesmanager.quizanswers');
    };

    $scope.add = function() {
        $state.go('app.quizzesmanager.quizanswersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.quizzesmanager.quizanswersedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $quizAnswersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.quizAnswer = data;
        });
    }

}]);

