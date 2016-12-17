'use strict';

/**
 * Controller for Video Category Form
 */

app.controller('VideoCategoryFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$videoTypesDataFactory', '$usersDataFactory', '$videoCategoriesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $videoTypesDataFactory, $usersDataFactory, $videoCategoriesDataFactory) {

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

    $scope.videoCategories = [];
    $scope.videoCategoriesLoaded = false;

    $scope.getParents = function() {
        $timeout(function(){
            $scope.videoCategoriesLoaded = true;
            if ($scope.videoCategories.length == 0) {
                $scope.videoCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPARENT')});
                var def = $q.defer();
                $videoCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[videoCategory.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.videoCategories = data.results;
                    def.resolve($scope.videoCategories);
                });
                return def;
            } else {
                return $scope.videoCategories;
            }
        });
    };

    $scope.getParents();

    $scope.videoTypes = [];
    $scope.videoTypesLoaded = false;

    $scope.getVideoTypes = function() {
        $timeout(function(){
            $scope.videoTypesLoaded = true;
            if ($scope.videoTypes.length == 0) {
                $scope.videoTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTVIDEOTYPE')});
                var def = $q.defer();
                $videoTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[videoType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.videoTypes = data.results;
                    def.resolve($scope.videoTypes);
                });
                return def;
            } else {
                return $scope.videoTypes;
            }
        });
    };

    $scope.getVideoTypes();

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
            if ($scope.videoCategory.id > 0) {
                $scope.disableSubmit = true;
                $videoCategoriesDataFactory.update($scope.videoCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.VIDEOCATEGORYUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.VIDEOCATEGORYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $videoCategoriesDataFactory.create($scope.videoCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.VIDEOCATEGORYCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.VIDEOCATEGORYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.webtv.videocategories');
    };
    
    $scope.video_category_parent_readonly = false;
    $scope.video_category_video_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $videoCategoriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.videoCategory = savable(data);
            });
        });
    } else {
        $scope.videoCategory = {id: 0, status: 'Draft'};

        if (angular.isDefined($stateParams.video_category_parent) && JSON.parse($stateParams.video_category_parent) != null) {
            $scope.videoCategory.parent = $stateParams.video_category_parent;
            $scope.video_category_parent_readonly = true;
        }
        if (angular.isDefined($stateParams.video_category_video_type) && JSON.parse($stateParams.video_category_video_type) != null) {
            $scope.videoCategory.video_type = $stateParams.video_category_video_type;
            $scope.video_category_video_type_readonly = true;
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
                    return $scope.videoCategory[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'videocategories';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.videoCategory[field] = url;
        }, function () {
            
        });
    
    };

}]);

