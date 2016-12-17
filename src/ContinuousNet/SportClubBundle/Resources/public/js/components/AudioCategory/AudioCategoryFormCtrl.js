'use strict';

/**
 * Controller for Audio Category Form
 */

app.controller('AudioCategoryFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$audioTypesDataFactory', '$usersDataFactory', '$audioCategoriesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $audioTypesDataFactory, $usersDataFactory, $audioCategoriesDataFactory) {

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

    $scope.audioCategories = [];
    $scope.audioCategoriesLoaded = false;

    $scope.getParents = function() {
        $timeout(function(){
            $scope.audioCategoriesLoaded = true;
            if ($scope.audioCategories.length == 0) {
                $scope.audioCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPARENT')});
                var def = $q.defer();
                $audioCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[audioCategory.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.audioCategories = data.results;
                    def.resolve($scope.audioCategories);
                });
                return def;
            } else {
                return $scope.audioCategories;
            }
        });
    };

    $scope.getParents();

    $scope.audioTypes = [];
    $scope.audioTypesLoaded = false;

    $scope.getAudioTypes = function() {
        $timeout(function(){
            $scope.audioTypesLoaded = true;
            if ($scope.audioTypes.length == 0) {
                $scope.audioTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTAUDIOTYPE')});
                var def = $q.defer();
                $audioTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[audioType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.audioTypes = data.results;
                    def.resolve($scope.audioTypes);
                });
                return def;
            } else {
                return $scope.audioTypes;
            }
        });
    };

    $scope.getAudioTypes();

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
            if ($scope.audioCategory.id > 0) {
                $scope.disableSubmit = true;
                $audioCategoriesDataFactory.update($scope.audioCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.AUDIOCATEGORYUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.AUDIOCATEGORYNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $audioCategoriesDataFactory.create($scope.audioCategory).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.AUDIOCATEGORYCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.AUDIOCATEGORYNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.webradio.audiocategories');
    };
    
    $scope.audio_category_parent_readonly = false;
    $scope.audio_category_audio_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $audioCategoriesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.audioCategory = savable(data);
            });
        });
    } else {
        $scope.audioCategory = {id: 0, status: 'Draft'};

        if (angular.isDefined($stateParams.audio_category_parent) && JSON.parse($stateParams.audio_category_parent) != null) {
            $scope.audioCategory.parent = $stateParams.audio_category_parent;
            $scope.audio_category_parent_readonly = true;
        }
        if (angular.isDefined($stateParams.audio_category_audio_type) && JSON.parse($stateParams.audio_category_audio_type) != null) {
            $scope.audioCategory.audio_type = $stateParams.audio_category_audio_type;
            $scope.audio_category_audio_type_readonly = true;
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
                    return $scope.audioCategory[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'audiocategories';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.audioCategory[field] = url;
        }, function () {
            
        });
    
    };

}]);

