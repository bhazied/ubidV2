'use strict';

/**
 * Controller for Post Form
 */

app.controller('PostFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$postTypesDataFactory', '$usersDataFactory', '$postCategoriesDataFactory', '$postsDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $postTypesDataFactory, $usersDataFactory, $postCategoriesDataFactory, $postsDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/posts',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'posts',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };

    $scope.startPublishingOpened = false;
    $scope.startPublishingToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startPublishingOpened = !$scope.startPublishingOpened;
    };

    $scope.endPublishingOpened = false;
    $scope.endPublishingToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endPublishingOpened = !$scope.endPublishingOpened;
    };

    $scope.publishDateOpened = false;
    $scope.publishDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.publishDateOpened = !$scope.publishDateOpened;
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

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');
    $scope.minDate = new Date(1900, 0, 1);
    $scope.maxDate = new Date(2050, 11, 31);
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1));
    };
    $scope.postTypes = [];
    $scope.postTypesLoaded = false;

    $scope.getPostTypes = function() {
        $timeout(function(){
            $scope.postTypesLoaded = true;
            if ($scope.postTypes.length == 0) {
                $scope.postTypes.push({id: '', name: $filter('translate')('content.form.messages.SELECTPOSTTYPE')});
                var def = $q.defer();
                $postTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[postType.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTPOSTTYPE')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.postTypes = data.results;
                    def.resolve($scope.postTypes);
                    if (angular.isDefined($scope.post)) {
                        $scope.post.post_type = $scope.post.post_type || $scope.postTypes[0].id;
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
                $scope.users.push({id: '', username: $filter('translate')('content.form.messages.SELECTUSER')});
                var def = $q.defer();
                $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTUSER')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                    if (angular.isDefined($scope.post)) {
                        $scope.post.creator_user = $scope.post.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();

    $scope.postCategories = [];
    $scope.postCategoriesLoaded = [];

    $scope.getPostCategories = function() {
        $timeout(function(){
            if ($scope.postCategories.length == 0) {
                $scope.postCategories.push({});
                var def = $q.defer();
                $postCategoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[postCategory.name]': 'asc'}).$promise.then(function(data) {
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

    $scope.postCategoriesSearchText = '';
    $scope.postPostCategories = false;
    $scope.$watch('postPostCategories', function() {
        if (angular.isDefined($scope.post)) {
            var post_categories = $filter('filter')($scope.postCategories, $scope.postCategoriesSearchText);
            if ($scope.postPostCategories) {
                for (var i in post_categories) {
                    var id = post_categories[i].id;
                    var index = $scope.post.post_categories.indexOf(id);
                    if (index == -1) {
                        $scope.post.post_categories.push(id);
                    }
                }
            } else {
                for (var i in post_categories) {
                    var id = post_categories[i].id;
                    var index = $scope.post.post_categories.indexOf(id);
                    if (index > -1) {
                        $scope.post.post_categories.splice(index, 1);
                    }
                }
            }
        }
    });

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
            if ($scope.post.id > 0) {
                $scope.disableSubmit = true;
                $postsDataFactory.update($scope.post).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.POSTUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.POSTNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $postsDataFactory.create($scope.post).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.POSTCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.POSTNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.news.posts');
    };
    
    $scope.post_post_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $postsDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.post = savable(data);
                if ($scope.post.start_publishing != null) {
                    $scope.post.start_publishing = new Date($scope.post.start_publishing);
                }
                if ($scope.post.end_publishing != null) {
                    $scope.post.end_publishing = new Date($scope.post.end_publishing);
                }
                if ($scope.post.publish_date != null) {
                    $scope.post.publish_date = new Date($scope.post.publish_date);
                }
            });
        });
    } else {
        $scope.post = {id: 0, publish_date: new Date(), status: 'Draft', post_categories: []};

        if (angular.isDefined($stateParams.post_post_type) && JSON.parse($stateParams.post_post_type) != null) {
            $scope.post.post_type = $stateParams.post_post_type;
            $scope.post_post_type_readonly = true;
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
                    return $scope.post[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'posts';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.post[field] = url;
        }, function () {
            
        });
    
    };

}]);

