'use strict';

/**
 * Controller for Matches List
 */

app.controller('MatchesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$galleriesDataFactory', '$showsDataFactory', '$daysDataFactory', '$teamsDataFactory', '$countriesDataFactory', '$citiesDataFactory', '$stadiaDataFactory', '$usersDataFactory', '$matchesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $galleriesDataFactory, $showsDataFactory, $daysDataFactory, $teamsDataFactory, $countriesDataFactory, $citiesDataFactory, $stadiaDataFactory, $usersDataFactory, $matchesDataFactory) {

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

    $scope.days = [];
    $scope.daysLoaded = false;

    $scope.getDays = function() {
        $scope.daysLoaded = true;
        if ($scope.days.length == 0) {
            $scope.days.push({id: '', title: $filter('translate')('content.form.messages.SELECTDAY')});
            var def = $q.defer();
            $daysDataFactory.query({offset: 0, limit: 10000, 'order_by[day.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.days.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.days);
                    }
                });
            });
            return def;
        } else {
            return $scope.days;
        }
    };

    $scope.getDays();

    $scope.teams = [];
    $scope.teamsLoaded = false;

    $scope.getTeams = function() {
        $scope.teamsLoaded = true;
        if ($scope.teams.length == 0) {
            $scope.teams.push({id: '', title: $filter('translate')('content.form.messages.SELECTTEAMHOME')});
            var def = $q.defer();
            $teamsDataFactory.query({offset: 0, limit: 10000, 'order_by[team.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
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

    $scope.cities = [];
    $scope.citiesLoaded = false;

    $scope.getCities = function() {
        $scope.citiesLoaded = true;
        if ($scope.cities.length == 0) {
            $scope.cities.push({id: '', title: $filter('translate')('content.form.messages.SELECTCITY')});
            var def = $q.defer();
            $citiesDataFactory.query({offset: 0, limit: 10000, 'order_by[city.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.cities.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.cities);
                    }
                });
            });
            return def;
        } else {
            return $scope.cities;
        }
    };

    $scope.getCities();

    $scope.stadia = [];
    $scope.stadiaLoaded = false;

    $scope.getStadia = function() {
        $scope.stadiaLoaded = true;
        if ($scope.stadia.length == 0) {
            $scope.stadia.push({id: '', title: $filter('translate')('content.form.messages.SELECTSTADIUM')});
            var def = $q.defer();
            $stadiaDataFactory.query({offset: 0, limit: 10000, 'order_by[stadium.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.stadia.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.stadia);
                    }
                });
            });
            return def;
        } else {
            return $scope.stadia;
        }
    };

    $scope.getStadia();

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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.matchesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.matchesParams)) {
           $localStorage.matchesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.matchesParams[param]) && $localStorage.matchesParams[param] != null) {
            return $localStorage.matchesParams[param];
        } else {
            $localStorage.matchesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'match.id', filter: { 'match.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'match.name', filter: { 'match.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'match.nameAr', filter: { 'match.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'match.nameFr', filter: { 'match.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'gallery', title: $filter('translate')('content.list.fields.GALLERY'), sortable: 'gallery.name', filter: { 'match.gallery': 'select' }, getValue: $scope.linkValue, filterData: $scope.getGalleries(), show: $scope.getParamValue('gallery_id_show_filed', true), displayField: 'name', state: 'app.photos.galleriesdetails' },
            { field: 'show', title: $filter('translate')('content.list.fields.SHOW'), sortable: 'show.name', filter: { 'match.show': 'select' }, getValue: $scope.linkValue, filterData: $scope.getShows(), show: $scope.getParamValue('show_id_show_filed', true), displayField: 'name', state: 'app.webtv.showsdetails' },
            { field: 'day', title: $filter('translate')('content.list.fields.DAY'), sortable: 'day.name', filter: { 'match.day': 'select' }, getValue: $scope.linkValue, filterData: $scope.getDays(), show: $scope.getParamValue('day_id_show_filed', true), displayField: 'name', state: 'app.events.daysdetails' },
            { field: 'team_home', title: $filter('translate')('content.list.fields.TEAMHOME'), sortable: 'team_home.name', filter: { 'match.teamHome': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_home_show_filed', false), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'team_away', title: $filter('translate')('content.list.fields.TEAMAWAY'), sortable: 'team_away.name', filter: { 'match.teamAway': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_away_show_filed', false), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'goals_home', title: $filter('translate')('content.list.fields.GOALSHOME'), sortable: 'match.goalsHome', filter: { 'match.goalsHome': 'number' }, show: $scope.getParamValue('goals_home_show_filed', false), getValue: $scope.textValue },
            { field: 'goals_away', title: $filter('translate')('content.list.fields.GOALSAWAY'), sortable: 'match.goalsAway', filter: { 'match.goalsAway': 'number' }, show: $scope.getParamValue('goals_away_show_filed', false), getValue: $scope.textValue },
            { field: 'date_time', title: $filter('translate')('content.list.fields.DATETIME'), sortable: 'match.dateTime', filter: { 'match.dateTime': 'number' }, show: $scope.getParamValue('date_time_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'postponed', title: $filter('translate')('content.list.fields.POSTPONED'), sortable: 'match.postponed', filter: { 'match.postponed': 'select' }, show: $scope.getParamValue('postponed_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.postponed ]]"></span>') },
            { field: 'started', title: $filter('translate')('content.list.fields.STARTED'), sortable: 'match.started', filter: { 'match.started': 'select' }, show: $scope.getParamValue('started_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.started ]]"></span>') },
            { field: 'ended', title: $filter('translate')('content.list.fields.ENDED'), sortable: 'match.ended', filter: { 'match.ended': 'select' }, show: $scope.getParamValue('ended_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.ended ]]"></span>') },
            { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'match.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', false), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'city', title: $filter('translate')('content.list.fields.CITY'), sortable: 'city.name', filter: { 'match.city': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCities(), show: $scope.getParamValue('city_id_show_filed', false), displayField: 'name', state: 'app.settings.citiesdetails' },
            { field: 'stadium', title: $filter('translate')('content.list.fields.STADIUM'), sortable: 'stadium.name', filter: { 'match.stadium': 'select' }, getValue: $scope.linkValue, filterData: $scope.getStadia(), show: $scope.getParamValue('stadium_id_show_filed', false), displayField: 'name', state: 'app.events.stadiadetails' },
            { field: 'referee', title: $filter('translate')('content.list.fields.REFEREE'), sortable: 'match.referee', filter: { 'match.referee': 'text' }, show: $scope.getParamValue('referee_show_filed', false), getValue: $scope.textValue },
            { field: 'referee_ar', title: $filter('translate')('content.list.fields.REFEREEAR'), sortable: 'match.refereeAr', filter: { 'match.refereeAr': 'text' }, show: $scope.getParamValue('referee_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'referee_fr', title: $filter('translate')('content.list.fields.REFEREEFR'), sortable: 'match.refereeFr', filter: { 'match.refereeFr': 'text' }, show: $scope.getParamValue('referee_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'total_shots_home', title: $filter('translate')('content.list.fields.TOTALSHOTSHOME'), sortable: 'match.totalShotsHome', filter: { 'match.totalShotsHome': 'number' }, show: $scope.getParamValue('total_shots_home_show_filed', false), getValue: $scope.textValue },
            { field: 'total_shots_away', title: $filter('translate')('content.list.fields.TOTALSHOTSAWAY'), sortable: 'match.totalShotsAway', filter: { 'match.totalShotsAway': 'number' }, show: $scope.getParamValue('total_shots_away_show_filed', false), getValue: $scope.textValue },
            { field: 'shots_on_target_home', title: $filter('translate')('content.list.fields.SHOTSONTARGETHOME'), sortable: 'match.shotsOnTargetHome', filter: { 'match.shotsOnTargetHome': 'number' }, show: $scope.getParamValue('shots_on_target_home_show_filed', false), getValue: $scope.textValue },
            { field: 'shots_on_target_away', title: $filter('translate')('content.list.fields.SHOTSONTARGETAWAY'), sortable: 'match.shotsOnTargetAway', filter: { 'match.shotsOnTargetAway': 'number' }, show: $scope.getParamValue('shots_on_target_away_show_filed', false), getValue: $scope.textValue },
            { field: 'blocked_shots_home', title: $filter('translate')('content.list.fields.BLOCKEDSHOTSHOME'), sortable: 'match.blockedShotsHome', filter: { 'match.blockedShotsHome': 'number' }, show: $scope.getParamValue('blocked_shots_home_show_filed', false), getValue: $scope.textValue },
            { field: 'blocked_shots_away', title: $filter('translate')('content.list.fields.BLOCKEDSHOTSAWAY'), sortable: 'match.blockedShotsAway', filter: { 'match.blockedShotsAway': 'number' }, show: $scope.getParamValue('blocked_shots_away_show_filed', false), getValue: $scope.textValue },
            { field: 'shots_from_outside_the_box_home', title: $filter('translate')('content.list.fields.SHOTSFROMOUTSIDETHEBOXHOME'), sortable: 'match.shotsFromOutsideTheBoxHome', filter: { 'match.shotsFromOutsideTheBoxHome': 'number' }, show: $scope.getParamValue('shots_from_outside_the_box_home_show_filed', false), getValue: $scope.textValue },
            { field: 'shots_from_outside_the_box_away', title: $filter('translate')('content.list.fields.SHOTSFROMOUTSIDETHEBOXAWAY'), sortable: 'match.shotsFromOutsideTheBoxAway', filter: { 'match.shotsFromOutsideTheBoxAway': 'number' }, show: $scope.getParamValue('shots_from_outside_the_box_away_show_filed', false), getValue: $scope.textValue },
            { field: 'shots_from_inside_the_box_home', title: $filter('translate')('content.list.fields.SHOTSFROMINSIDETHEBOXHOME'), sortable: 'match.shotsFromInsideTheBoxHome', filter: { 'match.shotsFromInsideTheBoxHome': 'number' }, show: $scope.getParamValue('shots_from_inside_the_box_home_show_filed', false), getValue: $scope.textValue },
            { field: 'shots_from_inside_the_box_away', title: $filter('translate')('content.list.fields.SHOTSFROMINSIDETHEBOXAWAY'), sortable: 'match.shotsFromInsideTheBoxAway', filter: { 'match.shotsFromInsideTheBoxAway': 'number' }, show: $scope.getParamValue('shots_from_inside_the_box_away_show_filed', false), getValue: $scope.textValue },
            { field: 'shot_accuracy_home', title: $filter('translate')('content.list.fields.SHOTACCURACYHOME'), sortable: 'match.shotAccuracyHome', filter: { 'match.shotAccuracyHome': 'number' }, show: $scope.getParamValue('shot_accuracy_home_show_filed', false), getValue: $scope.textValue },
            { field: 'shot_accuracy_away', title: $filter('translate')('content.list.fields.SHOTACCURACYAWAY'), sortable: 'match.shotAccuracyAway', filter: { 'match.shotAccuracyAway': 'number' }, show: $scope.getParamValue('shot_accuracy_away_show_filed', false), getValue: $scope.textValue },
            { field: 'duels_won_home', title: $filter('translate')('content.list.fields.DUELSWONHOME'), sortable: 'match.duelsWonHome', filter: { 'match.duelsWonHome': 'number' }, show: $scope.getParamValue('duels_won_home_show_filed', false), getValue: $scope.textValue },
            { field: 'duels_won_away', title: $filter('translate')('content.list.fields.DUELSWONAWAY'), sortable: 'match.duelsWonAway', filter: { 'match.duelsWonAway': 'number' }, show: $scope.getParamValue('duels_won_away_show_filed', false), getValue: $scope.textValue },
            { field: 'aerial_duels_won_home', title: $filter('translate')('content.list.fields.AERIALDUELSWONHOME'), sortable: 'match.aerialDuelsWonHome', filter: { 'match.aerialDuelsWonHome': 'number' }, show: $scope.getParamValue('aerial_duels_won_home_show_filed', false), getValue: $scope.textValue },
            { field: 'aerial_duels_won_away', title: $filter('translate')('content.list.fields.AERIALDUELSWONAWAY'), sortable: 'match.aerialDuelsWonAway', filter: { 'match.aerialDuelsWonAway': 'number' }, show: $scope.getParamValue('aerial_duels_won_away_show_filed', false), getValue: $scope.textValue },
            { field: 'interceptions_home', title: $filter('translate')('content.list.fields.INTERCEPTIONSHOME'), sortable: 'match.interceptionsHome', filter: { 'match.interceptionsHome': 'number' }, show: $scope.getParamValue('interceptions_home_show_filed', false), getValue: $scope.textValue },
            { field: 'interceptions_away', title: $filter('translate')('content.list.fields.INTERCEPTIONSAWAY'), sortable: 'match.interceptionsAway', filter: { 'match.interceptionsAway': 'number' }, show: $scope.getParamValue('interceptions_away_show_filed', false), getValue: $scope.textValue },
            { field: 'total_passes_home', title: $filter('translate')('content.list.fields.TOTALPASSESHOME'), sortable: 'match.totalPassesHome', filter: { 'match.totalPassesHome': 'number' }, show: $scope.getParamValue('total_passes_home_show_filed', false), getValue: $scope.textValue },
            { field: 'total_passes_away', title: $filter('translate')('content.list.fields.TOTALPASSESAWAY'), sortable: 'match.totalPassesAway', filter: { 'match.totalPassesAway': 'number' }, show: $scope.getParamValue('total_passes_away_show_filed', false), getValue: $scope.textValue },
            { field: 'passes_long_home', title: $filter('translate')('content.list.fields.PASSESLONGHOME'), sortable: 'match.passesLongHome', filter: { 'match.passesLongHome': 'number' }, show: $scope.getParamValue('passes_long_home_show_filed', false), getValue: $scope.textValue },
            { field: 'passes_long_away', title: $filter('translate')('content.list.fields.PASSESLONGAWAY'), sortable: 'match.passesLongAway', filter: { 'match.passesLongAway': 'number' }, show: $scope.getParamValue('passes_long_away_show_filed', false), getValue: $scope.textValue },
            { field: 'passing_accuracy_home', title: $filter('translate')('content.list.fields.PASSINGACCURACYHOME'), sortable: 'match.passingAccuracyHome', filter: { 'match.passingAccuracyHome': 'number' }, show: $scope.getParamValue('passing_accuracy_home_show_filed', false), getValue: $scope.textValue },
            { field: 'passing_accuracy_away', title: $filter('translate')('content.list.fields.PASSINGACCURACYAWAY'), sortable: 'match.passingAccuracyAway', filter: { 'match.passingAccuracyAway': 'number' }, show: $scope.getParamValue('passing_accuracy_away_show_filed', false), getValue: $scope.textValue },
            { field: 'passing_accuracy_opposition_half_home', title: $filter('translate')('content.list.fields.PASSINGACCURACYOPPOSITIONHALFHOME'), sortable: 'match.passingAccuracyOppositionHalfHome', filter: { 'match.passingAccuracyOppositionHalfHome': 'number' }, show: $scope.getParamValue('passing_accuracy_opposition_half_home_show_filed', false), getValue: $scope.textValue },
            { field: 'passing_accuracy_opposition_half_away', title: $filter('translate')('content.list.fields.PASSINGACCURACYOPPOSITIONHALFAWAY'), sortable: 'match.passingAccuracyOppositionHalfAway', filter: { 'match.passingAccuracyOppositionHalfAway': 'number' }, show: $scope.getParamValue('passing_accuracy_opposition_half_away_show_filed', false), getValue: $scope.textValue },
            { field: 'total_crosses_home', title: $filter('translate')('content.list.fields.TOTALCROSSESHOME'), sortable: 'match.totalCrossesHome', filter: { 'match.totalCrossesHome': 'number' }, show: $scope.getParamValue('total_crosses_home_show_filed', false), getValue: $scope.textValue },
            { field: 'total_crosses_away', title: $filter('translate')('content.list.fields.TOTALCROSSESAWAY'), sortable: 'match.totalCrossesAway', filter: { 'match.totalCrossesAway': 'number' }, show: $scope.getParamValue('total_crosses_away_show_filed', false), getValue: $scope.textValue },
            { field: 'successful_crosses_home', title: $filter('translate')('content.list.fields.SUCCESSFULCROSSESHOME'), sortable: 'match.successfulCrossesHome', filter: { 'match.successfulCrossesHome': 'number' }, show: $scope.getParamValue('successful_crosses_home_show_filed', false), getValue: $scope.textValue },
            { field: 'successful_crosses_away', title: $filter('translate')('content.list.fields.SUCCESSFULCROSSESAWAY'), sortable: 'match.successfulCrossesAway', filter: { 'match.successfulCrossesAway': 'number' }, show: $scope.getParamValue('successful_crosses_away_show_filed', false), getValue: $scope.textValue },
            { field: 'tackles_home', title: $filter('translate')('content.list.fields.TACKLESHOME'), sortable: 'match.tacklesHome', filter: { 'match.tacklesHome': 'number' }, show: $scope.getParamValue('tackles_home_show_filed', false), getValue: $scope.textValue },
            { field: 'tackles_away', title: $filter('translate')('content.list.fields.TACKLESAWAY'), sortable: 'match.tacklesAway', filter: { 'match.tacklesAway': 'number' }, show: $scope.getParamValue('tackles_away_show_filed', false), getValue: $scope.textValue },
            { field: 'tackles_won_home', title: $filter('translate')('content.list.fields.TACKLESWONHOME'), sortable: 'match.tacklesWonHome', filter: { 'match.tacklesWonHome': 'number' }, show: $scope.getParamValue('tackles_won_home_show_filed', false), getValue: $scope.textValue },
            { field: 'tackles_won_away', title: $filter('translate')('content.list.fields.TACKLESWONAWAY'), sortable: 'match.tacklesWonAway', filter: { 'match.tacklesWonAway': 'number' }, show: $scope.getParamValue('tackles_won_away_show_filed', false), getValue: $scope.textValue },
            { field: 'clearances_home', title: $filter('translate')('content.list.fields.CLEARANCESHOME'), sortable: 'match.clearancesHome', filter: { 'match.clearancesHome': 'number' }, show: $scope.getParamValue('clearances_home_show_filed', false), getValue: $scope.textValue },
            { field: 'clearances_away', title: $filter('translate')('content.list.fields.CLEARANCESAWAY'), sortable: 'match.clearancesAway', filter: { 'match.clearancesAway': 'number' }, show: $scope.getParamValue('clearances_away_show_filed', false), getValue: $scope.textValue },
            { field: 'fouls_won_home', title: $filter('translate')('content.list.fields.FOULSWONHOME'), sortable: 'match.foulsWonHome', filter: { 'match.foulsWonHome': 'number' }, show: $scope.getParamValue('fouls_won_home_show_filed', false), getValue: $scope.textValue },
            { field: 'fouls_won_away', title: $filter('translate')('content.list.fields.FOULSWONAWAY'), sortable: 'match.foulsWonAway', filter: { 'match.foulsWonAway': 'number' }, show: $scope.getParamValue('fouls_won_away_show_filed', false), getValue: $scope.textValue },
            { field: 'fouls_conceded_home', title: $filter('translate')('content.list.fields.FOULSCONCEDEDHOME'), sortable: 'match.foulsConcededHome', filter: { 'match.foulsConcededHome': 'number' }, show: $scope.getParamValue('fouls_conceded_home_show_filed', false), getValue: $scope.textValue },
            { field: 'fouls_conceded_away', title: $filter('translate')('content.list.fields.FOULSCONCEDEDAWAY'), sortable: 'match.foulsConcededAway', filter: { 'match.foulsConcededAway': 'number' }, show: $scope.getParamValue('fouls_conceded_away_show_filed', false), getValue: $scope.textValue },
            { field: 'possession_home', title: $filter('translate')('content.list.fields.POSSESSIONHOME'), sortable: 'match.possessionHome', filter: { 'match.possessionHome': 'number' }, show: $scope.getParamValue('possession_home_show_filed', false), getValue: $scope.textValue },
            { field: 'possession_away', title: $filter('translate')('content.list.fields.POSSESSIONAWAY'), sortable: 'match.possessionAway', filter: { 'match.possessionAway': 'number' }, show: $scope.getParamValue('possession_away_show_filed', false), getValue: $scope.textValue },
            { field: 'substitutions_home', title: $filter('translate')('content.list.fields.SUBSTITUTIONSHOME'), sortable: 'match.substitutionsHome', filter: { 'match.substitutionsHome': 'number' }, show: $scope.getParamValue('substitutions_home_show_filed', false), getValue: $scope.textValue },
            { field: 'substitutions_away', title: $filter('translate')('content.list.fields.SUBSTITUTIONSAWAY'), sortable: 'match.substitutionsAway', filter: { 'match.substitutionsAway': 'number' }, show: $scope.getParamValue('substitutions_away_show_filed', false), getValue: $scope.textValue },
            { field: 'penalty_goals_home', title: $filter('translate')('content.list.fields.PENALTYGOALSHOME'), sortable: 'match.penaltyGoalsHome', filter: { 'match.penaltyGoalsHome': 'number' }, show: $scope.getParamValue('penalty_goals_home_show_filed', false), getValue: $scope.textValue },
            { field: 'penalty_goals_away', title: $filter('translate')('content.list.fields.PENALTYGOALSAWAY'), sortable: 'match.penaltyGoalsAway', filter: { 'match.penaltyGoalsAway': 'number' }, show: $scope.getParamValue('penalty_goals_away_show_filed', false), getValue: $scope.textValue },
            { field: 'offsides_home', title: $filter('translate')('content.list.fields.OFFSIDESHOME'), sortable: 'match.offsidesHome', filter: { 'match.offsidesHome': 'number' }, show: $scope.getParamValue('offsides_home_show_filed', false), getValue: $scope.textValue },
            { field: 'offsides_away', title: $filter('translate')('content.list.fields.OFFSIDESAWAY'), sortable: 'match.offsidesAway', filter: { 'match.offsidesAway': 'number' }, show: $scope.getParamValue('offsides_away_show_filed', false), getValue: $scope.textValue },
            { field: 'corners_home', title: $filter('translate')('content.list.fields.CORNERSHOME'), sortable: 'match.cornersHome', filter: { 'match.cornersHome': 'number' }, show: $scope.getParamValue('corners_home_show_filed', false), getValue: $scope.textValue },
            { field: 'corners_away', title: $filter('translate')('content.list.fields.CORNERSAWAY'), sortable: 'match.cornersAway', filter: { 'match.cornersAway': 'number' }, show: $scope.getParamValue('corners_away_show_filed', false), getValue: $scope.textValue },
            { field: 'penalties_won_home', title: $filter('translate')('content.list.fields.PENALTIESWONHOME'), sortable: 'match.penaltiesWonHome', filter: { 'match.penaltiesWonHome': 'number' }, show: $scope.getParamValue('penalties_won_home_show_filed', false), getValue: $scope.textValue },
            { field: 'penalties_won_away', title: $filter('translate')('content.list.fields.PENALTIESWONAWAY'), sortable: 'match.penaltiesWonAway', filter: { 'match.penaltiesWonAway': 'number' }, show: $scope.getParamValue('penalties_won_away_show_filed', false), getValue: $scope.textValue },
            { field: 'injured_home', title: $filter('translate')('content.list.fields.INJUREDHOME'), sortable: 'match.injuredHome', filter: { 'match.injuredHome': 'number' }, show: $scope.getParamValue('injured_home_show_filed', false), getValue: $scope.textValue },
            { field: 'injured_away', title: $filter('translate')('content.list.fields.INJUREDAWAY'), sortable: 'match.injuredAway', filter: { 'match.injuredAway': 'number' }, show: $scope.getParamValue('injured_away_show_filed', false), getValue: $scope.textValue },
            { field: 'cards_home', title: $filter('translate')('content.list.fields.CARDSHOME'), sortable: 'match.cardsHome', filter: { 'match.cardsHome': 'number' }, show: $scope.getParamValue('cards_home_show_filed', false), getValue: $scope.textValue },
            { field: 'cards_away', title: $filter('translate')('content.list.fields.CARDSAWAY'), sortable: 'match.cardsAway', filter: { 'match.cardsAway': 'number' }, show: $scope.getParamValue('cards_away_show_filed', false), getValue: $scope.textValue },
            { field: 'yellow_cards_home', title: $filter('translate')('content.list.fields.YELLOWCARDSHOME'), sortable: 'match.yellowCardsHome', filter: { 'match.yellowCardsHome': 'number' }, show: $scope.getParamValue('yellow_cards_home_show_filed', false), getValue: $scope.textValue },
            { field: 'yellow_cards_away', title: $filter('translate')('content.list.fields.YELLOWCARDSAWAY'), sortable: 'match.yellowCardsAway', filter: { 'match.yellowCardsAway': 'number' }, show: $scope.getParamValue('yellow_cards_away_show_filed', false), getValue: $scope.textValue },
            { field: 'double_yellow_cards_home', title: $filter('translate')('content.list.fields.DOUBLEYELLOWCARDSHOME'), sortable: 'match.doubleYellowCardsHome', filter: { 'match.doubleYellowCardsHome': 'number' }, show: $scope.getParamValue('double_yellow_cards_home_show_filed', false), getValue: $scope.textValue },
            { field: 'double_yellow_cards_away', title: $filter('translate')('content.list.fields.DOUBLEYELLOWCARDSAWAY'), sortable: 'match.doubleYellowCardsAway', filter: { 'match.doubleYellowCardsAway': 'number' }, show: $scope.getParamValue('double_yellow_cards_away_show_filed', false), getValue: $scope.textValue },
            { field: 'red_cards_home', title: $filter('translate')('content.list.fields.REDCARDSHOME'), sortable: 'match.redCardsHome', filter: { 'match.redCardsHome': 'number' }, show: $scope.getParamValue('red_cards_home_show_filed', false), getValue: $scope.textValue },
            { field: 'red_cards_away', title: $filter('translate')('content.list.fields.REDCARDSAWAY'), sortable: 'match.redCardsAway', filter: { 'match.redCardsAway': 'number' }, show: $scope.getParamValue('red_cards_away_show_filed', false), getValue: $scope.textValue },
            { field: 'recovered_balls_home', title: $filter('translate')('content.list.fields.RECOVEREDBALLSHOME'), sortable: 'match.recoveredBallsHome', filter: { 'match.recoveredBallsHome': 'number' }, show: $scope.getParamValue('recovered_balls_home_show_filed', false), getValue: $scope.textValue },
            { field: 'recovered_balls_away', title: $filter('translate')('content.list.fields.RECOVEREDBALLSAWAY'), sortable: 'match.recoveredBallsAway', filter: { 'match.recoveredBallsAway': 'number' }, show: $scope.getParamValue('recovered_balls_away_show_filed', false), getValue: $scope.textValue },
            { field: 'turnovers_home', title: $filter('translate')('content.list.fields.TURNOVERSHOME'), sortable: 'match.turnoversHome', filter: { 'match.turnoversHome': 'number' }, show: $scope.getParamValue('turnovers_home_show_filed', false), getValue: $scope.textValue },
            { field: 'turnovers_away', title: $filter('translate')('content.list.fields.TURNOVERSAWAY'), sortable: 'match.turnoversAway', filter: { 'match.turnoversAway': 'number' }, show: $scope.getParamValue('turnovers_away_show_filed', false), getValue: $scope.textValue },
            { field: 'previous', title: $filter('translate')('content.list.fields.PREVIOUS'), sortable: 'match.previous', filter: { 'match.previous': 'text' }, show: $scope.getParamValue('previous_show_filed', false), getValue: $scope.textValue },
            { field: 'previous_ar', title: $filter('translate')('content.list.fields.PREVIOUSAR'), sortable: 'match.previousAr', filter: { 'match.previousAr': 'text' }, show: $scope.getParamValue('previous_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'previous_fr', title: $filter('translate')('content.list.fields.PREVIOUSFR'), sortable: 'match.previousFr', filter: { 'match.previousFr': 'text' }, show: $scope.getParamValue('previous_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'report', title: $filter('translate')('content.list.fields.REPORT'), sortable: 'match.report', filter: { 'match.report': 'text' }, show: $scope.getParamValue('report_show_filed', false), getValue: $scope.textValue },
            { field: 'report_ar', title: $filter('translate')('content.list.fields.REPORTAR'), sortable: 'match.reportAr', filter: { 'match.reportAr': 'text' }, show: $scope.getParamValue('report_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'report_fr', title: $filter('translate')('content.list.fields.REPORTFR'), sortable: 'match.reportFr', filter: { 'match.reportFr': 'text' }, show: $scope.getParamValue('report_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'is_headline', title: $filter('translate')('content.list.fields.ISHEADLINE'), sortable: 'match.isHeadline', filter: { 'match.isHeadline': 'select' }, show: $scope.getParamValue('is_headline_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_headline ]]"></span>') },
            { field: 'live', title: $filter('translate')('content.list.fields.LIVE'), sortable: 'match.live', filter: { 'match.live': 'select' }, show: $scope.getParamValue('live_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.live ]]"></span>') },
            { field: 'last_minute', title: $filter('translate')('content.list.fields.LASTMINUTE'), sortable: 'match.lastMinute', filter: { 'match.lastMinute': 'text' }, show: $scope.getParamValue('last_minute_show_filed', false), getValue: $scope.textValue },
            { field: 'ticketing_link', title: $filter('translate')('content.list.fields.TICKETINGLINK'), sortable: 'match.ticketingLink', filter: { 'match.ticketingLink': 'text' }, show: $scope.getParamValue('ticketing_link_show_filed', false), getValue: $scope.textValue },
            { field: 'live_stream', title: $filter('translate')('content.list.fields.LIVESTREAM'), sortable: 'match.liveStream', filter: { 'match.liveStream': 'text' }, show: $scope.getParamValue('live_stream_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'match.createdAt', filter: { 'match.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'match.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'match.modifiedAt', filter: { 'match.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'match.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('matchesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('matchesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('matchesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('matchesCount', $scope.count);
    $scope.sorting = {'match.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('matchesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('matchesFilter', $scope.filter);
    $scope.setParamValue('matchesPage', $scope.page);
    $scope.setParamValue('matchesCount', $scope.count);
    $scope.setParamValue('matchesSorting', $scope.sorting);
    $scope.setParamValue('matchesFilter', $scope.filter);
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
            $scope.setParamValue('matchesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('matchesPage', current);
            $scope.setParamValue('matchesCount', limit);
            $scope.setParamValue('matchesSorting', order_by);
            $scope.setParamValue('matchesFilter', filters);
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
            return $matchesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERMATCH'),
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
                $matchesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.MATCHDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.MATCHNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.MATCHNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.matchday.matchesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.matchday.matchesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.matchday.matchesdetails', {id: row.id});
    };
}]);

