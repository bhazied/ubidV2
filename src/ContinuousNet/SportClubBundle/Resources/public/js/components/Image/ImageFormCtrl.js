'use strict';

/**
 * Controller for Image Form
 */

app.controller('ImageFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$imageTypesDataFactory', '$pricesDataFactory', '$sharingsDataFactory', '$galleriesDataFactory', '$usersDataFactory', '$imageCategoriesDataFactory', '$imagesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $imageTypesDataFactory, $pricesDataFactory, $sharingsDataFactory, $galleriesDataFactory, $usersDataFactory, $imageCategoriesDataFactory, $imagesDataFactory) {

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

    $scope.galleries = [];
    $scope.galleriesLoaded = false;

    $scope.getGalleries = function() {
        $timeout(function(){
            $scope.galleriesLoaded = true;
            if ($scope.galleries.length == 0) {
                $scope.galleries.push({id: '', title: $filter('translate')('content.form.messages.SELECTGALLERY')});
                var def = $q.defer();
                $galleriesDataFactory.query({offset: 0, limit: 10000, 'order_by[gallery.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    data.results.push({
                        id: -1,
                        name: $filter('translate')('content.common.CREATENEW'),
                        hidden: false
                    });
                    $scope.galleries = data.results;
                    def.resolve($scope.galleries);
                });
                return def;
            } else {
                return $scope.galleries;
            }
        });
    };

    $scope.getGalleries();

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

    $scope.imageCategories = [];
    $scope.imageCategoriesLoaded = [];

    $scope.getImageCategories = function() {
        $timeout(function(){
            if ($scope.imageCategories.length == 0) {
                $scope.imageCategories.push({});
                var def = $q.defer();
                $imageCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[imageCategory.name]': 'asc'}).$promise.then(function(data) {
                    $scope.imageCategories = data.results;
                    def.resolve($scope.imageCategories);
                });
                return def;
            } else {
                return $scope.imageCategories;
            }
        });
    };

    $scope.getImageCategories();

    $scope.imageImageCategories = false;
    $scope.$watch('imageImageCategories', function() {
        if (angular.isDefined($scope.image)) {
            if ($scope.imageImageCategories) {
                $scope.image.image_categories = [];
                for (var i in $scope.imageCategories) {
                    $scope.image.image_categories.push($scope.imageCategories[i].id);
                }
            } else {
                $scope.image.image_categories = [];
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
            if ($scope.image.id > 0) {
                $scope.disableSubmit = true;
                $imagesDataFactory.update($scope.image).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.IMAGEUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.IMAGENOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $imagesDataFactory.create($scope.image).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.IMAGECREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.IMAGENOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.photos.images');
    };
    
    $scope.image_image_type_readonly = false;
    $scope.image_price_readonly = false;
    $scope.image_sharing_readonly = false;
    $scope.image_gallery_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $imagesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.image = savable(data);
                if ($scope.image.start_publishing != null) {
                    $scope.image.start_publishing = new Date($scope.image.start_publishing);
                }
                if ($scope.image.end_publishing != null) {
                    $scope.image.end_publishing = new Date($scope.image.end_publishing);
                }
            });
        });
    } else {
        $scope.image = {id: 0, status: 'Draft', image_categories: []};

        if (angular.isDefined($stateParams.image_image_type) && JSON.parse($stateParams.image_image_type) != null) {
            $scope.image.image_type = $stateParams.image_image_type;
            $scope.image_image_type_readonly = true;
        }
        if (angular.isDefined($stateParams.image_price) && JSON.parse($stateParams.image_price) != null) {
            $scope.image.price = $stateParams.image_price;
            $scope.image_price_readonly = true;
        }
        if (angular.isDefined($stateParams.image_sharing) && JSON.parse($stateParams.image_sharing) != null) {
            $scope.image.sharing = $stateParams.image_sharing;
            $scope.image_sharing_readonly = true;
        }
        if (angular.isDefined($stateParams.image_gallery) && JSON.parse($stateParams.image_gallery) != null) {
            $scope.image.gallery = $stateParams.image_gallery;
            $scope.image_gallery_readonly = true;
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
                    return $scope.image[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'images';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.image[field] = url;
        }, function () {
            
        });
    
    };

}]);

