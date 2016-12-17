'use strict';

/**
 * Controller for Sport Events List
 */

app.controller('SportEventsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$sportsDataFactory', '$seasonsDataFactory', '$postTypesDataFactory', '$postCategoriesDataFactory', '$countriesDataFactory', '$usersDataFactory', '$teamsDataFactory', '$sportEventsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $sportsDataFactory, $seasonsDataFactory, $postTypesDataFactory, $postCategoriesDataFactory, $countriesDataFactory, $usersDataFactory, $teamsDataFactory, $sportEventsDataFactory) {

    $scope.teamTypesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Club',
        title: $filter('translate')('content.list.fields.teamtypes.CLUB'),
        css: 'primary'
    }, {
        id: 'National',
        title: $filter('translate')('content.list.fields.teamtypes.NATIONAL'),
        css: 'success'
    }];
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

    $scope.sports = [];
    $scope.sportsLoaded = false;

    $scope.getSports = function() {
        $scope.sportsLoaded = true;
        if ($scope.sports.length == 0) {
            $scope.sports.push({id: '', title: $filter('translate')('content.form.messages.SELECTSPORT')});
            var def = $q.defer();
            $sportsDataFactory.query({offset: 0, limit: 10000, 'order_by[sport.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.sports.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.sports);
                    }
                });
            });
            return def;
        } else {
            return $scope.sports;
        }
    };

    $scope.getSports();

    $scope.seasons = [];
    $scope.seasonsLoaded = false;

    $scope.getSeasons = function() {
        $scope.seasonsLoaded = true;
        if ($scope.seasons.length == 0) {
            $scope.seasons.push({id: '', title: $filter('translate')('content.form.messages.SELECTSEASON')});
            var def = $q.defer();
            $seasonsDataFactory.query({offset: 0, limit: 10000, 'order_by[season.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.seasons.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.seasons);
                    }
                });
            });
            return def;
        } else {
            return $scope.seasons;
        }
    };

    $scope.getSeasons();

    $scope.postTypes = [];
    $scope.postTypesLoaded = false;

    $scope.getPostTypes = function() {
        $scope.postTypesLoaded = true;
        if ($scope.postTypes.length == 0) {
            $scope.postTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTTYPE')});
            var def = $q.defer();
            $postTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[postType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.postTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.postTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.postTypes;
        }
    };

    $scope.getPostTypes();

    $scope.postCategories = [];
    $scope.postCategoriesLoaded = false;

    $scope.getPostCategories = function() {
        $scope.postCategoriesLoaded = true;
        if ($scope.postCategories.length == 0) {
            $scope.postCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTCATEGORY')});
            var def = $q.defer();
            $postCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[postCategory.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.postCategories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.postCategories);
                    }
                });
            });
            return def;
        } else {
            return $scope.postCategories;
        }
    };

    $scope.getPostCategories();

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $scope.countriesLoaded = true;
        if ($scope.countries.length == 0) {
            $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
            var def = $q.defer();
            $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.countries.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.countries);
                    }
                });
            });
            return def;
        } else {
            return $scope.countries;
        }
    };

    $scope.getCountries();

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


    $scope.teams = [];
    $scope.teamsLoaded = [];

    $scope.getTeams = function() {
        if ($scope.teams.length == 0) {
            $scope.teams.push({});
            var def = $q.defer();
            $teamsDataFactory.query({offset: 0, limit: 10000, 'order_by[team.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.teams.length = 0;
                        for (var i in data.results) {
                            $scope.teams.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.teams);
                    }
                });
            });
            return def;
        } else {
            return $scope.teams;
        }
    };

    $scope.getTeams();

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
            teamTypes: $scope.teamTypesOptions,
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.sportEventsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.sportEventsParams)) {
           $localStorage.sportEventsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.sportEventsParams[param]) && $localStorage.sportEventsParams[param] != null) {
            return $localStorage.sportEventsParams[param];
        } else {
            $localStorage.sportEventsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'sportEvent.id', filter: { 'sportEvent.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'sport', title: $filter('translate')('content.list.fields.SPORT'), sortable: 'sport.name', filter: { 'sportEvent.sport': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSports(), show: $scope.getParamValue('sport_id_show_filed', true), displayField: 'name', state: 'app.events.sportsdetails' },
            { field: 'season', title: $filter('translate')('content.list.fields.SEASON'), sortable: 'season.name', filter: { 'sportEvent.season': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSeasons(), show: $scope.getParamValue('season_id_show_filed', true), displayField: 'name', state: 'app.events.seasonsdetails' },
            { field: 'post_type', title: $filter('translate')('content.list.fields.POSTTYPE'), sortable: 'post_type.name', filter: { 'sportEvent.postType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPostTypes(), show: $scope.getParamValue('post_type_id_show_filed', true), displayField: 'name', state: 'app.news.posttypesdetails' },
            { field: 'post_category', title: $filter('translate')('content.list.fields.POSTCATEGORY'), sortable: 'post_category.name', filter: { 'sportEvent.postCategory': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPostCategories(), show: $scope.getParamValue('post_category_id_show_filed', true), displayField: 'name', state: 'app.news.postcategoriesdetails' },
            { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'sportEvent.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', true), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'sportEvent.name', filter: { 'sportEvent.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'sportEvent.nameAr', filter: { 'sportEvent.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'sportEvent.nameFr', filter: { 'sportEvent.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'sportEvent.slug', filter: { 'sportEvent.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'sportEvent.slugAr', filter: { 'sportEvent.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'sportEvent.slugFr', filter: { 'sportEvent.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'sportEvent.picture', filter: { 'sportEvent.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'alias', title: $filter('translate')('content.list.fields.ALIAS'), sortable: 'sportEvent.alias', filter: { 'sportEvent.alias': 'text' }, show: $scope.getParamValue('alias_show_filed', false), getValue: $scope.textValue },
            { field: 'alias_ar', title: $filter('translate')('content.list.fields.ALIASAR'), sortable: 'sportEvent.aliasAr', filter: { 'sportEvent.aliasAr': 'text' }, show: $scope.getParamValue('alias_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'alias_fr', title: $filter('translate')('content.list.fields.ALIASFR'), sortable: 'sportEvent.aliasFr', filter: { 'sportEvent.aliasFr': 'text' }, show: $scope.getParamValue('alias_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'sportEvent.ordering', filter: { 'sportEvent.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), getValue: $scope.textValue },
            { field: 'team_type', title: $filter('translate')('content.list.fields.TEAMTYPE'), sortable: 'sportEvent.teamType', filter: { 'sportEvent.teamType': 'select' }, show: $scope.getParamValue('team_type_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.teamTypesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.team_type ]]" my-enum-list=\'[[ teamTypes ]]\'></span>') },
            { field: 'enable_calendar', title: $filter('translate')('content.list.fields.ENABLECALENDAR'), sortable: 'sportEvent.enableCalendar', filter: { 'sportEvent.enableCalendar': 'select' }, show: $scope.getParamValue('enable_calendar_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_calendar ]]"></span>') },
            { field: 'enable_live', title: $filter('translate')('content.list.fields.ENABLELIVE'), sortable: 'sportEvent.enableLive', filter: { 'sportEvent.enableLive': 'select' }, show: $scope.getParamValue('enable_live_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_live ]]"></span>') },
            { field: 'enable_table', title: $filter('translate')('content.list.fields.ENABLETABLE'), sortable: 'sportEvent.enableTable', filter: { 'sportEvent.enableTable': 'select' }, show: $scope.getParamValue('enable_table_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_table ]]"></span>') },
            { field: 'enable_results', title: $filter('translate')('content.list.fields.ENABLERESULTS'), sortable: 'sportEvent.enableResults', filter: { 'sportEvent.enableResults': 'select' }, show: $scope.getParamValue('enable_results_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_results ]]"></span>') },
            { field: 'enable_teams', title: $filter('translate')('content.list.fields.ENABLETEAMS'), sortable: 'sportEvent.enableTeams', filter: { 'sportEvent.enableTeams': 'select' }, show: $scope.getParamValue('enable_teams_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_teams ]]"></span>') },
            { field: 'enable_scorers', title: $filter('translate')('content.list.fields.ENABLESCORERS'), sortable: 'sportEvent.enableScorers', filter: { 'sportEvent.enableScorers': 'select' }, show: $scope.getParamValue('enable_scorers_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_scorers ]]"></span>') },
            { field: 'enable_stadia', title: $filter('translate')('content.list.fields.ENABLESTADIA'), sortable: 'sportEvent.enableStadia', filter: { 'sportEvent.enableStadia': 'select' }, show: $scope.getParamValue('enable_stadia_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_stadia ]]"></span>') },
            { field: 'enable_prize_winners', title: $filter('translate')('content.list.fields.ENABLEPRIZEWINNERS'), sortable: 'sportEvent.enablePrizeWinners', filter: { 'sportEvent.enablePrizeWinners': 'select' }, show: $scope.getParamValue('enable_prize_winners_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_prize_winners ]]"></span>') },
            { field: 'enable_statistics', title: $filter('translate')('content.list.fields.ENABLESTATISTICS'), sortable: 'sportEvent.enableStatistics', filter: { 'sportEvent.enableStatistics': 'select' }, show: $scope.getParamValue('enable_statistics_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_statistics ]]"></span>') },
            { field: 'enable_line_up', title: $filter('translate')('content.list.fields.ENABLELINEUP'), sortable: 'sportEvent.enableLineUp', filter: { 'sportEvent.enableLineUp': 'select' }, show: $scope.getParamValue('enable_line_up_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_line_up ]]"></span>') },
            { field: 'enable_posts', title: $filter('translate')('content.list.fields.ENABLEPOSTS'), sortable: 'sportEvent.enablePosts', filter: { 'sportEvent.enablePosts': 'select' }, show: $scope.getParamValue('enable_posts_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_posts ]]"></span>') },
            { field: 'enable_videos', title: $filter('translate')('content.list.fields.ENABLEVIDEOS'), sortable: 'sportEvent.enableVideos', filter: { 'sportEvent.enableVideos': 'select' }, show: $scope.getParamValue('enable_videos_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_videos ]]"></span>') },
            { field: 'enable_images', title: $filter('translate')('content.list.fields.ENABLEIMAGES'), sortable: 'sportEvent.enableImages', filter: { 'sportEvent.enableImages': 'select' }, show: $scope.getParamValue('enable_images_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_images ]]"></span>') },
            { field: 'eurosport', title: $filter('translate')('content.list.fields.EUROSPORT'), sortable: 'sportEvent.eurosport', filter: { 'sportEvent.eurosport': 'text' }, show: $scope.getParamValue('eurosport_show_filed', false), getValue: $scope.textValue },
            { field: 'lequipe', title: $filter('translate')('content.list.fields.LEQUIPE'), sortable: 'sportEvent.lequipe', filter: { 'sportEvent.lequipe': 'text' }, show: $scope.getParamValue('lequipe_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'sportEvent.createdAt', filter: { 'sportEvent.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'sportEvent.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'sportEvent.modifiedAt', filter: { 'sportEvent.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'sportEvent.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'teams', title: $filter('translate')('content.list.fields.TEAMS'), filter: { 'sportEvent.teams': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getTeams(), show: $scope.getParamValue('teams_show_filed', false), display: false, displayField: 'name', state: 'app.events.teamsdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
            +'<div class="btn-group pull-right">'
            +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
            +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
            +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
            +'</div>') }
        ];
    };

    $scope.setCols();

    $scope.$on('languageChange', function(event, locale) {
        $timeout(function(){;
            $scope.setCols();
        }, 500);
    });

    $scope.isFiltersVisible = $scope.getParamValue('sportEventsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('sportEventsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('sportEventsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('sportEventsCount', $scope.count);
    $scope.sorting = {'sportEvent.name': 'asc'};
    $scope.sorting = $scope.getParamValue('sportEventsSorting', $scope.sorting);
    $scope.filter = {
        teams: []
    };
    $scope.filter = $scope.getParamValue('sportEventsFilter', $scope.filter);
    $scope.setParamValue('sportEventsPage', $scope.page);
    $scope.setParamValue('sportEventsCount', $scope.count);
    $scope.setParamValue('sportEventsSorting', $scope.sorting);
    $scope.setParamValue('sportEventsFilter', $scope.filter);
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
            $scope.setParamValue('sportEventsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('sportEventsPage', current);
            $scope.setParamValue('sportEventsCount', limit);
            $scope.setParamValue('sportEventsSorting', order_by);
            $scope.setParamValue('sportEventsFilter', filters);
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
            return $sportEventsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSPORTEVENT'),
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
                $sportEventsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.SPORTEVENTDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.SPORTEVENTNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.SPORTEVENTNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.events.sporteventsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.sporteventsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.events.sporteventsdetails', {id: row.id});
    };
}]);

