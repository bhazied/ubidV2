'use strict';

/**
 * Controller for Post Category Form
 */

app.controller('PostCategoryFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$postTypesDataFactory', '$usersDataFactory', '$postCategoriesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $postTypesDataFactory, $usersDataFactory, $postCategoriesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/postcategories',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'postcategories',
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

    $scope.postCategories = [];
    $scope.postCategoriesLoaded = false;

    $scope.getPostCategories = function() {
        $timeout(function(){
            $scope.postCategoriesLoaded = true;
            if ($scope.postCategories.length == 0) {
                $scope.postCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTCATEGORY')});
                var def = $q.defer();
                $postCategoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[postCategory.name]': 'asc'}).$promise.then(function(data) {
                    data.results = $rootScope.createTree(data.results, 'parent_post_category', 'name', null, 0);
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPOSTCATEGORY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.postCategories = data.results;
                    def.resolve($scope.postCategories);
                    if (angular.isDefined($scope.postCategory)) {
                        $scope.postCategory.parent_post_category = $scope.postCategory.parent_post_category || $scope.postCategories[0].id;
                    }
                });
                return def;
            } else {
                return $scope.postCategories;
            }
        });
    };

    $scope.getPostCategories();

    $scope.postTypes = [];
    $scope.postTypesLoaded = false;

    $scope.getPostTypes = function() {
        $timeout(function(){
            $scope.postTypesLoaded = true;
            if ($scope.postTypes.length == 0) {
                $scope.postTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTTYPE')});
                var def = $q.defer();
                $postTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[postType.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPOSTTYPE')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.postTypes = data.results;
                    def.resolve($scope.postTypes);
                    if (angular.isDefined($scope.postCategory)) {
                        $scope.postCategory.post_type = $scope.postCategory.post_type || $scope.postTypes[0].id;
                    }
                });
                return def;
            } else {
                return $scope.postTypes;
            }
        });
    };

    $scope.getPostTypes();

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
                    if (angular.isDefined($scope.postCategory)) {
                        $scope.postCategory.creator_user = $scope.postCategory.creator_user || $scope.users[0].id;
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
            if ($scope.postCategory.id > 0) {
                $scope.disableSubmit = true;
                $postCategoriesDataFactory.update($scope.postCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.POSTCATEGORYUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.POSTCATEGORYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $postCategoriesDataFactory.create($scope.postCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.POSTCATEGORYCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.POSTCATEGORYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.news.postcategories');
    };
    
    $scope.post_category_parent_post_category_readonly = false;
    $scope.post_category_post_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $postCategoriesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.postCategory = savable(data);
            });
        });
    } else {
        $scope.postCategory = {id: 0, status: 'Draft'};

        if (angular.isDefined($stateParams.post_category_parent_post_category) && JSON.parse($stateParams.post_category_parent_post_category) != null) {
            $scope.postCategory.parent_post_category = $stateParams.post_category_parent_post_category;
            $scope.post_category_parent_post_category_readonly = true;
        }
        if (angular.isDefined($stateParams.post_category_post_type) && JSON.parse($stateParams.post_category_post_type) != null) {
            $scope.postCategory.post_type = $stateParams.post_category_post_type;
            $scope.post_category_post_type_readonly = true;
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
                    return $scope.postCategory[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'postcategories';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.postCategory[field] = url;
        }, function () {
            
        });
    
    };

}]);

