'use strict';

/**
 * Controller for Alert Form
 */

app.controller('AlertFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$categoriesDataFactory', '$usersDataFactory', '$alertsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $categoriesDataFactory, $usersDataFactory, $alertsDataFactory) {

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

    $scope.types = [{
        id: 'Tender',
        title: $filter('translate')('content.list.fields.types.TENDER'),
        css: 'primary'
    }, {
        id: 'Supplier',
        title: $filter('translate')('content.list.fields.types.SUPPLIER'),
        css: 'success'
    }, {
        id: 'SupplierProduct',
        title: $filter('translate')('content.list.fields.types.SUPPLIERPRODUCT'),
        css: 'warning'
    }];
    $scope.statuses = [{
        id: 'Active',
        title: $filter('translate')('content.list.fields.statuses.ACTIVE'),
        css: 'primary'
    }, {
        id: 'Inactive',
        title: $filter('translate')('content.list.fields.statuses.INACTIVE'),
        css: 'success'
    }];

    $scope.categories = [];
    $scope.categoriesLoaded = false;

    $scope.getCategories = function() {
        $timeout(function(){
            $scope.categoriesLoaded = true;
            if ($scope.categories.length == 0) {
                $scope.categories.push({id: '', title: $filter('translate')('content.form.messages.SELECTCATEGORY')});
                var def = $q.defer();
                $categoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[category.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.categories = data.results;
                    def.resolve($scope.categories);
                });
                return def;
            } else {
                return $scope.categories;
            }
        });
    };

    $scope.getCategories();

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
            if ($scope.alert.id > 0) {
                $scope.disableSubmit = true;
                $alertsDataFactory.update($scope.alert).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.ALERTUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.ALERTNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $alertsDataFactory.create($scope.alert).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.ALERTCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.ALERTNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.access.alerts');
    };
    
    $scope.alert_category_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $alertsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.alert = savable(data);
            });
        });
    } else {
        $scope.alert = {id: 0, type: 'Tender', status: 'Active'};

        if (angular.isDefined($stateParams.alert_category) && JSON.parse($stateParams.alert_category) != null) {
            $scope.alert.category = $stateParams.alert_category;
            $scope.alert_category_readonly = true;
        }
    }

}]);

