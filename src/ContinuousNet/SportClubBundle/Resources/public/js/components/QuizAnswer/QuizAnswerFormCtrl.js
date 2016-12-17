'use strict';

/**
 * Controller for Quiz Answer Form
 */

app.controller('QuizAnswerFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$quizzesDataFactory', '$usersDataFactory', '$quizAnswersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $quizzesDataFactory, $usersDataFactory, $quizAnswersDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.quizzes = [];
    $scope.quizzesLoaded = false;

    $scope.getQuizzes = function() {
        $timeout(function(){
            $scope.quizzesLoaded = true;
            if ($scope.quizzes.length == 0) {
                $scope.quizzes.push({id: '', title: $filter('translate')('content.form.messages.SELECTQUIZ')});
                var def = $q.defer();
                $quizzesDataFactory.query({offset: 0, limit: 10000, 'order_by[quiz.title]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.quizzes = data.results;
                    def.resolve($scope.quizzes);
                });
                return def;
            } else {
                return $scope.quizzes;
            }
        });
    };

    $scope.getQuizzes();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                var def = $q.defer();
                $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.submitForm = function(form) {
        var firstError = null;
        if (form.$invalid) {
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
            return false;
        } else {
            if ($scope.quizAnswer.id > 0) {
                $scope.disableSubmit = true;
                $quizAnswersDataFactory.update($scope.quizAnswer).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.QUIZANSWERUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.QUIZANSWERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $quizAnswersDataFactory.create($scope.quizAnswer).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.QUIZANSWERCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.QUIZANSWERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.quizzesmanager.quizanswers');
    };
    
    $scope.quiz_answer_quiz_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $quizAnswersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.quizAnswer = savable(data);
            });
        });
    } else {
        $scope.quizAnswer = {id: 0};

        if (angular.isDefined($stateParams.quiz_answer_quiz) && JSON.parse($stateParams.quiz_answer_quiz) != null) {
            $scope.quizAnswer.quiz = $stateParams.quiz_answer_quiz;
            $scope.quiz_answer_quiz_readonly = true;
        }
    }

}]);

