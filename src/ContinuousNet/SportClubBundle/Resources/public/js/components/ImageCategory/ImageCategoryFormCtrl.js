'use strict';

/**
 * Controller for Image Category Form
 */

app.controller('ImageCategoryFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$imageTypesDataFactory', '$usersDataFactory', '$imageCategoriesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $imageTypesDataFactory, $usersDataFactory, $imageCategoriesDataFactory) {

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

    $scope.imageCategories = [];
    $scope.imageCategoriesLoaded = false;

    $scope.getParents = function() {
        $timeout(function(){
            $scope.imageCategoriesLoaded = true;
            if ($scope.imageCategories.length == 0) {
                $scope.imageCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPARENT')});
                var def = $q.defer();
                $imageCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[imageCategory.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.imageCategories = data.results;
                    def.resolve($scope.imageCategories);
                });
                return def;
            } else {
                return $scope.imageCategories;
            }
        });
    };

    $scope.getParents();

    $scope.imageTypes = [];
    $scope.imageTypesLoaded = false;

    $scope.getImageTypes = function() {
        $timeout(function(){
            $scope.imageTypesLoaded = true;
            if ($scope.imageTypes.length == 0) {
                $scope.imageTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTIMAGETYPE')});
                var def = $q.defer();
                $imageTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[imageType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.imageTypes = data.results;
                    def.resolve($scope.imageTypes);
                });
                return def;
            } else {
                return $scope.imageTypes;
            }
        });
    };

    $scope.getImageTypes();

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
            if ($scope.imageCategory.id > 0) {
                $scope.disableSubmit = true;
                $imageCategoriesDataFactory.update($scope.imageCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.IMAGECATEGORYUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.IMAGECATEGORYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $imageCategoriesDataFactory.create($scope.imageCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.IMAGECATEGORYCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.IMAGECATEGORYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.photos.imagecategories');
    };
    
    $scope.image_category_parent_readonly = false;
    $scope.image_category_image_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $imageCategoriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.imageCategory = savable(data);
            });
        });
    } else {
        $scope.imageCategory = {id: 0, status: 'Draft'};

        if (angular.isDefined($stateParams.image_category_parent) && JSON.parse($stateParams.image_category_parent) != null) {
            $scope.imageCategory.parent = $stateParams.image_category_parent;
            $scope.image_category_parent_readonly = true;
        }
        if (angular.isDefined($stateParams.image_category_image_type) && JSON.parse($stateParams.image_category_image_type) != null) {
            $scope.imageCategory.image_type = $stateParams.image_category_image_type;
            $scope.image_category_image_type_readonly = true;
        }
    }

    $scope.showFileManager = function(field) {
    
        var modalInstance = $uibModal.open({
            templateUrl: '/bundles/sportclub/js/common/FileManager/modal_content.html',
            controller: 'FileManagerCtrl',
            size: 'lg',
            resolve: {
                field: function() {
                    return field;
                },
                value: function() {
                    return $scope.imageCategory[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'imagecategories';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.imageCategory[field] = url;
        }, function () {
            
        });
    
    };

}]);

