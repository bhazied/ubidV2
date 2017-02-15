'use strict';

/**
 * Controller for Supplier Form
 */

app.controller('SupplierFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$supplierTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$suppliersDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $supplierTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $categoriesDataFactory, $suppliersDataFactory) {

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

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $timeout(function(){
            $scope.countriesLoaded = true;
            if ($scope.countries.length == 0) {
                $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                var def = $q.defer();
                $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
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

    $scope.languages = [];
    $scope.languagesLoaded = false;

    $scope.getLanguages = function() {
        $timeout(function(){
            $scope.languagesLoaded = true;
            if ($scope.languages.length == 0) {
                $scope.languages.push({id: '', title: $filter('translate')('content.form.messages.SELECTLANGUAGE')});
                var def = $q.defer();
                $languagesDataFactory.query({offset: 0, limit: 10000, 'order_by[language.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.languages = data.results;
                    def.resolve($scope.languages);
                });
                return def;
            } else {
                return $scope.languages;
            }
        });
    };

    $scope.getLanguages();

    $scope.regions = [];
    $scope.regionsLoaded = false;

    $scope.getRegions = function() {
        $timeout(function(){
            $scope.regionsLoaded = true;
            if ($scope.regions.length == 0) {
                $scope.regions.push({id: '', title: $filter('translate')('content.form.messages.SELECTFIRSTMARKETREGION')});
                var def = $q.defer();
                $regionsDataFactory.query({offset: 0, limit: 10000, 'order_by[region.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.regions = data.results;
                    def.resolve($scope.regions);
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

    $scope.categories = [];
    $scope.categoriesLoaded = [];

    $scope.getCategories = function() {
        $timeout(function(){
            if ($scope.categories.length == 0) {
                $scope.categories.push({});
                var def = $q.defer();
                $categoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[category.name]': 'asc'}).$promise.then(function(data) {
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
    $scope.supplierCategories = false;
    $scope.$watch('supplierCategories', function() {
        if (angular.isDefined($scope.supplier)) {
            var categories = $filter('filter')($scope.categories, $scope.categoriesSearchText);
            if ($scope.supplierCategories) {
                for (var i in categories) {
                    var id = categories[i].id;
                    var index = $scope.supplier.categories.indexOf(id);
                    if (index == -1) {
                        $scope.supplier.categories.push(id);
                    }
                }
            } else {
                for (var i in categories) {
                    var id = categories[i].id;
                    var index = $scope.supplier.categories.indexOf(id);
                    if (index > -1) {
                        $scope.supplier.categories.splice(index, 1);
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
            if ($scope.supplier.id > 0) {
                $scope.disableSubmit = true;
                $suppliersDataFactory.update($scope.supplier).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SUPPLIERUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SUPPLIERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $suppliersDataFactory.create($scope.supplier).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SUPPLIERCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SUPPLIERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.marketplace.suppliers');
    };
    
    $scope.supplier_supplier_type_readonly = false;
    $scope.supplier_country_readonly = false;
    $scope.supplier_language_readonly = false;
    $scope.supplier_first_market_region_readonly = false;
    $scope.supplier_second_market_region_readonly = false;
    $scope.supplier_third_market_region_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $suppliersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.supplier = savable(data);
            });
        });
    } else {
        $scope.supplier = {id: 0, categories: []};

        if (angular.isDefined($stateParams.supplier_supplier_type) && JSON.parse($stateParams.supplier_supplier_type) != null) {
            $scope.supplier.supplier_type = $stateParams.supplier_supplier_type;
            $scope.supplier_supplier_type_readonly = true;
        }
        if (angular.isDefined($stateParams.supplier_country) && JSON.parse($stateParams.supplier_country) != null) {
            $scope.supplier.country = $stateParams.supplier_country;
            $scope.supplier_country_readonly = true;
        }
        if (angular.isDefined($stateParams.supplier_language) && JSON.parse($stateParams.supplier_language) != null) {
            $scope.supplier.language = $stateParams.supplier_language;
            $scope.supplier_language_readonly = true;
        }
        if (angular.isDefined($stateParams.supplier_first_market_region) && JSON.parse($stateParams.supplier_first_market_region) != null) {
            $scope.supplier.first_market_region = $stateParams.supplier_first_market_region;
            $scope.supplier_first_market_region_readonly = true;
        }
        if (angular.isDefined($stateParams.supplier_second_market_region) && JSON.parse($stateParams.supplier_second_market_region) != null) {
            $scope.supplier.second_market_region = $stateParams.supplier_second_market_region;
            $scope.supplier_second_market_region_readonly = true;
        }
        if (angular.isDefined($stateParams.supplier_third_market_region) && JSON.parse($stateParams.supplier_third_market_region) != null) {
            $scope.supplier.third_market_region = $stateParams.supplier_third_market_region;
            $scope.supplier_third_market_region_readonly = true;
        }
    }

    $scope.showFileManager = function(field) {
    
        var modalInstance = $uibModal.open({
            templateUrl: '/bundles/ubidelectricity/js/common/FileManager/modal_content.html',
            controller: 'FileManagerCtrl',
            size: 'lg',
            resolve: {
                field: function() {
                    return field;
                },
                value: function() {
                    return $scope.supplier[field];
                },
                instance: function() {
                    return 'data';
                },
                folder: function() {
                    var user_id = '000000' + $localStorage.user.id;
                    var user_dir = 'user_' + user_id.substr(user_id.length - 6);
                    return user_dir;
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.supplier[field] = url;
        }, function () {
            
        });
    
    };

}]);

