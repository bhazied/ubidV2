'use strict';

/**
 * Controller for Push Notification Form
 */

app.controller('PushNotificationFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$matchesDataFactory', '$matchSubstitutionsDataFactory', '$matchGoalsDataFactory', '$postsDataFactory', '$videosDataFactory', '$audiosDataFactory', '$galleriesDataFactory', '$usersDataFactory', '$pushNotificationsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $matchesDataFactory, $matchSubstitutionsDataFactory, $matchGoalsDataFactory, $postsDataFactory, $videosDataFactory, $audiosDataFactory, $galleriesDataFactory, $usersDataFactory, $pushNotificationsDataFactory) {

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

    $scope.types = [{
        id: 'MatchConfirmed',
        title: $filter('translate')('content.list.fields.types.MATCHCONFIRMED'),
        css: 'primary'
    }, {
        id: '30MinutesBefore',
        title: $filter('translate')('content.list.fields.types.30MINUTESBEFORE'),
        css: 'success'
    }, {
        id: 'LineUpsConfirmed',
        title: $filter('translate')('content.list.fields.types.LINEUPSCONFIRMED'),
        css: 'warning'
    }, {
        id: 'StartHalfTimeFullTime',
        title: $filter('translate')('content.list.fields.types.STARTHALFTIMEFULLTIME'),
        css: 'danger'
    }, {
        id: 'Goals',
        title: $filter('translate')('content.list.fields.types.GOALS'),
        css: 'default'
    }, {
        id: 'Substitutions',
        title: $filter('translate')('content.list.fields.types.SUBSTITUTIONS'),
        css: 'info'
    }, {
        id: 'Promotions',
        title: $filter('translate')('content.list.fields.types.PROMOTIONS'),
        css: 'primary'
    }, {
        id: 'NewPost',
        title: $filter('translate')('content.list.fields.types.NEWPOST'),
        css: 'success'
    }, {
        id: 'NewVideo',
        title: $filter('translate')('content.list.fields.types.NEWVIDEO'),
        css: 'warning'
    }, {
        id: 'NewAudio',
        title: $filter('translate')('content.list.fields.types.NEWAUDIO'),
        css: 'danger'
    }, {
        id: 'NewPhotosGallery',
        title: $filter('translate')('content.list.fields.types.NEWPHOTOSGALLERY'),
        css: 'default'
    }];

    $scope.sendingTimeOpened = false;
    $scope.sendingTimeToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.sendingTimeOpened = !$scope.sendingTimeOpened;
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
    $scope.matches = [];
    $scope.matchesLoaded = false;

    $scope.getMatches = function() {
        $timeout(function(){
            $scope.matchesLoaded = true;
            if ($scope.matches.length == 0) {
                $scope.matches.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCH')});
                var def = $q.defer();
                $matchesDataFactory.query({offset: 0, limit: 10000, 'order_by[match.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.matches = data.results;
                    def.resolve($scope.matches);
                });
                return def;
            } else {
                return $scope.matches;
            }
        });
    };

    $scope.getMatches();

    $scope.changeMatch = function() {
        for (var i=0;i<$scope.match_goals.length;i++) {
            for (var j=0;j<$scope.matches.length;j++) {
                if ($scope.matches[j].id == $scope.pushNotification.match) {
                    if (($scope.match_goals[i].match != null && $scope.match_goals[i].match.id == $scope.matches[j].id)) {
                        $scope.match_goals[i].hidden = false;
                    } else {
                        $scope.match_goals[i].hidden = true;
                    }
                }
            }
        }
        for (var i=0;i<$scope.match_substitutions.length;i++) {
            for (var j=0;j<$scope.matches.length;j++) {
                if ($scope.matches[j].id == $scope.pushNotification.match) {
                    if (($scope.match_substitutions[i].match != null && $scope.match_substitutions[i].match.id == $scope.matches[j].id)) {
                        $scope.match_substitutions[i].hidden = false;
                    } else {
                        $scope.match_substitutions[i].hidden = true;
                    }
                }
            }
        }
    };
    
    $scope.matchSubstitutions = [];
    $scope.matchSubstitutionsLoaded = false;

    $scope.getMatchSubstitutions = function() {
        $timeout(function(){
            $scope.matchSubstitutionsLoaded = true;
            if ($scope.matchSubstitutions.length == 0) {
                $scope.matchSubstitutions.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCHSUBSTITUTION')});
                var def = $q.defer();
                $matchSubstitutionsDataFactory.query({offset: 0, limit: 10000, 'order_by[matchSubstitution.id]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.matchSubstitutions = data.results;
                    def.resolve($scope.matchSubstitutions);
                });
                return def;
            } else {
                return $scope.matchSubstitutions;
            }
        });
    };

    $scope.getMatchSubstitutions();

    $scope.matchGoals = [];
    $scope.matchGoalsLoaded = false;

    $scope.getMatchGoals = function() {
        $timeout(function(){
            $scope.matchGoalsLoaded = true;
            if ($scope.matchGoals.length == 0) {
                $scope.matchGoals.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCHGOAL')});
                var def = $q.defer();
                $matchGoalsDataFactory.query({offset: 0, limit: 10000, 'order_by[matchGoal.id]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.matchGoals = data.results;
                    def.resolve($scope.matchGoals);
                });
                return def;
            } else {
                return $scope.matchGoals;
            }
        });
    };

    $scope.getMatchGoals();

    $scope.posts = [];
    $scope.postsLoaded = false;

    $scope.getPosts = function() {
        $timeout(function(){
            $scope.postsLoaded = true;
            if ($scope.posts.length == 0) {
                $scope.posts.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOST')});
                var def = $q.defer();
                $postsDataFactory.query({offset: 0, limit: 10000, 'order_by[post.title]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.posts = data.results;
                    def.resolve($scope.posts);
                });
                return def;
            } else {
                return $scope.posts;
            }
        });
    };

    $scope.getPosts();

    $scope.videos = [];
    $scope.videosLoaded = false;

    $scope.getVideos = function() {
        $timeout(function(){
            $scope.videosLoaded = true;
            if ($scope.videos.length == 0) {
                $scope.videos.push({id: '', title: $filter('translate')('content.form.messages.SELECTVIDEO')});
                var def = $q.defer();
                $videosDataFactory.query({offset: 0, limit: 10000, 'order_by[video.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.videos = data.results;
                    def.resolve($scope.videos);
                });
                return def;
            } else {
                return $scope.videos;
            }
        });
    };

    $scope.getVideos();

    $scope.audios = [];
    $scope.audiosLoaded = false;

    $scope.getAudios = function() {
        $timeout(function(){
            $scope.audiosLoaded = true;
            if ($scope.audios.length == 0) {
                $scope.audios.push({id: '', title: $filter('translate')('content.form.messages.SELECTAUDIO')});
                var def = $q.defer();
                $audiosDataFactory.query({offset: 0, limit: 10000, 'order_by[audio.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.audios = data.results;
                    def.resolve($scope.audios);
                });
                return def;
            } else {
                return $scope.audios;
            }
        });
    };

    $scope.getAudios();

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
            if ($scope.pushNotification.id > 0) {
                $scope.disableSubmit = true;
                $pushNotificationsDataFactory.update($scope.pushNotification).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PUSHNOTIFICATIONUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PUSHNOTIFICATIONNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $pushNotificationsDataFactory.create($scope.pushNotification).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PUSHNOTIFICATIONCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PUSHNOTIFICATIONNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.mobile.pushnotifications');
    };
    
    $scope.push_notification_match_readonly = false;
    $scope.push_notification_match_substitution_readonly = false;
    $scope.push_notification_match_goal_readonly = false;
    $scope.push_notification_post_readonly = false;
    $scope.push_notification_video_readonly = false;
    $scope.push_notification_audio_readonly = false;
    $scope.push_notification_gallery_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $pushNotificationsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.pushNotification = savable(data);
                if ($scope.pushNotification.sending_time != null) {
                    $scope.pushNotification.sending_time = new Date($scope.pushNotification.sending_time);
                }
            });
        });
    } else {
        $scope.pushNotification = {id: 0, type: 'MatchConfirmed'};

        if (angular.isDefined($stateParams.push_notification_match) && JSON.parse($stateParams.push_notification_match) != null) {
            $scope.pushNotification.match = $stateParams.push_notification_match;
            $scope.push_notification_match_readonly = true;
        }
        if (angular.isDefined($stateParams.push_notification_match_substitution) && JSON.parse($stateParams.push_notification_match_substitution) != null) {
            $scope.pushNotification.match_substitution = $stateParams.push_notification_match_substitution;
            $scope.push_notification_match_substitution_readonly = true;
        }
        if (angular.isDefined($stateParams.push_notification_match_goal) && JSON.parse($stateParams.push_notification_match_goal) != null) {
            $scope.pushNotification.match_goal = $stateParams.push_notification_match_goal;
            $scope.push_notification_match_goal_readonly = true;
        }
        if (angular.isDefined($stateParams.push_notification_post) && JSON.parse($stateParams.push_notification_post) != null) {
            $scope.pushNotification.post = $stateParams.push_notification_post;
            $scope.push_notification_post_readonly = true;
        }
        if (angular.isDefined($stateParams.push_notification_video) && JSON.parse($stateParams.push_notification_video) != null) {
            $scope.pushNotification.video = $stateParams.push_notification_video;
            $scope.push_notification_video_readonly = true;
        }
        if (angular.isDefined($stateParams.push_notification_audio) && JSON.parse($stateParams.push_notification_audio) != null) {
            $scope.pushNotification.audio = $stateParams.push_notification_audio;
            $scope.push_notification_audio_readonly = true;
        }
        if (angular.isDefined($stateParams.push_notification_gallery) && JSON.parse($stateParams.push_notification_gallery) != null) {
            $scope.pushNotification.gallery = $stateParams.push_notification_gallery;
            $scope.push_notification_gallery_readonly = true;
        }
    }

}]);

