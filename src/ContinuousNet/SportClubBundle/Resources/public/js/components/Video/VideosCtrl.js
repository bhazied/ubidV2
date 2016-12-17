'use strict';

/**
 * Controller for Videos List
 */

app.controller('VideosCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$videoTypesDataFactory', '$pricesDataFactory', '$sharingsDataFactory', '$showsDataFactory', '$usersDataFactory', '$videoCategoriesDataFactory', '$videosDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $videoTypesDataFactory, $pricesDataFactory, $sharingsDataFactory, $showsDataFactory, $usersDataFactory, $videoCategoriesDataFactory, $videosDataFactory) {

    $scope.statusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
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

    $scope.videoTypes = [];
    $scope.videoTypesLoaded = false;

    $scope.getVideoTypes = function() {
        $scope.videoTypesLoaded = true;
        if ($scope.videoTypes.length == 0) {
            $scope.videoTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTVIDEOTYPE')});
            var def = $q.defer();
            $videoTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[videoType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.videoTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.videoTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.videoTypes;
        }
    };

    $scope.getVideoTypes();

    $scope.prices = [];
    $scope.pricesLoaded = false;

    $scope.getPrices = function() {
        $scope.pricesLoaded = true;
        if ($scope.prices.length == 0) {
            $scope.prices.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRICE')});
            var def = $q.defer();
            $pricesDataFactory.query({offset: 0, limit: 10000, 'order_by[price.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.prices.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.prices);
                    }
                });
            });
            return def;
        } else {
            return $scope.prices;
        }
    };

    $scope.getPrices();

    $scope.sharings = [];
    $scope.sharingsLoaded = false;

    $scope.getSharings = function() {
        $scope.sharingsLoaded = true;
        if ($scope.sharings.length == 0) {
            $scope.sharings.push({id: '', title: $filter('translate')('content.form.messages.SELECTSHARING')});
            var def = $q.defer();
            $sharingsDataFactory.query({offset: 0, limit: 10000, 'order_by[sharing.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.sharings.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.sharings);
                    }
                });
            });
            return def;
        } else {
            return $scope.sharings;
        }
    };

    $scope.getSharings();

    $scope.shows = [];
    $scope.showsLoaded = false;

    $scope.getShows = function() {
        $scope.showsLoaded = true;
        if ($scope.shows.length == 0) {
            $scope.shows.push({id: '', title: $filter('translate')('content.form.messages.SELECTSHOW')});
            var def = $q.defer();
            $showsDataFactory.query({offset: 0, limit: 10000, 'order_by[show.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.shows.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.shows);
                    }
                });
            });
            return def;
        } else {
            return $scope.shows;
        }
    };

    $scope.getShows();

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


    $scope.videoCategories = [];
    $scope.videoCategoriesLoaded = [];

    $scope.getVideoCategories = function() {
        if ($scope.videoCategories.length == 0) {
            $scope.videoCategories.push({});
            var def = $q.defer();
            $videoCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[videoCategory.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.videoCategories.length = 0;
                        for (var i in data.results) {
                            $scope.videoCategories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.videoCategories);
                    }
                });
            });
            return def;
        } else {
            return $scope.videoCategories;
        }
    };

    $scope.getVideoCategories();

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

    $scope.linksValue = function($scope, row) {
        var values = row[this.field];
        if (values.length == 0) {
            return '';
        }
        var links = [];
        for (var i in values) {
            var link = '<a ui-sref="'+this.state+'({id: ' + values[i].id + '})">';
            var displayFields = this.displayField.split(' ');
            for (var j in displayFields) {
                link += value[displayFields[j]] + ' ';
            }
            html += '</a>';
            links.push(link);
        }
        var html = links.join(', ');
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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.videosParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.videosParams)) {
           $localStorage.videosParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.videosParams[param]) && $localStorage.videosParams[param] != null) {
            return $localStorage.videosParams[param];
        } else {
            $localStorage.videosParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'video.id', filter: { 'video.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'video_type', title: $filter('translate')('content.list.fields.VIDEOTYPE'), sortable: 'video_type.name', filter: { 'video.videoType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getVideoTypes(), show: $scope.getParamValue('video_type_id_show_filed', true), displayField: 'name', state: 'app.webtv.videotypesdetails' },
            { field: 'price', title: $filter('translate')('content.list.fields.PRICE'), sortable: 'price.name', filter: { 'video.price': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPrices(), show: $scope.getParamValue('price_id_show_filed', true), displayField: 'name', state: 'app.offer.pricesdetails' },
            { field: 'sharing', title: $filter('translate')('content.list.fields.SHARING'), sortable: 'sharing.name', filter: { 'video.sharing': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSharings(), show: $scope.getParamValue('sharing_id_show_filed', true), displayField: 'name', state: 'app.offer.sharingsdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'video.name', filter: { 'video.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'video.nameAr', filter: { 'video.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'video.nameFr', filter: { 'video.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'video.slug', filter: { 'video.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'video.slugAr', filter: { 'video.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'video.slugFr', filter: { 'video.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'video.picture', filter: { 'video.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'file', title: $filter('translate')('content.list.fields.FILE'), sortable: 'video.file', filter: { 'video.file': 'text' }, show: $scope.getParamValue('file_show_filed', false), getValue: $scope.textValue },
            { field: 'watermark_text', title: $filter('translate')('content.list.fields.WATERMARKTEXT'), sortable: 'video.watermarkText', filter: { 'video.watermarkText': 'text' }, show: $scope.getParamValue('watermark_text_show_filed', false), getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'video.description', filter: { 'video.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'description_ar', title: $filter('translate')('content.list.fields.DESCRIPTIONAR'), sortable: 'video.descriptionAr', filter: { 'video.descriptionAr': 'text' }, show: $scope.getParamValue('description_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'description_fr', title: $filter('translate')('content.list.fields.DESCRIPTIONFR'), sortable: 'video.descriptionFr', filter: { 'video.descriptionFr': 'text' }, show: $scope.getParamValue('description_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'show', title: $filter('translate')('content.list.fields.SHOW'), sortable: 'show.name', filter: { 'video.show': 'select' }, getValue: $scope.linkValue, filterData: $scope.getShows(), show: $scope.getParamValue('show_id_show_filed', false), displayField: 'name', state: 'app.webtv.showsdetails' },
            { field: 'season_number', title: $filter('translate')('content.list.fields.SEASONNUMBER'), sortable: 'video.seasonNumber', filter: { 'video.seasonNumber': 'number' }, show: $scope.getParamValue('season_number_show_filed', false), getValue: $scope.textValue },
            { field: 'episode_number', title: $filter('translate')('content.list.fields.EPISODENUMBER'), sortable: 'video.episodeNumber', filter: { 'video.episodeNumber': 'number' }, show: $scope.getParamValue('episode_number_show_filed', false), getValue: $scope.textValue },
            { field: 'duration', title: $filter('translate')('content.list.fields.DURATION'), sortable: 'video.duration', filter: { 'video.duration': 'number' }, show: $scope.getParamValue('duration_show_filed', false), getValue: $scope.textValue },
            { field: 'remote_source', title: $filter('translate')('content.list.fields.REMOTESOURCE'), sortable: 'video.remoteSource', filter: { 'video.remoteSource': 'select' }, show: $scope.getParamValue('remote_source_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.remote_source ]]"></span>') },
            { field: 'url', title: $filter('translate')('content.list.fields.URL'), sortable: 'video.url', filter: { 'video.url': 'text' }, show: $scope.getParamValue('url_show_filed', false), getValue: $scope.textValue },
            { field: 'alternative_url', title: $filter('translate')('content.list.fields.ALTERNATIVEURL'), sortable: 'video.alternativeUrl', filter: { 'video.alternativeUrl': 'text' }, show: $scope.getParamValue('alternative_url_show_filed', false), getValue: $scope.textValue },
            { field: 'copyright', title: $filter('translate')('content.list.fields.COPYRIGHT'), sortable: 'video.copyright', filter: { 'video.copyright': 'text' }, show: $scope.getParamValue('copyright_show_filed', false), getValue: $scope.textValue },
            { field: 'is_top', title: $filter('translate')('content.list.fields.ISTOP'), sortable: 'video.isTop', filter: { 'video.isTop': 'select' }, show: $scope.getParamValue('is_top_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_top ]]"></span>') },
            { field: 'is_new', title: $filter('translate')('content.list.fields.ISNEW'), sortable: 'video.isNew', filter: { 'video.isNew': 'select' }, show: $scope.getParamValue('is_new_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_new ]]"></span>') },
            { field: 'total_previewed', title: $filter('translate')('content.list.fields.TOTALPREVIEWED'), sortable: 'video.totalPreviewed', filter: { 'video.totalPreviewed': 'number' }, show: $scope.getParamValue('total_previewed_show_filed', false), getValue: $scope.textValue },
            { field: 'total_downloads', title: $filter('translate')('content.list.fields.TOTALDOWNLOADS'), sortable: 'video.totalDownloads', filter: { 'video.totalDownloads': 'number' }, show: $scope.getParamValue('total_downloads_show_filed', false), getValue: $scope.textValue },
            { field: 'total_hits', title: $filter('translate')('content.list.fields.TOTALHITS'), sortable: 'video.totalHits', filter: { 'video.totalHits': 'number' }, show: $scope.getParamValue('total_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'total_comments', title: $filter('translate')('content.list.fields.TOTALCOMMENTS'), sortable: 'video.totalComments', filter: { 'video.totalComments': 'number' }, show: $scope.getParamValue('total_comments_show_filed', false), getValue: $scope.textValue },
            { field: 'total_ratings', title: $filter('translate')('content.list.fields.TOTALRATINGS'), sortable: 'video.totalRatings', filter: { 'video.totalRatings': 'number' }, show: $scope.getParamValue('total_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'average_ratings', title: $filter('translate')('content.list.fields.AVERAGERATINGS'), sortable: 'video.averageRatings', filter: { 'video.averageRatings': 'number' }, show: $scope.getParamValue('average_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'total_likes', title: $filter('translate')('content.list.fields.TOTALLIKES'), sortable: 'video.totalLikes', filter: { 'video.totalLikes': 'number' }, show: $scope.getParamValue('total_likes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_dislikes', title: $filter('translate')('content.list.fields.TOTALDISLIKES'), sortable: 'video.totalDislikes', filter: { 'video.totalDislikes': 'number' }, show: $scope.getParamValue('total_dislikes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_bookmarks', title: $filter('translate')('content.list.fields.TOTALBOOKMARKS'), sortable: 'video.totalBookmarks', filter: { 'video.totalBookmarks': 'number' }, show: $scope.getParamValue('total_bookmarks_show_filed', false), getValue: $scope.textValue },
            { field: 'enable_streaming', title: $filter('translate')('content.list.fields.ENABLESTREAMING'), sortable: 'video.enableStreaming', filter: { 'video.enableStreaming': 'select' }, show: $scope.getParamValue('enable_streaming_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_streaming ]]"></span>') },
            { field: 'auto_publishing', title: $filter('translate')('content.list.fields.AUTOPUBLISHING'), sortable: 'video.autoPublishing', filter: { 'video.autoPublishing': 'select' }, show: $scope.getParamValue('auto_publishing_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.auto_publishing ]]"></span>') },
            { field: 'start_publishing', title: $filter('translate')('content.list.fields.STARTPUBLISHING'), sortable: 'video.startPublishing', filter: { 'video.startPublishing': 'number' }, show: $scope.getParamValue('start_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_publishing', title: $filter('translate')('content.list.fields.ENDPUBLISHING'), sortable: 'video.endPublishing', filter: { 'video.endPublishing': 'number' }, show: $scope.getParamValue('end_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'video.createdAt', filter: { 'video.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'video.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'video.modifiedAt', filter: { 'video.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'video.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'video_categories', title: $filter('translate')('content.list.fields.VIDEOCATEGORIES'), filter: { 'video.videoCategories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getVideoCategories(), show: $scope.getParamValue('video_categories_show_filed', false), display: false, displayField: 'name', state: 'app.webtv.videocategoriesdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
            +'<div class="btn-group pull-right">'
            +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
            +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
            +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
            +'<button type="button" class="btn btn-info" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.CONVERT')+'" ng-click="convert(row)"><i class="ti-video-clapper"></i></button>'
            +'</div>') }
        ];
    };

    $scope.setCols();

    $scope.$on('languageChange', function(event, locale) {
        $timeout(function(){;
            $scope.setCols();
        }, 500);
    });

    $scope.isFiltersVisible = $scope.getParamValue('videosIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('videosIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('videosPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('videosCount', $scope.count);
    $scope.sorting = {'video.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('videosSorting', $scope.sorting);
    $scope.filter = {
        video_categories: []
    };
    $scope.filter = $scope.getParamValue('videosFilter', $scope.filter);
    $scope.setParamValue('videosPage', $scope.page);
    $scope.setParamValue('videosCount', $scope.count);
    $scope.setParamValue('videosSorting', $scope.sorting);
    $scope.setParamValue('videosFilter', $scope.filter);
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
            $scope.setParamValue('videosIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('videosPage', current);
            $scope.setParamValue('videosCount', limit);
            $scope.setParamValue('videosSorting', order_by);
            $scope.setParamValue('videosFilter', filters);
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
            return $videosDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERVIDEO'),
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
                $videosDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.VIDEODELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.VIDEONOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.VIDEONOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.webtv.videosnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webtv.videosedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.webtv.videosdetails', {id: row.id});
    };

    $scope.convert = function(row) {
        $state.go('app.webtv.videosconvert', {id: row.id});
    };
}]);

