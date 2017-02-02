'use strict';

/**
 * Controller for Banners List
 */

app.controller('BannersCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$bannerTypesDataFactory', '$usersDataFactory', '$bannerPositionsDataFactory', '$bannersDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $bannerTypesDataFactory, $usersDataFactory, $bannerPositionsDataFactory, $bannersDataFactory) {

    $scope.gendersOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
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

    $scope.bannerTypes = [];
    $scope.bannerTypesLoaded = false;

    $scope.getBannerTypes = function() {
        $scope.bannerTypesLoaded = true;
        if ($scope.bannerTypes.length == 0) {
            $scope.bannerTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTBANNERTYPE')});
            var def = $q.defer();
            $bannerTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[bannerType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.bannerTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.bannerTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.bannerTypes;
        }
    };

    $scope.getBannerTypes();

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


    $scope.bannerPositions = [];
    $scope.bannerPositionsLoaded = [];

    $scope.getBannerPositions = function() {
        if ($scope.bannerPositions.length == 0) {
            $scope.bannerPositions.push({});
            var def = $q.defer();
            $bannerPositionsDataFactory.query({offset: 0, limit: 10000, 'order_by[bannerPosition.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.bannerPositions.length = 0;
                        for (var i in data.results) {
                            $scope.bannerPositions.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.bannerPositions);
                    }
                });
            });
            return def;
        } else {
            return $scope.bannerPositions;
        }
    };

    $scope.getBannerPositions();

    $scope.textValue = function($scope, row) {
        return $scope.$eval('row.' + this.field);
    };

    $scope.colorValue = function($scope, row) {
        var color = $scope.$eval('row.' + this.field);
        var html = '<b style="color: white; background-color: ' + color + ';">' + color + '</b>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
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
            genders: $scope.gendersOptions,
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.bannersParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.bannersParams)) {
           $localStorage.bannersParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.bannersParams[param]) && $localStorage.bannersParams[param] != null) {
            return $localStorage.bannersParams[param];
        } else {
            $localStorage.bannersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'banner.id', filter: { 'banner.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'banner.createdAt', filter: { 'banner.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_publishing', title: $filter('translate')('content.list.fields.ENDPUBLISHING'), sortable: 'banner.endPublishing', filter: { 'banner.endPublishing': 'number' }, show: $scope.getParamValue('end_publishing_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'map_latitude', title: $filter('translate')('content.list.fields.MAPLATITUDE'), sortable: 'banner.mapLatitude', filter: { 'banner.mapLatitude': 'number' }, show: $scope.getParamValue('map_latitude_show_filed', true), getValue: $scope.textValue },
            { field: 'map_longitude', title: $filter('translate')('content.list.fields.MAPLONGITUDE'), sortable: 'banner.mapLongitude', filter: { 'banner.mapLongitude': 'number' }, show: $scope.getParamValue('map_longitude_show_filed', true), getValue: $scope.textValue },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'banner.modifiedAt', filter: { 'banner.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'start_publishing', title: $filter('translate')('content.list.fields.STARTPUBLISHING'), sortable: 'banner.startPublishing', filter: { 'banner.startPublishing': 'number' }, show: $scope.getParamValue('start_publishing_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'ad_text', title: $filter('translate')('content.list.fields.ADTEXT'), sortable: 'banner.adText', filter: { 'banner.adText': 'text' }, show: $scope.getParamValue('ad_text_show_filed', false), getValue: $scope.textValue },
            { field: 'android_action', title: $filter('translate')('content.list.fields.ANDROIDACTION'), sortable: 'banner.androidAction', filter: { 'banner.androidAction': 'text' }, show: $scope.getParamValue('android_action_show_filed', false), getValue: $scope.textValue },
            { field: 'android_app_url', title: $filter('translate')('content.list.fields.ANDROIDAPPURL'), sortable: 'banner.androidAppUrl', filter: { 'banner.androidAppUrl': 'text' }, show: $scope.getParamValue('android_app_url_show_filed', false), getValue: $scope.textValue },
            { field: 'auto_publishing', title: $filter('translate')('content.list.fields.AUTOPUBLISHING'), sortable: 'banner.autoPublishing', filter: { 'banner.autoPublishing': 'select' }, show: $scope.getParamValue('auto_publishing_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.auto_publishing ]]"></span>') },
            { field: 'background_color', title: $filter('translate')('content.list.fields.BACKGROUNDCOLOR'), sortable: 'banner.backgroundColor', filter: { 'banner.backgroundColor': 'text' }, show: $scope.getParamValue('background_color_show_filed', false), getValue: $scope.colorValue },
            { field: 'closable', title: $filter('translate')('content.list.fields.CLOSABLE'), sortable: 'banner.closable', filter: { 'banner.closable': 'select' }, show: $scope.getParamValue('closable_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.closable ]]"></span>') },
            { field: 'count_down', title: $filter('translate')('content.list.fields.COUNTDOWN'), sortable: 'banner.countDown', filter: { 'banner.countDown': 'number' }, show: $scope.getParamValue('count_down_show_filed', false), getValue: $scope.textValue },
            { field: 'email_adress', title: $filter('translate')('content.list.fields.EMAILADRESS'), sortable: 'banner.emailAdress', filter: { 'banner.emailAdress': 'text' }, show: $scope.getParamValue('email_adress_show_filed', false), getValue: $scope.textValue },
            { field: 'email_body', title: $filter('translate')('content.list.fields.EMAILBODY'), sortable: 'banner.emailBody', filter: { 'banner.emailBody': 'text' }, show: $scope.getParamValue('email_body_show_filed', false), getValue: $scope.textValue },
            { field: 'email_subject', title: $filter('translate')('content.list.fields.EMAILSUBJECT'), sortable: 'banner.emailSubject', filter: { 'banner.emailSubject': 'text' }, show: $scope.getParamValue('email_subject_show_filed', false), getValue: $scope.textValue },
            { field: 'end_publishing_time', title: $filter('translate')('content.list.fields.ENDPUBLISHINGTIME'), sortable: 'banner.endPublishingTime', filter: { 'banner.endPublishingTime': 'number' }, show: $scope.getParamValue('end_publishing_time_show_filed', false), getValue: $scope.textValue },
            { field: 'gender', 'class': 'enum', title: $filter('translate')('content.list.fields.GENDER'), sortable: 'banner.gender', filter: { 'banner.gender': 'select' }, show: $scope.getParamValue('gender_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.gendersOptions, interpolateExpr: $interpolate('<span class="bannerGender" my-enum="[[ row.gender ]]" my-enum-list=\'[[ genders ]]\'></span>') },
            { field: 'iphone_action', title: $filter('translate')('content.list.fields.IPHONEACTION'), sortable: 'banner.iphoneAction', filter: { 'banner.iphoneAction': 'text' }, show: $scope.getParamValue('iphone_action_show_filed', false), getValue: $scope.textValue },
            { field: 'iphone_app_url', title: $filter('translate')('content.list.fields.IPHONEAPPURL'), sortable: 'banner.iphoneAppUrl', filter: { 'banner.iphoneAppUrl': 'text' }, show: $scope.getParamValue('iphone_app_url_show_filed', false), getValue: $scope.textValue },
            { field: 'max_age', title: $filter('translate')('content.list.fields.MAXAGE'), sortable: 'banner.maxAge', filter: { 'banner.maxAge': 'number' }, show: $scope.getParamValue('max_age_show_filed', false), getValue: $scope.textValue },
            { field: 'max_clicks_per_day', title: $filter('translate')('content.list.fields.MAXCLICKSPERDAY'), sortable: 'banner.maxClicksPerDay', filter: { 'banner.maxClicksPerDay': 'number' }, show: $scope.getParamValue('max_clicks_per_day_show_filed', false), getValue: $scope.textValue },
            { field: 'max_hits_per_day', title: $filter('translate')('content.list.fields.MAXHITSPERDAY'), sortable: 'banner.maxHitsPerDay', filter: { 'banner.maxHitsPerDay': 'number' }, show: $scope.getParamValue('max_hits_per_day_show_filed', false), getValue: $scope.textValue },
            { field: 'max_total_clicks', title: $filter('translate')('content.list.fields.MAXTOTALCLICKS'), sortable: 'banner.maxTotalClicks', filter: { 'banner.maxTotalClicks': 'number' }, show: $scope.getParamValue('max_total_clicks_show_filed', false), getValue: $scope.textValue },
            { field: 'max_total_hits', title: $filter('translate')('content.list.fields.MAXTOTALHITS'), sortable: 'banner.maxTotalHits', filter: { 'banner.maxTotalHits': 'number' }, show: $scope.getParamValue('max_total_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'min_age', title: $filter('translate')('content.list.fields.MINAGE'), sortable: 'banner.minAge', filter: { 'banner.minAge': 'number' }, show: $scope.getParamValue('min_age_show_filed', false), getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'banner.name', filter: { 'banner.name': 'text' }, show: $scope.getParamValue('name_show_filed', false), getValue: $scope.textValue },
            { field: 'phone_number_to_call', title: $filter('translate')('content.list.fields.PHONENUMBERTOCALL'), sortable: 'banner.phoneNumberToCall', filter: { 'banner.phoneNumberToCall': 'text' }, show: $scope.getParamValue('phone_number_to_call_show_filed', false), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'banner.picture', filter: { 'banner.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'priority', title: $filter('translate')('content.list.fields.PRIORITY'), sortable: 'banner.priority', filter: { 'banner.priority': 'number' }, show: $scope.getParamValue('priority_show_filed', false), getValue: $scope.textValue },
            { field: 'screen', title: $filter('translate')('content.list.fields.SCREEN'), sortable: 'banner.screen', filter: { 'banner.screen': 'text' }, show: $scope.getParamValue('screen_show_filed', false), getValue: $scope.textValue },
            { field: 'screen_parameters', title: $filter('translate')('content.list.fields.SCREENPARAMETERS'), sortable: 'banner.screenParameters', filter: { 'banner.screenParameters': 'text' }, show: $scope.getParamValue('screen_parameters_show_filed', false), getValue: $scope.textValue },
            { field: 'sms_body', title: $filter('translate')('content.list.fields.SMSBODY'), sortable: 'banner.smsBody', filter: { 'banner.smsBody': 'text' }, show: $scope.getParamValue('sms_body_show_filed', false), getValue: $scope.textValue },
            { field: 'sms_mobile_number', title: $filter('translate')('content.list.fields.SMSMOBILENUMBER'), sortable: 'banner.smsMobileNumber', filter: { 'banner.smsMobileNumber': 'text' }, show: $scope.getParamValue('sms_mobile_number_show_filed', false), getValue: $scope.textValue },
            { field: 'start_publishing_time', title: $filter('translate')('content.list.fields.STARTPUBLISHINGTIME'), sortable: 'banner.startPublishingTime', filter: { 'banner.startPublishingTime': 'number' }, show: $scope.getParamValue('start_publishing_time_show_filed', false), getValue: $scope.textValue },
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'banner.status', filter: { 'banner.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="bannerStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'template', title: $filter('translate')('content.list.fields.TEMPLATE'), sortable: 'banner.template', filter: { 'banner.template': 'text' }, show: $scope.getParamValue('template_show_filed', false), getValue: $scope.textValue },
            { field: 'text_color', title: $filter('translate')('content.list.fields.TEXTCOLOR'), sortable: 'banner.textColor', filter: { 'banner.textColor': 'text' }, show: $scope.getParamValue('text_color_show_filed', false), getValue: $scope.colorValue },
            { field: 'today_clicks', title: $filter('translate')('content.list.fields.TODAYCLICKS'), sortable: 'banner.todayClicks', filter: { 'banner.todayClicks': 'number' }, show: $scope.getParamValue('today_clicks_show_filed', false), getValue: $scope.textValue },
            { field: 'today_hits', title: $filter('translate')('content.list.fields.TODAYHITS'), sortable: 'banner.todayHits', filter: { 'banner.todayHits': 'number' }, show: $scope.getParamValue('today_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'total_clicks', title: $filter('translate')('content.list.fields.TOTALCLICKS'), sortable: 'banner.totalClicks', filter: { 'banner.totalClicks': 'number' }, show: $scope.getParamValue('total_clicks_show_filed', false), getValue: $scope.textValue },
            { field: 'total_hits', title: $filter('translate')('content.list.fields.TOTALHITS'), sortable: 'banner.totalHits', filter: { 'banner.totalHits': 'number' }, show: $scope.getParamValue('total_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'web_action', title: $filter('translate')('content.list.fields.WEBACTION'), sortable: 'banner.webAction', filter: { 'banner.webAction': 'text' }, show: $scope.getParamValue('web_action_show_filed', false), getValue: $scope.textValue },
            { field: 'web_url', title: $filter('translate')('content.list.fields.WEBURL'), sortable: 'banner.webUrl', filter: { 'banner.webUrl': 'text' }, show: $scope.getParamValue('web_url_show_filed', false), getValue: $scope.textValue },
            { field: 'youtube_url', title: $filter('translate')('content.list.fields.YOUTUBEURL'), sortable: 'banner.youtubeUrl', filter: { 'banner.youtubeUrl': 'text' }, show: $scope.getParamValue('youtube_url_show_filed', false), getValue: $scope.textValue },
            { field: 'banner_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.BANNERTYPE'), sortable: 'banner_type.name', filter: { 'banner.bannerType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBannerTypes(), show: $scope.getParamValue('banner_type_id_show_filed', false), displayField: 'name', state: 'app.adserving.bannertypesdetails' },
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'banner.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'banner.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'banner_positions', 'class': 'has_nany', title: $filter('translate')('content.list.fields.BANNERPOSITIONS'), filter: { 'banner.bannerPositions': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getBannerPositions(), show: $scope.getParamValue('banner_positions_show_filed', false), display: false, displayField: 'name', state: 'app.adserving.bannerpositionsdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('bannersIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('bannersIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('bannersPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('bannersCount', $scope.count);
    $scope.sorting = {'banner.id': 'asc'};
    $scope.sorting = $scope.getParamValue('bannersSorting', $scope.sorting);
    $scope.filter = {
        banner_positions: []
    };
    $scope.filter = $scope.getParamValue('bannersFilter', $scope.filter);
    $scope.setParamValue('bannersPage', $scope.page);
    $scope.setParamValue('bannersCount', $scope.count);
    $scope.setParamValue('bannersSorting', $scope.sorting);
    $scope.setParamValue('bannersFilter', $scope.filter);
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
            $scope.setParamValue('bannersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('bannersPage', current);
            $scope.setParamValue('bannersCount', limit);
            $scope.setParamValue('bannersSorting', order_by);
            $scope.setParamValue('bannersFilter', filters);
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
            return $bannersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERBANNER'),
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
                $bannersDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.BANNERDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.BANNERNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.BANNERNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.adserving.bannersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.adserving.bannersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.adserving.bannersdetails', {id: row.id});
    };
}]);

