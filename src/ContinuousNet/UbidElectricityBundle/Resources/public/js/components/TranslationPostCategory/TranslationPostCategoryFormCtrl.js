'use strict';

/**
 * Controller for Translation Post Category Form
 */

app.controller('TranslationPostCategoryFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$postCategoriesDataFactory', '$usersDataFactory', '$translationPostCategoriesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $postCategoriesDataFactory, $usersDataFactory, $translationPostCategoriesDataFactory) {

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


    $scope.postCategories = [];
    $scope.postCategoriesLoaded = false;

    $scope.getPostCategories = function() {
        $timeout(function(){
            $scope.postCategoriesLoaded = true;
            if ($scope.postCategories.length == 0) {
                $scope.postCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTCATEGORY')});
                var def = $q.defer();
                $postCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[postCategory.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.postCategories = data.results;
                    def.resolve($scope.postCategories);
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
            if ($scope.translationPostCategory.id > 0) {
                $scope.disableSubmit = true;
                $translationPostCategoriesDataFactory.update($scope.translationPostCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPOSTCATEGORYUPDATED'));
                    $scope.list();
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
                    $scope.list();
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
        $translationPostCategoriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
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

