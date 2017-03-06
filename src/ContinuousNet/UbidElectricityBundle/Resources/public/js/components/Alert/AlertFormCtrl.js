'use strict';

/**
 * Controller for Alert Form
 */

app.controller('AlertFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$usersDataFactory', '$categoriesDataFactory', '$countriesDataFactory', '$alertsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $usersDataFactory, $categoriesDataFactory, $countriesDataFactory, $alertsDataFactory) {

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

    $scope.types = [{
        id: 'Tender',
        title: $filter('translate')('content.list.fields.typesoptions.TENDER'),
        css: 'primary'
    }, {
        id: 'Supplier',
        title: $filter('translate')('content.list.fields.typesoptions.SUPPLIER'),
        css: 'success'
    }, {
        id: 'Buyer',
        title: $filter('translate')('content.list.fields.typesoptions.BUYER'),
        css: 'warning'
    }, {
        id: 'SupplierProduct',
        title: $filter('translate')('content.list.fields.typesoptions.SUPPLIERPRODUCT'),
        css: 'danger'
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
    $scope.periods = [{
        id: 'Daily',
        title: $filter('translate')('content.list.fields.periods.DAILY'),
        css: 'primary'
    }, {
        id: 'Weekly',
        title: $filter('translate')('content.list.fields.periods.WEEKLY'),
        css: 'success'
    }, {
        id: 'Monthly',
        title: $filter('translate')('content.list.fields.periods.MONTHLY'),
        css: 'warning'
    }];

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
                    if (angular.isDefined($scope.alert)) {
                        $scope.alert.creator_user = $scope.alert.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();

    $scope.categories = [];
    $scope.categoriesLoaded = [];

    $scope.getCategories = function() {
        $timeout(function(){
            if ($scope.categories.length == 0) {
                $scope.categories.push({});
                var def = $q.defer();
                $categoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[category.name]': 'asc'}).$promise.then(function(data) {
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

    $scope.categoriesSearchText = '';
    $scope.alertCategories = false;
    $scope.$watch('alertCategories', function() {
        if (angular.isDefined($scope.alert)) {
            var categories = $filter('filter')($scope.categories, $scope.categoriesSearchText);
            if ($scope.alertCategories) {
                for (var i in categories) {
                    var id = categories[i].id;
                    var index = $scope.alert.categories.indexOf(id);
                    if (index == -1) {
                        $scope.alert.categories.push(id);
                    }
                }
            } else {
                for (var i in categories) {
                    var id = categories[i].id;
                    var index = $scope.alert.categories.indexOf(id);
                    if (index > -1) {
                        $scope.alert.categories.splice(index, 1);
                    }
                }
            }
        }
    });
    $scope.countries = [];
    $scope.countriesLoaded = [];

    $scope.getCountries = function() {
        $timeout(function(){
            if ($scope.countries.length == 0) {
                $scope.countries.push({});
                var def = $q.defer();
                $countriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                    $scope.countries = data.results;
                    def.resolve($scope.countries);
                });
                return def;
            } else {
                return $scope.countries;
            }
        });
    };

    $scope.getCountries();

    $scope.countriesSearchText = '';
    $scope.alertCountries = false;
    $scope.$watch('alertCountries', function() {
        if (angular.isDefined($scope.alert)) {
            var countries = $filter('filter')($scope.countries, $scope.countriesSearchText);
            if ($scope.alertCountries) {
                for (var i in countries) {
                    var id = countries[i].id;
                    var index = $scope.alert.countries.indexOf(id);
                    if (index == -1) {
                        $scope.alert.countries.push(id);
                    }
                }
            } else {
                for (var i in countries) {
                    var id = countries[i].id;
                    var index = $scope.alert.countries.indexOf(id);
                    if (index > -1) {
                        $scope.alert.countries.splice(index, 1);
                    }
                }
            }
        }
    });

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
            if ($scope.alert.id > 0) {
                $scope.disableSubmit = true;
                $alertsDataFactory.update($scope.alert).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.ALERTUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
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
                    if (redirect) {
                        $scope.list();
                    }
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
    
    if (angular.isDefined($stateParams.id)) {
        $alertsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.alert = savable(data);
            });
        });
    } else {
        $scope.alert = {id: 0, status: 'Active', period: 'Daily', categories: [], countries: []};

    }

}]);

