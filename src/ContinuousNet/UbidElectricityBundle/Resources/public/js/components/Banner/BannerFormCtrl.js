'use strict';

/**
 * Controller for Banner Form
 */

app.controller('BannerFormCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$bannerTypesDataFactory', '$usersDataFactory', '$bannerPositionsDataFactory', '$bannersDataFactory',
function($scope, $rootScope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $bannerTypesDataFactory, $usersDataFactory, $bannerPositionsDataFactory, $bannersDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;
    $scope.enableFormAlert = true;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false,
        filebrowserBrowseUrl: '/elfinder/default/banners',
        filebrowserBrowseRouteParameters: {
            instance: 'default',
            homeFolder: 'banners',
            editor: 'ckeditor'
        },
        extraPlugins: 'colorbutton,colordialog,justify'
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };

    $scope.genders = [{
        id: null,
        title: $filter('translate')('content.common.NA'),
    }, {
        id: 'All',
        title: $filter('translate')('content.list.fields.genders.ALL'),
        css: 'primary'
    }, {
        id: 'Male',
        title: $filter('translate')('content.list.fields.genders.MALE'),
        css: 'success'
    }, {
        id: 'Female',
        title: $filter('translate')('content.list.fields.genders.FEMALE'),
        css: 'warning'
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
    $scope.bannerTypes = [];
    $scope.bannerTypesLoaded = false;

    $scope.getBannerTypes = function() {
        $timeout(function(){
            $scope.bannerTypesLoaded = true;
            if ($scope.bannerTypes.length == 0) {
                $scope.bannerTypes.push({id: '', name: $filter('translate')('content.form.messages.SELECTBANNERTYPE')});
                var def = $q.defer();
                $bannerTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[bannerType.name]': 'asc'}).$promise.then(function(data) {
                    data.results.unshift({id: null, name: $filter('translate')('content.form.messages.SELECTBANNERTYPE')});
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.bannerTypes = data.results;
                    def.resolve($scope.bannerTypes);
                    if (angular.isDefined($scope.banner)) {
                        $scope.banner.banner_type = $scope.banner.banner_type || $scope.bannerTypes[0].id;
                    }
                });
                return def;
            } else {
                return $scope.bannerTypes;
            }
        });
    };

    $scope.getBannerTypes();

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
                    if (angular.isDefined($scope.banner)) {
                        $scope.banner.creator_user = $scope.banner.creator_user || $scope.users[0].id;
                    }
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();

    $scope.bannerPositions = [];
    $scope.bannerPositionsLoaded = [];

    $scope.getBannerPositions = function() {
        $timeout(function(){
            if ($scope.bannerPositions.length == 0) {
                $scope.bannerPositions.push({});
                var def = $q.defer();
                $bannerPositionsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[bannerPosition.name]': 'asc'}).$promise.then(function(data) {
                    $scope.bannerPositions = data.results;
                    def.resolve($scope.bannerPositions);
                });
                return def;
            } else {
                return $scope.bannerPositions;
            }
        });
    };

    $scope.getBannerPositions();

    $scope.bannerPositionsSearchText = '';
    $scope.bannerBannerPositions = false;
    $scope.$watch('bannerBannerPositions', function() {
        if (angular.isDefined($scope.banner)) {
            var banner_positions = $filter('filter')($scope.bannerPositions, $scope.bannerPositionsSearchText);
            if ($scope.bannerBannerPositions) {
                for (var i in banner_positions) {
                    var id = banner_positions[i].id;
                    var index = $scope.banner.banner_positions.indexOf(id);
                    if (index == -1) {
                        $scope.banner.banner_positions.push(id);
                    }
                }
            } else {
                for (var i in banner_positions) {
                    var id = banner_positions[i].id;
                    var index = $scope.banner.banner_positions.indexOf(id);
                    if (index > -1) {
                        $scope.banner.banner_positions.splice(index, 1);
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
            if ($scope.banner.id > 0) {
                $scope.disableSubmit = true;
                $bannersDataFactory.update($scope.banner).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BANNERUPDATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BANNERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $bannersDataFactory.create($scope.banner).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.BANNERCREATED'));
                    if (redirect) {
                        $scope.list();
                    }
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.BANNERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.adserving.banners');
    };
    
    $scope.banner_banner_type_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $bannersDataFactory.get({locale: $localStorage.language, id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.banner = savable(data);
                if ($scope.banner.start_publishing != null) {
                    $scope.banner.start_publishing = new Date($scope.banner.start_publishing);
                }
                if ($scope.banner.end_publishing != null) {
                    $scope.banner.end_publishing = new Date($scope.banner.end_publishing);
                }
            });
        });
    } else {
        $scope.banner = {id: 0, gender: 'All', status: 'Draft', banner_positions: []};

        if (angular.isDefined($stateParams.banner_banner_type) && JSON.parse($stateParams.banner_banner_type) != null) {
            $scope.banner.banner_type = $stateParams.banner_banner_type;
            $scope.banner_banner_type_readonly = true;
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
                    return $scope.banner[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'banners';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.banner[field] = url;
        }, function () {
            
        });
    
    };

}]);

