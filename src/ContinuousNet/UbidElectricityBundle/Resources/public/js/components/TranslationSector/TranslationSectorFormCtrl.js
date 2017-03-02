'use strict';

/**
 * Controller for Translation Sector Form
 */

app.controller('TranslationSectorFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$sectorsDataFactory', '$usersDataFactory', '$translationSectorsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $sectorsDataFactory, $usersDataFactory, $translationSectorsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.sectors = [];
    $scope.sectorsLoaded = false;

    $scope.getSectors = function() {
        $timeout(function(){
            $scope.sectorsLoaded = true;
            if ($scope.sectors.length == 0) {
                $scope.sectors.push({id: '', title: $filter('translate')('content.form.messages.SELECTSECTOR')});
                var def = $q.defer();
                $sectorsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[sector.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTSECTOR')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.sectors = data.results;
                    def.resolve($scope.sectors);
                    $scope.translationSector.sector = $scope.translationSector.sector || $scope.sectors[0].id;
                });
                return def;
            } else {
                return $scope.sectors;
            }
        });
    };

    $scope.getSectors();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    $scope.translationSector.creator_user = $scope.translationSector.creator_user || $scope.users[0].id;
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
            if ($scope.translationSector.id > 0) {
                $scope.disableSubmit = true;
                $translationSectorsDataFactory.update($scope.translationSector).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONSECTORUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONSECTORNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationSectorsDataFactory.create($scope.translationSector).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONSECTORCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONSECTORNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationsectors');
    };
    
    $scope.translation_sector_sector_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationSectorsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationSector = savable(data);
            });
        });
    } else {
        $scope.translationSector = {id: 0};

        if (angular.isDefined($stateParams.translation_sector_sector) && JSON.parse($stateParams.translation_sector_sector) != null) {
            $scope.translationSector.sector = $stateParams.translation_sector_sector;
            $scope.translation_sector_sector_readonly = true;
        }
    }

}]);

