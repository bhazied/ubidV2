'use strict';

/**
 * Controller for Quiz Type Details
 */

app.controller('QuizTypeCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$quizTypesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $quizTypesDataFactory) {


    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.quizzesmanager.quiztypes');
    };

    $scope.add = function() {
        $state.go('app.quizzesmanager.quiztypesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.quizzesmanager.quiztypesedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $quizTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.quizType = data;
        });
    }

}]);

