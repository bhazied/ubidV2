'use strict';

/**
 * Controller for Translation Region Form
 */

app.controller('TranslationRegionFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$regionsDataFactory', '$usersDataFactory', '$translationRegionsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $regionsDataFactory, $usersDataFactory, $translationRegionsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'translationregions',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.regions = [];
    $scope.regionsLoaded = false;

    $scope.getRegions = function() {
        $timeout(function(){
            $scope.regionsLoaded = true;
            if ($scope.regions.length == 0) {
                $scope.regions.push({id: '', title: $filter('translate')('content.form.messages.SELECTREGION')});
                var def = $q.defer();
                $regionsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[region.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTREGION')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.regions = data.results;
                    def.resolve($scope.regions);
                    if (angular.isDefined($scope.translationRegion)) {
                        $scope.translationRegion.region = $scope.translationRegion.region || $scope.regions[0].id;
                    }
                });
                return def;
            } else {
                return $scope.regions;
            }
        });
    };

    $scope.getRegions();

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
                    if (angular.isDefined($scope.translationRegion)) {
                        $scope.translationRegion.creator_user = $scope.translationRegion.creator_user || $scope.users[0].id;
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
            if ($scope.translationRegion.id > 0) {
                $scope.disableSubmit = true;
                $translationRegionsDataFactory.update($scope.translationRegion).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONREGIONUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONREGIONNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationRegionsDataFactory.create($scope.translationRegion).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONREGIONCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONREGIONNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationregions');
    };
    
    $scope.translation_region_region_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationRegionsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationRegion = savable(data);
            });
        });
    } else {
        $scope.translationRegion = {id: 0};

        if (angular.isDefined($stateParams.translation_region_region) && JSON.parse($stateParams.translation_region_region) != null) {
            $scope.translationRegion.region = $stateParams.translation_region_region;
            $scope.translation_region_region_readonly = true;
        }
    }

}]);

