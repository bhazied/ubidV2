'use strict';

/**
 * Controller for Audios List
 */

app.controller('AudiosCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$audioTypesDataFactory', '$pricesDataFactory', '$sharingsDataFactory', '$albumsDataFactory', '$usersDataFactory', '$audioCategoriesDataFactory', '$audiosDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $audioTypesDataFactory, $pricesDataFactory, $sharingsDataFactory, $albumsDataFactory, $usersDataFactory, $audioCategoriesDataFactory, $audiosDataFactory) {

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

    $scope.audioTypes = [];
    $scope.audioTypesLoaded = false;

    $scope.getAudioTypes = function() {
        $scope.audioTypesLoaded = true;
        if ($scope.audioTypes.length == 0) {
            $scope.audioTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTAUDIOTYPE')});
            var def = $q.defer();
            $audioTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[audioType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.audioTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.audioTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.audioTypes;
        }
    };

    $scope.getAudioTypes();

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

    $scope.albums = [];
    $scope.albumsLoaded = false;

    $scope.getAlbums = function() {
        $scope.albumsLoaded = true;
        if ($scope.albums.length == 0) {
            $scope.albums.push({id: '', title: $filter('translate')('content.form.messages.SELECTALBUM')});
            var def = $q.defer();
            $albumsDataFactory.query({offset: 0, limit: 10000, 'order_by[album.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.albums.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.albums);
                    }
                });
            });
            return def;
        } else {
            return $scope.albums;
        }
    };

    $scope.getAlbums();

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


    $scope.audioCategories = [];
    $scope.audioCategoriesLoaded = [];

    $scope.getAudioCategories = function() {
        if ($scope.audioCategories.length == 0) {
            $scope.audioCategories.push({});
            var def = $q.defer();
            $audioCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[audioCategory.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.audioCategories.length = 0;
                        for (var i in data.results) {
                            $scope.audioCategories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.audioCategories);
                    }
                });
            });
            return def;
        } else {
            return $scope.audioCategories;
        }
    };

    $scope.getAudioCategories();

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
        $localStorage.audiosParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.audiosParams)) {
           $localStorage.audiosParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.audiosParams[param]) && $localStorage.audiosParams[param] != null) {
            return $localStorage.audiosParams[param];
        } else {
            $localStorage.audiosParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'audio.id', filter: { 'audio.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'audio_type', title: $filter('translate')('content.list.fields.AUDIOTYPE'), sortable: 'audio_type.name', filter: { 'audio.audioType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getAudioTypes(), show: $scope.getParamValue('audio_type_id_show_filed', true), displayField: 'name', state: 'app.webradio.audiotypesdetails' },
            { field: 'price', title: $filter('translate')('content.list.fields.PRICE'), sortable: 'price.name', filter: { 'audio.price': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPrices(), show: $scope.getParamValue('price_id_show_filed', true), displayField: 'name', state: 'app.offer.pricesdetails' },
            { field: 'sharing', title: $filter('translate')('content.list.fields.SHARING'), sortable: 'sharing.name', filter: { 'audio.sharing': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSharings(), show: $scope.getParamValue('sharing_id_show_filed', true), displayField: 'name', state: 'app.offer.sharingsdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'audio.name', filter: { 'audio.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'audio.nameAr', filter: { 'audio.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'audio.nameFr', filter: { 'audio.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'audio.slug', filter: { 'audio.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'audio.slugAr', filter: { 'audio.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'audio.slugFr', filter: { 'audio.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'file', title: $filter('translate')('content.list.fields.FILE'), sortable: 'audio.file', filter: { 'audio.file': 'text' }, show: $scope.getParamValue('file_show_filed', false), getValue: $scope.textValue },
            { field: 'file_size', title: $filter('translate')('content.list.fields.FILESIZE'), sortable: 'audio.fileSize', filter: { 'audio.fileSize': 'number' }, show: $scope.getParamValue('file_size_show_filed', false), getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'audio.description', filter: { 'audio.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'description_ar', title: $filter('translate')('content.list.fields.DESCRIPTIONAR'), sortable: 'audio.descriptionAr', filter: { 'audio.descriptionAr': 'text' }, show: $scope.getParamValue('description_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'description_fr', title: $filter('translate')('content.list.fields.DESCRIPTIONFR'), sortable: 'audio.descriptionFr', filter: { 'audio.descriptionFr': 'text' }, show: $scope.getParamValue('description_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'album', title: $filter('translate')('content.list.fields.ALBUM'), sortable: 'album.name', filter: { 'audio.album': 'select' }, getValue: $scope.linkValue, filterData: $scope.getAlbums(), show: $scope.getParamValue('album_id_show_filed', false), displayField: 'name', state: 'app.webradio.albumsdetails' },
            { field: 'duration', title: $filter('translate')('content.list.fields.DURATION'), sortable: 'audio.duration', filter: { 'audio.duration': 'number' }, show: $scope.getParamValue('duration_show_filed', false), getValue: $scope.textValue },
            { field: 'remote_source', title: $filter('translate')('content.list.fields.REMOTESOURCE'), sortable: 'audio.remoteSource', filter: { 'audio.remoteSource': 'select' }, show: $scope.getParamValue('remote_source_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.remote_source ]]"></span>') },
            { field: 'url', title: $filter('translate')('content.list.fields.URL'), sortable: 'audio.url', filter: { 'audio.url': 'text' }, show: $scope.getParamValue('url_show_filed', false), getValue: $scope.textValue },
            { field: 'alternative_url', title: $filter('translate')('content.list.fields.ALTERNATIVEURL'), sortable: 'audio.alternativeUrl', filter: { 'audio.alternativeUrl': 'text' }, show: $scope.getParamValue('alternative_url_show_filed', false), getValue: $scope.textValue },
            { field: 'copyright', title: $filter('translate')('content.list.fields.COPYRIGHT'), sortable: 'audio.copyright', filter: { 'audio.copyright': 'text' }, show: $scope.getParamValue('copyright_show_filed', false), getValue: $scope.textValue },
            { field: 'is_top', title: $filter('translate')('content.list.fields.ISTOP'), sortable: 'audio.isTop', filter: { 'audio.isTop': 'select' }, show: $scope.getParamValue('is_top_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_top ]]"></span>') },
            { field: 'is_new', title: $filter('translate')('content.list.fields.ISNEW'), sortable: 'audio.isNew', filter: { 'audio.isNew': 'select' }, show: $scope.getParamValue('is_new_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_new ]]"></span>') },
            { field: 'total_previewed', title: $filter('translate')('content.list.fields.TOTALPREVIEWED'), sortable: 'audio.totalPreviewed', filter: { 'audio.totalPreviewed': 'number' }, show: $scope.getParamValue('total_previewed_show_filed', false), getValue: $scope.textValue },
            { field: 'total_downloads', title: $filter('translate')('content.list.fields.TOTALDOWNLOADS'), sortable: 'audio.totalDownloads', filter: { 'audio.totalDownloads': 'number' }, show: $scope.getParamValue('total_downloads_show_filed', false), getValue: $scope.textValue },
            { field: 'total_hits', title: $filter('translate')('content.list.fields.TOTALHITS'), sortable: 'audio.totalHits', filter: { 'audio.totalHits': 'number' }, show: $scope.getParamValue('total_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'total_comments', title: $filter('translate')('content.list.fields.TOTALCOMMENTS'), sortable: 'audio.totalComments', filter: { 'audio.totalComments': 'number' }, show: $scope.getParamValue('total_comments_show_filed', false), getValue: $scope.textValue },
            { field: 'total_ratings', title: $filter('translate')('content.list.fields.TOTALRATINGS'), sortable: 'audio.totalRatings', filter: { 'audio.totalRatings': 'number' }, show: $scope.getParamValue('total_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'average_ratings', title: $filter('translate')('content.list.fields.AVERAGERATINGS'), sortable: 'audio.averageRatings', filter: { 'audio.averageRatings': 'number' }, show: $scope.getParamValue('average_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'total_likes', title: $filter('translate')('content.list.fields.TOTALLIKES'), sortable: 'audio.totalLikes', filter: { 'audio.totalLikes': 'number' }, show: $scope.getParamValue('total_likes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_dislikes', title: $filter('translate')('content.list.fields.TOTALDISLIKES'), sortable: 'audio.totalDislikes', filter: { 'audio.totalDislikes': 'number' }, show: $scope.getParamValue('total_dislikes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_bookmarks', title: $filter('translate')('content.list.fields.TOTALBOOKMARKS'), sortable: 'audio.totalBookmarks', filter: { 'audio.totalBookmarks': 'number' }, show: $scope.getParamValue('total_bookmarks_show_filed', false), getValue: $scope.textValue },
            { field: 'enable_streaming', title: $filter('translate')('content.list.fields.ENABLESTREAMING'), sortable: 'audio.enableStreaming', filter: { 'audio.enableStreaming': 'select' }, show: $scope.getParamValue('enable_streaming_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_streaming ]]"></span>') },
            { field: 'auto_publishing', title: $filter('translate')('content.list.fields.AUTOPUBLISHING'), sortable: 'audio.autoPublishing', filter: { 'audio.autoPublishing': 'select' }, show: $scope.getParamValue('auto_publishing_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.auto_publishing ]]"></span>') },
            { field: 'start_publishing', title: $filter('translate')('content.list.fields.STARTPUBLISHING'), sortable: 'audio.startPublishing', filter: { 'audio.startPublishing': 'number' }, show: $scope.getParamValue('start_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_publishing', title: $filter('translate')('content.list.fields.ENDPUBLISHING'), sortable: 'audio.endPublishing', filter: { 'audio.endPublishing': 'number' }, show: $scope.getParamValue('end_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'audio.createdAt', filter: { 'audio.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'audio.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'audio.modifiedAt', filter: { 'audio.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'audio.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'audio_categories', title: $filter('translate')('content.list.fields.AUDIOCATEGORIES'), filter: { 'audio.audioCategories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getAudioCategories(), show: $scope.getParamValue('audio_categories_show_filed', false), display: false, displayField: 'name', state: 'app.webradio.audiocategoriesdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('audiosIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('audiosIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('audiosPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('audiosCount', $scope.count);
    $scope.sorting = {'audio.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('audiosSorting', $scope.sorting);
    $scope.filter = {
        audio_categories: []
    };
    $scope.filter = $scope.getParamValue('audiosFilter', $scope.filter);
    $scope.setParamValue('audiosPage', $scope.page);
    $scope.setParamValue('audiosCount', $scope.count);
    $scope.setParamValue('audiosSorting', $scope.sorting);
    $scope.setParamValue('audiosFilter', $scope.filter);
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
            $scope.setParamValue('audiosIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('audiosPage', current);
            $scope.setParamValue('audiosCount', limit);
            $scope.setParamValue('audiosSorting', order_by);
            $scope.setParamValue('audiosFilter', filters);
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
            return $audiosDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERAUDIO'),
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
                $audiosDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.AUDIODELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.AUDIONOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.AUDIONOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.webradio.audiosnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webradio.audiosedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.webradio.audiosdetails', {id: row.id});
    };

    $scope.convert = function(row) {
        $state.go('app.webradio.audiosconvert', {id: row.id});
    };
}]);

