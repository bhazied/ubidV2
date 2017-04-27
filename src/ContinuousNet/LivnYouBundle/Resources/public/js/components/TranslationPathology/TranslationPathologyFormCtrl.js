'use strict';

/**
 * Controller for Translation Pathology Form
 */

app.controller('TranslationPathologyFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$pathologiesDataFactory', '$usersDataFactory', '$translationPathologiesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $pathologiesDataFactory, $usersDataFactory, $translationPathologiesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/translationpathologies',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'translationpathologies',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.pathologies = [];
    $scope.pathologiesLoaded = false;

    $scope.getPathologies = function() {
        $timeout(function(){
            $scope.pathologiesLoaded = true;
            if ($scope.pathologies.length == 0) {
                $scope.pathologies.push({id: '', title: $filter('translate')('content.form.messages.SELECTPATHOLOGY')});
                var def = $q.defer();
                $pathologiesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[pathology.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPATHOLOGY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.pathologies = data.results;
                    def.resolve($scope.pathologies);
                    if (angular.isDefined($scope.translationPathology)) {
                        $scope.translationPathology.pathology = $scope.translationPathology.pathology || $scope.pathologies[0].id;
                    }
                });
                return def;
            } else {
                return $scope.pathologies;
            }
        });
    };

    $scope.getPathologies();

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
                    if (angular.isDefined($scope.translationPathology)) {
                        $scope.translationPathology.creator_user = $scope.translationPathology.creator_user || $scope.users[0].id;
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
            if ($scope.translationPathology.id > 0) {
                $scope.disableSubmit = true;
                $translationPathologiesDataFactory.update($scope.translationPathology).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPATHOLOGYUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPATHOLOGYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationPathologiesDataFactory.create($scope.translationPathology).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPATHOLOGYCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPATHOLOGYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationpathologies');
    };
    
    $scope.translation_pathology_pathology_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationPathologiesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationPathology = savable(data);
            });
        });
    } else {
        $scope.translationPathology = {id: 0};

        if (angular.isDefined($stateParams.translation_pathology_pathology) && JSON.parse($stateParams.translation_pathology_pathology) != null) {
            $scope.translationPathology.pathology = $stateParams.translation_pathology_pathology;
            $scope.translation_pathology_pathology_readonly = true;
        }
    }

}]);

