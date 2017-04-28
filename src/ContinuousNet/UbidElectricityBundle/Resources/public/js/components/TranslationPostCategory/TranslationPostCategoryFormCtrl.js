'use strict';

/**
 * Controller for Translation Post Category Form
 */

app.controller('TranslationPostCategoryFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$postCategoriesDataFactory', '$usersDataFactory', '$translationPostCategoriesDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $postCategoriesDataFactory, $usersDataFactory, $translationPostCategoriesDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/translationpostcategories',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'translationpostcategories',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.postCategories = [];
    $scope.postCategoriesLoaded = false;

    $scope.getPostCategories = function() {
        $timeout(function(){
            $scope.postCategoriesLoaded = true;
            if ($scope.postCategories.length == 0) {
                $scope.postCategories.push({id: '', name: $filter('translate')('content.form.messages.SELECTPOSTCATEGORY')});
                var def = $q.defer();
                $postCategoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[postCategory.name]': 'asc'}).$promise.then(function(data) {
                    data.results = $rootScope.createTree(data.results, 'parent_post_category', 'name', null, 0);
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPOSTCATEGORY')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.postCategories = data.results;
                    def.resolve($scope.postCategories);
                    if (angular.isDefined($scope.translationPostCategory)) {
                        $scope.translationPostCategory.post_category = $scope.translationPostCategory.post_category || $scope.postCategories[0].id;
                    }
                });
                return def;
            } else {
                return $scope.postCategories;
            }
        });
    };

    $scope.getPostCategories();

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
                    if (angular.isDefined($scope.translationPostCategory)) {
                        $scope.translationPostCategory.creator_user = $scope.translationPostCategory.creator_user || $scope.users[0].id;
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
            if ($scope.translationPostCategory.id > 0) {
                $scope.disableSubmit = true;
                $translationPostCategoriesDataFactory.update($scope.translationPostCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPOSTCATEGORYUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPOSTCATEGORYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationPostCategoriesDataFactory.create($scope.translationPostCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPOSTCATEGORYCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPOSTCATEGORYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationpostcategories');
    };
    
    $scope.translation_post_category_post_category_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationPostCategoriesDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationPostCategory = savable(data);
            });
        });
    } else {
        $scope.translationPostCategory = {id: 0};

        if (angular.isDefined($stateParams.translation_post_category_post_category) && JSON.parse($stateParams.translation_post_category_post_category) != null) {
            $scope.translationPostCategory.post_category = $stateParams.translation_post_category_post_category;
            $scope.translation_post_category_post_category_readonly = true;
        }
    }

}]);

