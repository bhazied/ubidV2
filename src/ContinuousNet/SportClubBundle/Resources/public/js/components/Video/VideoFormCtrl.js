'use strict';

/**
 * Controller for Video Form
 */

app.controller('VideoFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$videoTypesDataFactory', '$pricesDataFactory', '$sharingsDataFactory', '$showsDataFactory', '$usersDataFactory', '$videoCategoriesDataFactory', '$videosDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $videoTypesDataFactory, $pricesDataFactory, $sharingsDataFactory, $showsDataFactory, $usersDataFactory, $videoCategoriesDataFactory, $videosDataFactory) {

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

    $scope.prices = [];
    $scope.pricesLoaded = false;

    $scope.getPrices = function() {
        $timeout(function(){
            $scope.pricesLoaded = true;
            if ($scope.prices.length == 0) {
                $scope.prices.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRICE')});
                var def = $q.defer();
                $pricesDataFactory.query({offset: 0, limit: 10000, 'order_by[price.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.prices = data.results;
                    def.resolve($scope.prices);
                });
                return def;
            } else {
                return $scope.prices;
            }
        });
    };

    $scope.getPrices();

    $scope.sharings = [];
    $scope.sharingsLoaded = false;

    $scope.getSharings = function() {
        $timeout(function(){
            $scope.sharingsLoaded = true;
            if ($scope.sharings.length == 0) {
                $scope.sharings.push({id: '', title: $filter('translate')('content.form.messages.SELECTSHARING')});
                var def = $q.defer();
                $sharingsDataFactory.query({offset: 0, limit: 10000, 'order_by[sharing.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.sharings = data.results;
                    def.resolve($scope.sharings);
                });
                return def;
            } else {
                return $scope.sharings;
            }
        });
    };

    $scope.getSharings();

    $scope.shows = [];
    $scope.showsLoaded = false;

    $scope.getShows = function() {
        $timeout(function(){
            $scope.showsLoaded = true;
            if ($scope.shows.length == 0) {
                $scope.shows.push({id: '', title: $filter('translate')('content.form.messages.SELECTSHOW')});
                var def = $q.defer();
                $showsDataFactory.query({offset: 0, limit: 10000, 'order_by[show.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.shows = data.results;
                    def.resolve($scope.shows);
                });
                return def;
            } else {
                return $scope.shows;
            }
        });
    };

    $scope.getShows();

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

    $scope.videoCategories = [];
    $scope.videoCategoriesLoaded = [];

    $scope.getVideoCategories = function() {
        $timeout(function(){
            if ($scope.videoCategories.length == 0) {
                $scope.videoCategories.push({});
                var def = $q.defer();
                $videoCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[videoCategory.name]': 'asc'}).$promise.then(function(data) {
                    $scope.videoCategories = data.results;
                    def.resolve($scope.videoCategories);
                });
                return def;
            } else {
                return $scope.videoCategories;
            }
        });
    };

    $scope.getVideoCategories();

    $scope.videoVideoCategories = false;
    $scope.$watch('videoVideoCategories', function() {
        if (angular.isDefined($scope.video)) {
            if ($scope.videoVideoCategories) {
                $scope.video.video_categories = [];
                for (var i in $scope.videoCategories) {
                    $scope.video.video_categories.push($scope.videoCategories[i].id);
                }
            } else {
                $scope.video.video_categories = [];
            }
        }
    });

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
            if ($scope.video.id > 0) {
                $scope.disableSubmit = true;
                $videosDataFactory.update($scope.video).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.VIDEOUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.VIDEONOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $videosDataFactory.create($scope.video).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.VIDEOCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.VIDEONOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.webtv.videos');
    };
    
    $scope.video_video_type_readonly = false;
    $scope.video_price_readonly = false;
    $scope.video_sharing_readonly = false;
    $scope.video_show_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $videosDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.video = savable(data);
                if ($scope.video.start_publishing != null) {
                    $scope.video.start_publishing = new Date($scope.video.start_publishing);
                }
                if ($scope.video.end_publishing != null) {
                    $scope.video.end_publishing = new Date($scope.video.end_publishing);
                }
            });
        });
    } else {
        $scope.video = {id: 0, status: 'Draft', video_categories: []};

        if (angular.isDefined($stateParams.video_video_type) && JSON.parse($stateParams.video_video_type) != null) {
            $scope.video.video_type = $stateParams.video_video_type;
            $scope.video_video_type_readonly = true;
        }
        if (angular.isDefined($stateParams.video_price) && JSON.parse($stateParams.video_price) != null) {
            $scope.video.price = $stateParams.video_price;
            $scope.video_price_readonly = true;
        }
        if (angular.isDefined($stateParams.video_sharing) && JSON.parse($stateParams.video_sharing) != null) {
            $scope.video.sharing = $stateParams.video_sharing;
            $scope.video_sharing_readonly = true;
        }
        if (angular.isDefined($stateParams.video_show) && JSON.parse($stateParams.video_show) != null) {
            $scope.video.show = $stateParams.video_show;
            $scope.video_show_readonly = true;
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
                    return $scope.video[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'videos';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.video[field] = url;
        }, function () {
            
        });
    
    };

}]);

