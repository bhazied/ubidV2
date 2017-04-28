'use strict';

/**
 * Controller for Translation Product Type Form
 */

app.controller('TranslationProductTypeFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$productTypesDataFactory', '$usersDataFactory', '$translationProductTypesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $productTypesDataFactory, $usersDataFactory, $translationProductTypesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/translationproducttypes',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'translationproducttypes',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.productTypes = [];
    $scope.productTypesLoaded = false;

    $scope.getProductTypes = function() {
        $timeout(function(){
            $scope.productTypesLoaded = true;
            if ($scope.productTypes.length == 0) {
                $scope.productTypes.push({id: '', name: $filter('translate')('content.form.messages.SELECTPRODUCTTYPE')});
                var def = $q.defer();
                $productTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[productType.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPRODUCTTYPE')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.productTypes = data.results;
                    def.resolve($scope.productTypes);
                    if (angular.isDefined($scope.translationProductType)) {
                        $scope.translationProductType.product_type = $scope.translationProductType.product_type || $scope.productTypes[0].id;
                    }
                });
                return def;
            } else {
                return $scope.productTypes;
            }
        });
    };

    $scope.getProductTypes();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', username: $filter('translate')('content.form.messages.SELECTUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.translationProductType)) {
                        $scope.translationProductType.creator_user = $scope.translationProductType.creator_user || $scope.users[0].id;
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
            if ($scope.translationProductType.id > 0) {
                $scope.disableSubmit = true;
                $translationProductTypesDataFactory.update($scope.translationProductType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPRODUCTTYPEUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPRODUCTTYPENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationProductTypesDataFactory.create($scope.translationProductType).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPRODUCTTYPECREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPRODUCTTYPENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationproducttypes');
    };
    
    $scope.translation_product_type_product_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationProductTypesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationProductType = savable(data);
            });
        });
    } else {
        $scope.translationProductType = {id: 0};

        if (angular.isDefined($stateParams.translation_product_type_product_type) && JSON.parse($stateParams.translation_product_type_product_type) != null) {
            $scope.translationProductType.product_type = $stateParams.translation_product_type_product_type;
            $scope.translation_product_type_product_type_readonly = true;
        }
    }

}]);

