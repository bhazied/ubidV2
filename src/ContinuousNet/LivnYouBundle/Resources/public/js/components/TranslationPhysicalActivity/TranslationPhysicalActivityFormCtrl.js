'use strict';

/**
 * Controller for Translation Physical Activity Form
 */

app.controller('TranslationPhysicalActivityFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$physicalActivitiesDataFactory', '$usersDataFactory', '$translationPhysicalActivitiesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $physicalActivitiesDataFactory, $usersDataFactory, $translationPhysicalActivitiesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/translationphysicalactivities',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'translationphysicalactivities',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.physicalActivities = [];
    $scope.physicalActivitiesLoaded = false;

    $scope.getPhysicalActivities = function() {
        $timeout(function(){
            $scope.physicalActivitiesLoaded = true;
            if ($scope.physicalActivities.length == 0) {
                $scope.physicalActivities.push({id: '', title: $filter('translate')('content.form.messages.SELECTPHYSICALACTIVITY')});
                var def = $q.defer();
                $physicalActivitiesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[physicalActivity.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPHYSICALACTIVITY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.physicalActivities = data.results;
                    def.resolve($scope.physicalActivities);
                    if (angular.isDefined($scope.translationPhysicalActivity)) {
                        $scope.translationPhysicalActivity.physical_activity = $scope.translationPhysicalActivity.physical_activity || $scope.physicalActivities[0].id;
                    }
                });
                return def;
            } else {
                return $scope.physicalActivities;
            }
        });
    };

    $scope.getPhysicalActivities();

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
                    if (angular.isDefined($scope.translationPhysicalActivity)) {
                        $scope.translationPhysicalActivity.creator_user = $scope.translationPhysicalActivity.creator_user || $scope.users[0].id;
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
            if ($scope.translationPhysicalActivity.id > 0) {
                $scope.disableSubmit = true;
                $translationPhysicalActivitiesDataFactory.update($scope.translationPhysicalActivity).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPHYSICALACTIVITYUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPHYSICALACTIVITYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationPhysicalActivitiesDataFactory.create($scope.translationPhysicalActivity).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPHYSICALACTIVITYCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPHYSICALACTIVITYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationphysicalactivities');
    };
    
    $scope.translation_physical_activity_physical_activity_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationPhysicalActivitiesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationPhysicalActivity = savable(data);
            });
        });
    } else {
        $scope.translationPhysicalActivity = {id: 0};

        if (angular.isDefined($stateParams.translation_physical_activity_physical_activity) && JSON.parse($stateParams.translation_physical_activity_physical_activity) != null) {
            $scope.translationPhysicalActivity.physical_activity = $stateParams.translation_physical_activity_physical_activity;
            $scope.translation_physical_activity_physical_activity_readonly = true;
        }
    }

}]);

