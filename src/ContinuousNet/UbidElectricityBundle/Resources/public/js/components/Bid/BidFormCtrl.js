'use strict';

/**
 * Controller for Bid Form
 */

app.controller('BidFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$tendersDataFactory', '$suppliersDataFactory', '$usersDataFactory', '$bidsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $tendersDataFactory, $suppliersDataFactory, $usersDataFactory, $bidsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/bids',
        filebrowserBrowseRouteParameters: {
            instance: 'data',
            homeFolder: 'bids',
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
    }, {
        id: 'Selected',
        title: $filter('translate')('content.list.fields.statuses.SELECTED'),
        css: 'primary'
    }, {
        id: 'Rejected',
        title: $filter('translate')('content.list.fields.statuses.REJECTED'),
        css: 'success'
    }, {
        id: 'Shortlisted',
        title: $filter('translate')('content.list.fields.statuses.SHORTLISTED'),
        css: 'warning'
    }, {
        id: 'Qualified',
        title: $filter('translate')('content.list.fields.statuses.QUALIFIED'),
        css: 'danger'
    }];

    $scope.tenders = [];
    $scope.tendersLoaded = false;

    $scope.getTenders = function() {
        $timeout(function(){
            $scope.tendersLoaded = true;
            if ($scope.tenders.length == 0) {
                $scope.tenders.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDER')});
                var def = $q.defer();
                $tendersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[tender.title]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTTENDER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tenders = data.results;
                    def.resolve($scope.tenders);
                    if (angular.isDefined($scope.bid)) {
                        $scope.bid.tender = $scope.bid.tender || $scope.tenders[0].id;
                    }
                });
                return def;
            } else {
                return $scope.tenders;
            }
        });
    };

    $scope.getTenders();

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
                    if (angular.isDefined($scope.bid)) {
                        $scope.bid.supplier = $scope.bid.supplier || $scope.suppliers[0].id;
                    }
                });
                return def;
            } else {
                return $scope.suppliers;
            }
        });
    };

    $scope.getSuppliers();

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
                    if (angular.isDefined($scope.bid)) {
                        $scope.bid.creator_user = $scope.bid.creator_user || $scope.users[0].id;
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
            if ($scope.bid.id > 0) {
                $scope.disableSubmit = true;
                $bidsDataFactory.update($scope.bid).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BIDUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BIDNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $bidsDataFactory.create($scope.bid).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BIDCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BIDNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.marketplace.bids');
    };
    
    $scope.bid_tender_readonly = false;
    $scope.bid_supplier_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $bidsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.bid = savable(data);
            });
        });
    } else {
        $scope.bid = {id: 0, status: 'Draft'};

        if (angular.isDefined($stateParams.bid_tender) && JSON.parse($stateParams.bid_tender) != null) {
            $scope.bid.tender = $stateParams.bid_tender;
            $scope.bid_tender_readonly = true;
        }
        if (angular.isDefined($stateParams.bid_supplier) && JSON.parse($stateParams.bid_supplier) != null) {
            $scope.bid.supplier = $stateParams.bid_supplier;
            $scope.bid_supplier_readonly = true;
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
                    return $scope.bid[field];
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
            $scope.bid[field] = url;
        }, function () {
            
        });
    
    };

}]);

