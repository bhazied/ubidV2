'use strict';

/**
 * Controller for Push Notifications List
 */

app.controller('PushNotificationsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$matchesDataFactory', '$matchSubstitutionsDataFactory', '$matchGoalsDataFactory', '$postsDataFactory', '$videosDataFactory', '$audiosDataFactory', '$galleriesDataFactory', '$usersDataFactory', '$pushNotificationsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $matchesDataFactory, $matchSubstitutionsDataFactory, $matchGoalsDataFactory, $postsDataFactory, $videosDataFactory, $audiosDataFactory, $galleriesDataFactory, $usersDataFactory, $pushNotificationsDataFactory) {

    $scope.typesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
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

    $scope.booleanOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
     }, {
        id: '1',
        title: $filter('translate')('content.common.YES'),
        css: 'success'
     }, {
        id: '0',
        title: $filter('translate')('content.common.NO'),
        css: 'danger'
    }];

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.matches = [];
    $scope.matchesLoaded = false;

    $scope.getMatches = function() {
        $scope.matchesLoaded = true;
        if ($scope.matches.length == 0) {
            $scope.matches.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCH')});
            var def = $q.defer();
            $matchesDataFactory.query({offset: 0, limit: 10000, 'order_by[match.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.matches.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.matches);
                    }
                });
            });
            return def;
        } else {
            return $scope.matches;
        }
    };

    $scope.getMatches();

    $scope.matchSubstitutions = [];
    $scope.matchSubstitutionsLoaded = false;

    $scope.getMatchSubstitutions = function() {
        $scope.matchSubstitutionsLoaded = true;
        if ($scope.matchSubstitutions.length == 0) {
            $scope.matchSubstitutions.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCHSUBSTITUTION')});
            var def = $q.defer();
            $matchSubstitutionsDataFactory.query({offset: 0, limit: 10000, 'order_by[matchSubstitution.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.matchSubstitutions.push({
                                id: data.results[i].id,
                                title: data.results[i].id
                            });
                        }
                        def.resolve($scope.matchSubstitutions);
                    }
                });
            });
            return def;
        } else {
            return $scope.matchSubstitutions;
        }
    };

    $scope.getMatchSubstitutions();

    $scope.matchGoals = [];
    $scope.matchGoalsLoaded = false;

    $scope.getMatchGoals = function() {
        $scope.matchGoalsLoaded = true;
        if ($scope.matchGoals.length == 0) {
            $scope.matchGoals.push({id: '', title: $filter('translate')('content.form.messages.SELECTMATCHGOAL')});
            var def = $q.defer();
            $matchGoalsDataFactory.query({offset: 0, limit: 10000, 'order_by[matchGoal.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.matchGoals.push({
                                id: data.results[i].id,
                                title: data.results[i].id
                            });
                        }
                        def.resolve($scope.matchGoals);
                    }
                });
            });
            return def;
        } else {
            return $scope.matchGoals;
        }
    };

    $scope.getMatchGoals();

    $scope.posts = [];
    $scope.postsLoaded = false;

    $scope.getPosts = function() {
        $scope.postsLoaded = true;
        if ($scope.posts.length == 0) {
            $scope.posts.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOST')});
            var def = $q.defer();
            $postsDataFactory.query({offset: 0, limit: 10000, 'order_by[post.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.posts.push({
                                id: data.results[i].id,
                                title: data.results[i].title
                            });
                        }
                        def.resolve($scope.posts);
                    }
                });
            });
            return def;
        } else {
            return $scope.posts;
        }
    };

    $scope.getPosts();

    $scope.videos = [];
    $scope.videosLoaded = false;

    $scope.getVideos = function() {
        $scope.videosLoaded = true;
        if ($scope.videos.length == 0) {
            $scope.videos.push({id: '', title: $filter('translate')('content.form.messages.SELECTVIDEO')});
            var def = $q.defer();
            $videosDataFactory.query({offset: 0, limit: 10000, 'order_by[video.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.videos.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.videos);
                    }
                });
            });
            return def;
        } else {
            return $scope.videos;
        }
    };

    $scope.getVideos();

    $scope.audios = [];
    $scope.audiosLoaded = false;

    $scope.getAudios = function() {
        $scope.audiosLoaded = true;
        if ($scope.audios.length == 0) {
            $scope.audios.push({id: '', title: $filter('translate')('content.form.messages.SELECTAUDIO')});
            var def = $q.defer();
            $audiosDataFactory.query({offset: 0, limit: 10000, 'order_by[audio.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.audios.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.audios);
                    }
                });
            });
            return def;
        } else {
            return $scope.audios;
        }
    };

    $scope.getAudios();

    $scope.galleries = [];
    $scope.galleriesLoaded = false;

    $scope.getGalleries = function() {
        $scope.galleriesLoaded = true;
        if ($scope.galleries.length == 0) {
            $scope.galleries.push({id: '', title: $filter('translate')('content.form.messages.SELECTGALLERY')});
            var def = $q.defer();
            $galleriesDataFactory.query({offset: 0, limit: 10000, 'order_by[gallery.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.galleries.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.galleries);
                    }
                });
            });
            return def;
        } else {
            return $scope.galleries;
        }
    };

    $scope.getGalleries();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
            var def = $q.defer();
            $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.users.push({
                                id: data.results[i].id,
                                title: data.results[i].username
                            });
                        }
                        def.resolve($scope.users);
                    }
                });
            });
            return def;
        } else {
            return $scope.users;
        }
    };

    $scope.getUsers();


    $scope.textValue = function($scope, row) {
        return $scope.$eval('row.' + this.field);
    };

    $scope.trusted = {};

    $scope.linkValue = function($scope, row) {
        var value = row[this.field];
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var html = '<a ui-sref="'+this.state+'({id: ' + value.id + '})">';
        var displayFields = this.displayField.split(' ');
        for (var i in displayFields) {
            html += value[displayFields[i]] + ' ';
        }
        html += '</a>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.evaluatedValue = function($scope, row) {
        var value = $scope.$eval('row.' + this.field, {row: row});
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var evaluatedValue = $scope.$eval('\'' + value + '\' | ' + this.valueFormatter);
        if (this.field == 'birth_date') {
            evaluatedValue += ' ('+$scope.$eval('\'' + value + '\' | age')+')';
        }
        return evaluatedValue;
    };

    $scope.interpolatedValue = function($scope, row) {
        return this.interpolateExpr({
            row: row,
            types: $scope.typesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.pushNotificationsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.pushNotificationsParams)) {
           $localStorage.pushNotificationsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.pushNotificationsParams[param]) && $localStorage.pushNotificationsParams[param] != null) {
            return $localStorage.pushNotificationsParams[param];
        } else {
            $localStorage.pushNotificationsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'pushNotification.id', filter: { 'pushNotification.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'pushNotification.title', filter: { 'pushNotification.title': 'text' }, show: $scope.getParamValue('title_show_filed', true), getValue: $scope.textValue },
            { field: 'title_ar', title: $filter('translate')('content.list.fields.TITLEAR'), sortable: 'pushNotification.titleAr', filter: { 'pushNotification.titleAr': 'text' }, show: $scope.getParamValue('title_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'title_fr', title: $filter('translate')('content.list.fields.TITLEFR'), sortable: 'pushNotification.titleFr', filter: { 'pushNotification.titleFr': 'text' }, show: $scope.getParamValue('title_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'message', title: $filter('translate')('content.list.fields.MESSAGE'), sortable: 'pushNotification.message', filter: { 'pushNotification.message': 'text' }, show: $scope.getParamValue('message_show_filed', true), getValue: $scope.textValue },
            { field: 'message_ar', title: $filter('translate')('content.list.fields.MESSAGEAR'), sortable: 'pushNotification.messageAr', filter: { 'pushNotification.messageAr': 'text' }, show: $scope.getParamValue('message_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'message_fr', title: $filter('translate')('content.list.fields.MESSAGEFR'), sortable: 'pushNotification.messageFr', filter: { 'pushNotification.messageFr': 'text' }, show: $scope.getParamValue('message_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'type', title: $filter('translate')('content.list.fields.TYPE'), sortable: 'pushNotification.type', filter: { 'pushNotification.type': 'select' }, show: $scope.getParamValue('type_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.typesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.type ]]" my-enum-list=\'[[ types ]]\'></span>') },
            { field: 'category', title: $filter('translate')('content.list.fields.CATEGORY'), sortable: 'pushNotification.category', filter: { 'pushNotification.category': 'text' }, show: $scope.getParamValue('category_show_filed', false), getValue: $scope.textValue },
            { field: 'badge', title: $filter('translate')('content.list.fields.BADGE'), sortable: 'pushNotification.badge', filter: { 'pushNotification.badge': 'number' }, show: $scope.getParamValue('badge_show_filed', false), getValue: $scope.textValue },
            { field: 'sound', title: $filter('translate')('content.list.fields.SOUND'), sortable: 'pushNotification.sound', filter: { 'pushNotification.sound': 'text' }, show: $scope.getParamValue('sound_show_filed', false), getValue: $scope.textValue },
            { field: 'match', title: $filter('translate')('content.list.fields.MATCH'), sortable: 'match.name', filter: { 'pushNotification.match': 'select' }, getValue: $scope.linkValue, filterData: $scope.getMatches(), show: $scope.getParamValue('match_id_show_filed', false), displayField: 'name', state: 'app.matchday.matchesdetails' },
            { field: 'match_substitution', title: $filter('translate')('content.list.fields.MATCHSUBSTITUTION'), sortable: 'match_substitution.id', filter: { 'pushNotification.matchSubstitution': 'select' }, getValue: $scope.linkValue, filterData: $scope.getMatchSubstitutions(), show: $scope.getParamValue('match_substitution_id_show_filed', false), displayField: 'id', state: 'app.matchday.matchsubstitutionsdetails' },
            { field: 'match_goal', title: $filter('translate')('content.list.fields.MATCHGOAL'), sortable: 'match_goal.id', filter: { 'pushNotification.matchGoal': 'select' }, getValue: $scope.linkValue, filterData: $scope.getMatchGoals(), show: $scope.getParamValue('match_goal_id_show_filed', false), displayField: 'id', state: 'app.matchday.matchgoalsdetails' },
            { field: 'post', title: $filter('translate')('content.list.fields.POST'), sortable: 'post.title', filter: { 'pushNotification.post': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPosts(), show: $scope.getParamValue('post_id_show_filed', false), displayField: 'title', state: 'app.news.postsdetails' },
            { field: 'video', title: $filter('translate')('content.list.fields.VIDEO'), sortable: 'video.name', filter: { 'pushNotification.video': 'select' }, getValue: $scope.linkValue, filterData: $scope.getVideos(), show: $scope.getParamValue('video_id_show_filed', false), displayField: 'name', state: 'app.webtv.videosdetails' },
            { field: 'audio', title: $filter('translate')('content.list.fields.AUDIO'), sortable: 'audio.name', filter: { 'pushNotification.audio': 'select' }, getValue: $scope.linkValue, filterData: $scope.getAudios(), show: $scope.getParamValue('audio_id_show_filed', false), displayField: 'name', state: 'app.webradio.audiosdetails' },
            { field: 'gallery', title: $filter('translate')('content.list.fields.GALLERY'), sortable: 'gallery.name', filter: { 'pushNotification.gallery': 'select' }, getValue: $scope.linkValue, filterData: $scope.getGalleries(), show: $scope.getParamValue('gallery_id_show_filed', false), displayField: 'name', state: 'app.photos.galleriesdetails' },
            { field: 'sending', title: $filter('translate')('content.list.fields.SENDING'), sortable: 'pushNotification.sending', filter: { 'pushNotification.sending': 'select' }, show: $scope.getParamValue('sending_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.sending ]]"></span>') },
            { field: 'sending_time', title: $filter('translate')('content.list.fields.SENDINGTIME'), sortable: 'pushNotification.sendingTime', filter: { 'pushNotification.sendingTime': 'text' }, show: $scope.getParamValue('sending_time_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'pushNotification.createdAt', filter: { 'pushNotification.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'pushNotification.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'pushNotification.modifiedAt', filter: { 'pushNotification.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'pushNotification.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
            +'<div class="btn-group pull-right">'
            +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
            +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
            +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
            +'<button type="button" class="btn btn-info" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SEND')+'" ng-click="send(row)"><i class="ti-comment-alt"></i></button>'
            +'</div>') }
        ];
    };

    $scope.setCols();

    $scope.$on('languageChange', function(event, locale) {
        $timeout(function(){;
            $scope.setCols();
        }, 500);
    });

    $scope.isFiltersVisible = $scope.getParamValue('pushNotificationsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('pushNotificationsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('pushNotificationsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('pushNotificationsCount', $scope.count);
    $scope.sorting = {'pushNotification.id': 'asc'};
    $scope.sorting = $scope.getParamValue('pushNotificationsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('pushNotificationsFilter', $scope.filter);
    $scope.setParamValue('pushNotificationsPage', $scope.page);
    $scope.setParamValue('pushNotificationsCount', $scope.count);
    $scope.setParamValue('pushNotificationsSorting', $scope.sorting);
    $scope.setParamValue('pushNotificationsFilter', $scope.filter);
    $scope.tableParams = {
        page: $scope.page,
        count: $scope.count,
        sorting: $scope.sorting,
        filter: $scope.filter
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('pushNotificationsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('pushNotificationsPage', current);
            $scope.setParamValue('pushNotificationsCount', limit);
            $scope.setParamValue('pushNotificationsSorting', order_by);
            $scope.setParamValue('pushNotificationsFilter', filters);
            var http_params = {
                offset: offset,
                limit: limit
            };
            for (var field in order_by) {
                http_params['order_by['+field+']'] = order_by[field];
            }
            if (filters.length > 0) {
                http_params.offset = 0;
            }
            for (var field in filters) {
                if (filters[field] != null || filters[field] != '') {
                    http_params['filters['+field+']'] = filters[field];
                }
            }
            $scope.isLoading = true;
            return $pushNotificationsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERPUSHNOTIFICATION'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $filter('translate')('content.common.YESDELETE'),
            cancelButtonText: $filter('translate')('content.common.NOCANCEL'),
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                $pushNotificationsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.PUSHNOTIFICATIONDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.PUSHNOTIFICATIONNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.PUSHNOTIFICATIONNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.mobile.pushnotificationsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.mobile.pushnotificationsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.mobile.pushnotificationsdetails', {id: row.id});
    };

    $scope.send = function(row) {
        $state.go('app.mobile.pushnotificationssend', {id: row.id});
    };
}]);

