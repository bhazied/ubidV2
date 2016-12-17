'use strict';

/**
 * Controller for Quiz Form
 */

app.controller('QuizFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$quizTypesDataFactory', '$usersDataFactory', '$quizzesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $quizTypesDataFactory, $usersDataFactory, $quizzesDataFactory) {

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

    $scope.kinds = [{
        id: 'SingleChoice',
        title: $filter('translate')('content.list.fields.kinds.SINGLECHOICE'),
        css: 'primary'
    }, {
        id: 'MultipleChoice',
        title: $filter('translate')('content.list.fields.kinds.MULTIPLECHOICE'),
        css: 'success'
    }];

    $scope.startPublishingOpened = false;
    $scope.startPublishingToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startPublishingOpened = !$scope.startPublishingOpened;
    };

    $scope.endPublishingOpened = false;
    $scope.endPublishingToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endPublishingOpened = !$scope.endPublishingOpened;
    };

    $scope.publishDateOpened = false;
    $scope.publishDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.publishDateOpened = !$scope.publishDateOpened;
    };
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
    $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');
    $scope.minDate = new Date(1900, 0, 1);
    $scope.maxDate = new Date(2050, 11, 31);
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1));
    };
    $scope.quizTypes = [];
    $scope.quizTypesLoaded = false;

    $scope.getQuizTypes = function() {
        $timeout(function(){
            $scope.quizTypesLoaded = true;
            if ($scope.quizTypes.length == 0) {
                $scope.quizTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTQUIZTYPE')});
                var def = $q.defer();
                $quizTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[quizType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.quizTypes = data.results;
                    def.resolve($scope.quizTypes);
                });
                return def;
            } else {
                return $scope.quizTypes;
            }
        });
    };

    $scope.getQuizTypes();

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
            if ($scope.quiz.id > 0) {
                $scope.disableSubmit = true;
                $quizzesDataFactory.update($scope.quiz).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.QUIZUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.QUIZNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $quizzesDataFactory.create($scope.quiz).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.QUIZCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.QUIZNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.quizzesmanager.quizzes');
    };
    
    $scope.quiz_quiz_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $quizzesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.quiz = savable(data);
                if ($scope.quiz.start_publishing != null) {
                    $scope.quiz.start_publishing = new Date($scope.quiz.start_publishing);
                }
                if ($scope.quiz.end_publishing != null) {
                    $scope.quiz.end_publishing = new Date($scope.quiz.end_publishing);
                }
                if ($scope.quiz.publish_date != null) {
                    $scope.quiz.publish_date = new Date($scope.quiz.publish_date);
                }
            });
        });
    } else {
        $scope.quiz = {id: 0, kind: 'SingleChoice', publish_date: new Date(), status: 'Draft'};

        if (angular.isDefined($stateParams.quiz_quiz_type) && JSON.parse($stateParams.quiz_quiz_type) != null) {
            $scope.quiz.quiz_type = $stateParams.quiz_quiz_type;
            $scope.quiz_quiz_type_readonly = true;
        }
    }

    $scope.showFileManager = function(field) {
    
        var modalInstance = $uibModal.open({
            templateUrl: '/bundles/sportclub/js/common/FileManager/modal_content.html',
            controller: 'FileManagerCtrl',
            size: 'lg',
            resolve: {
                field: function() {
                    return field;
                },
                value: function() {
                    return $scope.quiz[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'quizzes';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.quiz[field] = url;
        }, function () {
            
        });
    
    };

}]);

