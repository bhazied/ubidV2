'use strict';

/**
 * Controller for Translation Supplier Type Form
 */

app.controller('TranslationSupplierTypeFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$supplierTypesDataFactory', '$usersDataFactory', '$translationSupplierTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $supplierTypesDataFactory, $usersDataFactory, $translationSupplierTypesDataFactory) {

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


    $scope.supplierTypes = [];
    $scope.supplierTypesLoaded = false;

    $scope.getSupplierTypes = function() {
        $timeout(function(){
            $scope.supplierTypesLoaded = true;
            if ($scope.supplierTypes.length == 0) {
                $scope.supplierTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTSUPPLIERTYPE')});
                var def = $q.defer();
                $supplierTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[supplierType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.supplierTypes = data.results;
                    def.resolve($scope.supplierTypes);
                });
                return def;
            } else {
                return $scope.supplierTypes;
            }
        });
    };

    $scope.getSupplierTypes();

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
            if ($scope.translationSupplierType.id > 0) {
                $scope.disableSubmit = true;
                $translationSupplierTypesDataFactory.update($scope.translationSupplierType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONSUPPLIERTYPEUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONSUPPLIERTYPENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationSupplierTypesDataFactory.create($scope.translationSupplierType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONSUPPLIERTYPECREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONSUPPLIERTYPENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationsuppliertypes');
    };
    
    $scope.translation_supplier_type_supplier_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationSupplierTypesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationSupplierType = savable(data);
            });
        });
    } else {
        $scope.translationSupplierType = {id: 0};

        if (angular.isDefined($stateParams.translation_supplier_type_supplier_type) && JSON.parse($stateParams.translation_supplier_type_supplier_type) != null) {
            $scope.translationSupplierType.supplier_type = $stateParams.translation_supplier_type_supplier_type;
            $scope.translation_supplier_type_supplier_type_readonly = true;
        }
    }

}]);

