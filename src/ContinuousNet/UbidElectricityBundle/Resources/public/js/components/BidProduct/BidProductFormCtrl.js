'use strict';

/**
 * Controller for Bid Product Form
 */

app.controller('BidProductFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tenderProductsDataFactory', '$bidsDataFactory', '$usersDataFactory', '$bidProductsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tenderProductsDataFactory, $bidsDataFactory, $usersDataFactory, $bidProductsDataFactory) {

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

    $scope.tenderProducts = [];
    $scope.tenderProductsLoaded = false;

    $scope.getTenderProducts = function() {
        $timeout(function(){
            $scope.tenderProductsLoaded = true;
            if ($scope.tenderProducts.length == 0) {
                $scope.tenderProducts.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDERPRODUCT')});
                var def = $q.defer();
                $tenderProductsDataFactory.query({offset: 0, limit: 10000, 'order_by[tenderProduct.title]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tenderProducts = data.results;
                    def.resolve($scope.tenderProducts);
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
                $bidsDataFactory.query({offset: 0, limit: 10000, 'order_by[bid.title]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.bids = data.results;
                    def.resolve($scope.bids);
                });
                return def;
            } else {
                return $scope.bids;
            }
        });
    };

    $scope.getBids();

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
            if ($scope.bidProduct.id > 0) {
                $scope.disableSubmit = true;
                $bidProductsDataFactory.update($scope.bidProduct).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BIDPRODUCTUPDATED'));
                    $scope.list();
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
                    $scope.list();
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
    
    if (angular.isDefined($stateParams.id)) {
        $bidProductsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.bidProduct = savable(data);
            });
        });
    } else {
        $scope.bidProduct = {id: 0, status: 'Draft'};

    }

}]);

