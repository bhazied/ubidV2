'use strict';

/**
 * Controller for Bid Product Form
 */

app.controller('BidProductFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tenderProductsDataFactory', '$bidsDataFactory', '$supplierProductsDataFactory', '$usersDataFactory', '$bidProductsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tenderProductsDataFactory, $bidsDataFactory, $supplierProductsDataFactory, $usersDataFactory, $bidProductsDataFactory) {

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


    $scope.tenderProducts = [];
    $scope.tenderProductsLoaded = false;

    $scope.getTenderProducts = function() {
        $timeout(function(){
            $scope.tenderProductsLoaded = true;
            if ($scope.tenderProducts.length == 0) {
                $scope.tenderProducts.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDERPRODUCT')});
                var def = $q.defer();
                $tenderProductsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[tenderProduct.title]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTTENDERPRODUCT')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tenderProducts = data.results;
                    def.resolve($scope.tenderProducts);
                    if (angular.isDefined($scope.bidProduct)) {
                        $scope.bidProduct.tender_product = $scope.bidProduct.tender_product || $scope.tenderProducts[0].id;
                    }
                });
                return def;
            } else {
                return $scope.tenderProducts;
            }
        });
    };

    $scope.getTenderProducts();

    $scope.bids = [];
    $scope.bidsLoaded = false;

    $scope.getBids = function() {
        $timeout(function(){
            $scope.bidsLoaded = true;
            if ($scope.bids.length == 0) {
                $scope.bids.push({id: '', title: $filter('translate')('content.form.messages.SELECTBID')});
                var def = $q.defer();
                $bidsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[bid.title]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTBID')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.bids = data.results;
                    def.resolve($scope.bids);
                    if (angular.isDefined($scope.bidProduct)) {
                        $scope.bidProduct.bid = $scope.bidProduct.bid || $scope.bids[0].id;
                    }
                });
                return def;
            } else {
                return $scope.bids;
            }
        });
    };

    $scope.getBids();

    $scope.supplierProducts = [];
    $scope.supplierProductsLoaded = false;

    $scope.getSupplierProducts = function() {
        $timeout(function(){
            $scope.supplierProductsLoaded = true;
            if ($scope.supplierProducts.length == 0) {
                $scope.supplierProducts.push({id: '', title: $filter('translate')('content.form.messages.SELECTSUPPLIERPRODUCT')});
                var def = $q.defer();
                $supplierProductsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[supplierProduct.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTSUPPLIERPRODUCT')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.supplierProducts = data.results;
                    def.resolve($scope.supplierProducts);
                    if (angular.isDefined($scope.bidProduct)) {
                        $scope.bidProduct.supplier_product = $scope.bidProduct.supplier_product || $scope.supplierProducts[0].id;
                    }
                });
                return def;
            } else {
                return $scope.supplierProducts;
            }
        });
    };

    $scope.getSupplierProducts();

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
                    if (angular.isDefined($scope.bidProduct)) {
                        $scope.bidProduct.creator_user = $scope.bidProduct.creator_user || $scope.users[0].id;
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
            if ($scope.bidProduct.id > 0) {
                $scope.disableSubmit = true;
                $bidProductsDataFactory.update($scope.bidProduct).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BIDPRODUCTUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BIDPRODUCTNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $bidProductsDataFactory.create($scope.bidProduct).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BIDPRODUCTCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BIDPRODUCTNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.marketplace.bidproducts');
    };
    
    $scope.bid_product_tender_product_readonly = false;
    $scope.bid_product_bid_readonly = false;
    $scope.bid_product_supplier_product_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $bidProductsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.bidProduct = savable(data);
            });
        });
    } else {
        $scope.bidProduct = {id: 0};

        if (angular.isDefined($stateParams.bid_product_tender_product) && JSON.parse($stateParams.bid_product_tender_product) != null) {
            $scope.bidProduct.tender_product = $stateParams.bid_product_tender_product;
            $scope.bid_product_tender_product_readonly = true;
        }
        if (angular.isDefined($stateParams.bid_product_bid) && JSON.parse($stateParams.bid_product_bid) != null) {
            $scope.bidProduct.bid = $stateParams.bid_product_bid;
            $scope.bid_product_bid_readonly = true;
        }
        if (angular.isDefined($stateParams.bid_product_supplier_product) && JSON.parse($stateParams.bid_product_supplier_product) != null) {
            $scope.bidProduct.supplier_product = $stateParams.bid_product_supplier_product;
            $scope.bid_product_supplier_product_readonly = true;
        }
    }

}]);

