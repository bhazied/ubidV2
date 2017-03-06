'use strict';

/**
 * Controller for Translation Post Form
 */

app.controller('TranslationPostFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$postsDataFactory', '$usersDataFactory', '$translationPostsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $postsDataFactory, $usersDataFactory, $translationPostsDataFactory) {

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


    $scope.posts = [];
    $scope.postsLoaded = false;

    $scope.getPosts = function() {
        $timeout(function(){
            $scope.postsLoaded = true;
            if ($scope.posts.length == 0) {
                $scope.posts.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOST')});
                var def = $q.defer();
                $postsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[post.title]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPOST')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.posts = data.results;
                    def.resolve($scope.posts);
                    if (angular.isDefined($scope.translationPost)) {
                        $scope.translationPost.post = $scope.translationPost.post || $scope.posts[0].id;
                    }
                });
                return def;
            } else {
                return $scope.posts;
            }
        });
    };

    $scope.getPosts();

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
                    if (angular.isDefined($scope.translationPost)) {
                        $scope.translationPost.creator_user = $scope.translationPost.creator_user || $scope.users[0].id;
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
            if ($scope.translationPost.id > 0) {
                $scope.disableSubmit = true;
                $translationPostsDataFactory.update($scope.translationPost).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPOSTUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPOSTNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $translationPostsDataFactory.create($scope.translationPost).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.TRANSLATIONPOSTCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.TRANSLATIONPOSTNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.translation.translationposts');
    };
    
    $scope.translation_post_post_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $translationPostsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.translationPost = savable(data);
            });
        });
    } else {
        $scope.translationPost = {id: 0};

        if (angular.isDefined($stateParams.translation_post_post) && JSON.parse($stateParams.translation_post_post) != null) {
            $scope.translationPost.post = $stateParams.translation_post_post;
            $scope.translation_post_post_readonly = true;
        }
    }

}]);

