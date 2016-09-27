'use strict';

/**
 * Controller for Tender Category Form
 */

app.controller('TenderCategoryFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$productTypesDataFactory', '$usersDataFactory', '$tenderCategoriesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $productTypesDataFactory, $usersDataFactory, $tenderCategoriesDataFactory) {

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

    $scope.tenderCategories = [];
    $scope.tenderCategoriesLoaded = false;

    $scope.getParents = function() {
        $timeout(function(){
            $scope.tenderCategoriesLoaded = true;
            if ($scope.tenderCategories.length == 0) {
                $scope.tenderCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPARENT')});
                var def = $q.defer();
                $tenderCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[tenderCategory.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.tenderCategories = data.results;
                    def.resolve($scope.tenderCategories);
                });
                return def;
            } else {
                return $scope.tenderCategories;
            }
        });
    };

    $scope.getParents();

    $scope.productTypes = [];
    $scope.productTypesLoaded = false;

    $scope.getProductTypes = function() {
        $timeout(function(){
            $scope.productTypesLoaded = true;
            if ($scope.productTypes.length == 0) {
                $scope.productTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRODUCTTYPE')});
                var def = $q.defer();
                $productTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[productType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.productTypes = data.results;
                    def.resolve($scope.productTypes);
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
            if ($scope.tenderCategory.id > 0) {
                $scope.disableSubmit = true;
                $tenderCategoriesDataFactory.update($scope.tenderCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TENDERCATEGORYUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TENDERCATEGORYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $tenderCategoriesDataFactory.create($scope.tenderCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TENDERCATEGORYCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TENDERCATEGORYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.tenders.tendercategories');
    };
    
    if (angular.isDefined($stateParams.id)) {
        $tenderCategoriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.tenderCategory = savable(data);
            });
        });
    } else {
        $scope.tenderCategory = {id: 0, status: 'Draft'};

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
                    return $scope.tenderCategory[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'tendercategories';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.tenderCategory[field] = url;
        }, function () {
            
        });
    
    };

}]);

