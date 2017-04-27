'use strict';

/**
 * Controller for Log Form
 */

app.controller('LogFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$sessionsDataFactory', '$usersDataFactory', '$logsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $sessionsDataFactory, $usersDataFactory, $logsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/logs',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'logs',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.sessions = [];
    $scope.sessionsLoaded = false;

    $scope.getSessions = function() {
        $timeout(function(){
            $scope.sessionsLoaded = true;
            if ($scope.sessions.length == 0) {
                $scope.sessions.push({id: '', title: $filter('translate')('content.form.messages.SELECTSESSION')});
                var def = $q.defer();
                $sessionsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[session.ip]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTSESSION')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.sessions = data.results;
                    def.resolve($scope.sessions);
                    if (angular.isDefined($scope.log)) {
                        $scope.log.session = $scope.log.session || $scope.sessions[0].id;
                    }
                });
                return def;
            } else {
                return $scope.sessions;
            }
        });
    };

    $scope.getSessions();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.log)) {
                        $scope.log.creator_user = $scope.log.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.redirect = true;
    $scope.submitForm = function(form, redirect) {
        $scope.redirect = redirect;
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
            if ($scope.enableFormAlert) {
                SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
            }
            return false;
        } else {
            if ($scope.log.id > 0) {
                $scope.disableSubmit = true;
                $logsDataFactory.update($scope.log).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.LOGUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.LOGNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $logsDataFactory.create($scope.log).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.LOGCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.LOGNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.accesscontrol.logs');
    };
    
    $scope.log_session_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $logsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.log = savable(data);
            });
        });
    } else {
        $scope.log = {id: 0};

        if (angular.isDefined($stateParams.log_session) && JSON.parse($stateParams.log_session) != null) {
            $scope.log.session = $stateParams.log_session;
            $scope.log_session_readonly = true;
        }
    }

}]);

