'use strict';

/**
 * Controller for Supplier Product Form
 */

app.controller('SupplierProductFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$suppliersDataFactory', '$categoriesDataFactory', '$usersDataFactory', '$languagesDataFactory', '$supplierProductsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $suppliersDataFactory, $categoriesDataFactory, $usersDataFactory, $languagesDataFactory, $supplierProductsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/supplierproducts',
        filebrowserBrowseRouteParameters: {
            instance: 'data',
            homeFolder: 'supplierproducts',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };

    $scope.statuses = [{
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Online',
        title: $filter('translate')('content.list.fields.statuses.ONLINE'),
        css: 'success'
    }, {
        id: 'Deactivated',
        title: $filter('translate')('content.list.fields.statuses.DEACTIVATED'),
        css: 'warning'
    }, {
        id: 'Offline',
        title: $filter('translate')('content.list.fields.statuses.OFFLINE'),
        css: 'danger'
    }, {
        id: 'Deleted',
        title: $filter('translate')('content.list.fields.statuses.DELETED'),
        css: 'default'
    }, {
        id: 'Archived',
        title: $filter('translate')('content.list.fields.statuses.ARCHIVED'),
        css: 'info'
    }];

    $scope.suppliers = [];
    $scope.suppliersLoaded = false;

    $scope.getSuppliers = function() {
        $timeout(function(){
            $scope.suppliersLoaded = true;
            if ($scope.suppliers.length == 0) {
                $scope.suppliers.push({id: '', name: $filter('translate')('content.form.messages.SELECTSUPPLIER')});
                var def = $q.defer();
                $suppliersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[supplier.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTSUPPLIER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.suppliers = data.results;
                    def.resolve($scope.suppliers);
                    if (angular.isDefined($scope.supplierProduct)) {
                        $scope.supplierProduct.supplier = $scope.supplierProduct.supplier || $scope.suppliers[0].id;
                    }
                });
                return def;
            } else {
                return $scope.suppliers;
            }
        });
    };

    $scope.getSuppliers();

    $scope.categories = [];
    $scope.categoriesLoaded = false;

    $scope.getCategories = function() {
        $timeout(function(){
            $scope.categoriesLoaded = true;
            if ($scope.categories.length == 0) {
                $scope.categories.push({id: '', name: $filter('translate')('content.form.messages.SELECTCATEGORY')});
                var def = $q.defer();
                $categoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[category.status]': 'Online', 'order_by[category.name]': 'asc'}).$promise.then(function(data) {
                    data.results = $rootScope.createTree(data.results, 'parent_category', 'name', null, 0);
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTCATEGORY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.categories = data.results;
                    def.resolve($scope.categories);
                    if (angular.isDefined($scope.supplierProduct)) {
                        $scope.supplierProduct.category = $scope.supplierProduct.category || $scope.categories[0].id;
                    }
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
                $scope.users.push({id: '', username: $filter('translate')('content.form.messages.SELECTUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.supplierProduct)) {
                        $scope.supplierProduct.creator_user = $scope.supplierProduct.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();

    $scope.languages = [];
    $scope.languagesLoaded = [];

    $scope.getLanguages = function() {
        $timeout(function(){
            if ($scope.languages.length == 0) {
                $scope.languages.push({});
                var def = $q.defer();
                $languagesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[language.name]': 'asc'}).$promise.then(function(data) {
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

    $scope.languagesSearchText = '';
    $scope.supplierProductLanguages = false;
    $scope.$watch('supplierProductLanguages', function() {
        if (angular.isDefined($scope.supplierProduct)) {
            var languages = $filter('filter')($scope.languages, $scope.languagesSearchText);
            if ($scope.supplierProductLanguages) {
                for (var i in languages) {
                    var id = languages[i].id;
                    var index = $scope.supplierProduct.languages.indexOf(id);
                    if (index == -1) {
                        $scope.supplierProduct.languages.push(id);
                    }
                }
            } else {
                for (var i in languages) {
                    var id = languages[i].id;
                    var index = $scope.supplierProduct.languages.indexOf(id);
                    if (index > -1) {
                        $scope.supplierProduct.languages.splice(index, 1);
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
            if ($scope.supplierProduct.id > 0) {
                $scope.disableSubmit = true;
                $supplierProductsDataFactory.update($scope.supplierProduct).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SUPPLIERPRODUCTUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SUPPLIERPRODUCTNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $supplierProductsDataFactory.create($scope.supplierProduct).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SUPPLIERPRODUCTCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SUPPLIERPRODUCTNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.marketplace.supplierproducts');
    };
    
    $scope.supplier_product_supplier_readonly = false;
    $scope.supplier_product_category_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $supplierProductsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.supplierProduct = savable(data);
            });
        });
    } else {
        $scope.supplierProduct = {id: 0, status: 'Draft', languages: []};

        if (angular.isDefined($stateParams.supplier_product_supplier) && JSON.parse($stateParams.supplier_product_supplier) != null) {
            $scope.supplierProduct.supplier = $stateParams.supplier_product_supplier;
            $scope.supplier_product_supplier_readonly = true;
        }
        if (angular.isDefined($stateParams.supplier_product_category) && JSON.parse($stateParams.supplier_product_category) != null) {
            $scope.supplierProduct.category = $stateParams.supplier_product_category;
            $scope.supplier_product_category_readonly = true;
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
                    return $scope.supplierProduct[field];
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
            $scope.supplierProduct[field] = url;
        }, function () {
            
        });
    
    };

}]);

