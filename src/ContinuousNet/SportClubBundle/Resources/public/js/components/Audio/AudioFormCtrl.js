'use strict';

/**
 * Controller for Audio Form
 */

app.controller('AudioFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$audioTypesDataFactory', '$pricesDataFactory', '$sharingsDataFactory', '$albumsDataFactory', '$usersDataFactory', '$audioCategoriesDataFactory', '$audiosDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $audioTypesDataFactory, $pricesDataFactory, $sharingsDataFactory, $albumsDataFactory, $usersDataFactory, $audioCategoriesDataFactory, $audiosDataFactory) {

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

    $scope.albums = [];
    $scope.albumsLoaded = false;

    $scope.getAlbums = function() {
        $timeout(function(){
            $scope.albumsLoaded = true;
            if ($scope.albums.length == 0) {
                $scope.albums.push({id: '', title: $filter('translate')('content.form.messages.SELECTALBUM')});
                var def = $q.defer();
                $albumsDataFactory.query({offset: 0, limit: 10000, 'order_by[album.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.albums = data.results;
                    def.resolve($scope.albums);
                });
                return def;
            } else {
                return $scope.albums;
            }
        });
    };

    $scope.getAlbums();

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

    $scope.audioCategories = [];
    $scope.audioCategoriesLoaded = [];

    $scope.getAudioCategories = function() {
        $timeout(function(){
            if ($scope.audioCategories.length == 0) {
                $scope.audioCategories.push({});
                var def = $q.defer();
                $audioCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[audioCategory.name]': 'asc'}).$promise.then(function(data) {
                    $scope.audioCategories = data.results;
                    def.resolve($scope.audioCategories);
                });
                return def;
            } else {
                return $scope.audioCategories;
            }
        });
    };

    $scope.getAudioCategories();

    $scope.audioAudioCategories = false;
    $scope.$watch('audioAudioCategories', function() {
        if (angular.isDefined($scope.audio)) {
            if ($scope.audioAudioCategories) {
                $scope.audio.audio_categories = [];
                for (var i in $scope.audioCategories) {
                    $scope.audio.audio_categories.push($scope.audioCategories[i].id);
                }
            } else {
                $scope.audio.audio_categories = [];
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
            if ($scope.audio.id > 0) {
                $scope.disableSubmit = true;
                $audiosDataFactory.update($scope.audio).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.AUDIOUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.AUDIONOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $audiosDataFactory.create($scope.audio).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.AUDIOCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.AUDIONOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.webradio.audios');
    };
    
    $scope.audio_audio_type_readonly = false;
    $scope.audio_price_readonly = false;
    $scope.audio_sharing_readonly = false;
    $scope.audio_album_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $audiosDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.audio = savable(data);
                if ($scope.audio.start_publishing != null) {
                    $scope.audio.start_publishing = new Date($scope.audio.start_publishing);
                }
                if ($scope.audio.end_publishing != null) {
                    $scope.audio.end_publishing = new Date($scope.audio.end_publishing);
                }
            });
        });
    } else {
        $scope.audio = {id: 0, status: 'Draft', audio_categories: []};

        if (angular.isDefined($stateParams.audio_audio_type) && JSON.parse($stateParams.audio_audio_type) != null) {
            $scope.audio.audio_type = $stateParams.audio_audio_type;
            $scope.audio_audio_type_readonly = true;
        }
        if (angular.isDefined($stateParams.audio_price) && JSON.parse($stateParams.audio_price) != null) {
            $scope.audio.price = $stateParams.audio_price;
            $scope.audio_price_readonly = true;
        }
        if (angular.isDefined($stateParams.audio_sharing) && JSON.parse($stateParams.audio_sharing) != null) {
            $scope.audio.sharing = $stateParams.audio_sharing;
            $scope.audio_sharing_readonly = true;
        }
        if (angular.isDefined($stateParams.audio_album) && JSON.parse($stateParams.audio_album) != null) {
            $scope.audio.album = $stateParams.audio_album;
            $scope.audio_album_readonly = true;
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
                    return $scope.audio[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'audios';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.audio[field] = url;
        }, function () {
            
        });
    
    };

}]);

