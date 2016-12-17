'use strict';

/**
 * Controller for Live Channels List
 */

app.controller('LiveChannelsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$pricesDataFactory', '$sharingsDataFactory', '$usersDataFactory', '$liveChannelsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $pricesDataFactory, $sharingsDataFactory, $usersDataFactory, $liveChannelsDataFactory) {

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
        $localStorage.liveChannelsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.liveChannelsParams)) {
           $localStorage.liveChannelsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.liveChannelsParams[param]) && $localStorage.liveChannelsParams[param] != null) {
            return $localStorage.liveChannelsParams[param];
        } else {
            $localStorage.liveChannelsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'liveChannel.id', filter: { 'liveChannel.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'price', title: $filter('translate')('content.list.fields.PRICE'), sortable: 'price.name', filter: { 'liveChannel.price': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPrices(), show: $scope.getParamValue('price_id_show_filed', true), displayField: 'name', state: 'app.offer.pricesdetails' },
            { field: 'sharing', title: $filter('translate')('content.list.fields.SHARING'), sortable: 'sharing.name', filter: { 'liveChannel.sharing': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSharings(), show: $scope.getParamValue('sharing_id_show_filed', true), displayField: 'name', state: 'app.offer.sharingsdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'liveChannel.name', filter: { 'liveChannel.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'liveChannel.nameAr', filter: { 'liveChannel.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'liveChannel.nameFr', filter: { 'liveChannel.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'liveChannel.slug', filter: { 'liveChannel.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'liveChannel.slugAr', filter: { 'liveChannel.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'liveChannel.slugFr', filter: { 'liveChannel.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'stream_name', title: $filter('translate')('content.list.fields.STREAMNAME'), sortable: 'liveChannel.streamName', filter: { 'liveChannel.streamName': 'text' }, show: $scope.getParamValue('stream_name_show_filed', false), getValue: $scope.textValue },
            { field: 'put_on_home', title: $filter('translate')('content.list.fields.PUTONHOME'), sortable: 'liveChannel.putOnHome', filter: { 'liveChannel.putOnHome': 'select' }, show: $scope.getParamValue('put_on_home_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.put_on_home ]]"></span>') },
            { field: 'total_views', title: $filter('translate')('content.list.fields.TOTALVIEWS'), sortable: 'liveChannel.totalViews', filter: { 'liveChannel.totalViews': 'number' }, show: $scope.getParamValue('total_views_show_filed', false), getValue: $scope.textValue },
            { field: 'total_hits', title: $filter('translate')('content.list.fields.TOTALHITS'), sortable: 'liveChannel.totalHits', filter: { 'liveChannel.totalHits': 'number' }, show: $scope.getParamValue('total_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'total_comments', title: $filter('translate')('content.list.fields.TOTALCOMMENTS'), sortable: 'liveChannel.totalComments', filter: { 'liveChannel.totalComments': 'number' }, show: $scope.getParamValue('total_comments_show_filed', false), getValue: $scope.textValue },
            { field: 'total_ratings', title: $filter('translate')('content.list.fields.TOTALRATINGS'), sortable: 'liveChannel.totalRatings', filter: { 'liveChannel.totalRatings': 'number' }, show: $scope.getParamValue('total_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'average_ratings', title: $filter('translate')('content.list.fields.AVERAGERATINGS'), sortable: 'liveChannel.averageRatings', filter: { 'liveChannel.averageRatings': 'number' }, show: $scope.getParamValue('average_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'total_likes', title: $filter('translate')('content.list.fields.TOTALLIKES'), sortable: 'liveChannel.totalLikes', filter: { 'liveChannel.totalLikes': 'number' }, show: $scope.getParamValue('total_likes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_dislikes', title: $filter('translate')('content.list.fields.TOTALDISLIKES'), sortable: 'liveChannel.totalDislikes', filter: { 'liveChannel.totalDislikes': 'number' }, show: $scope.getParamValue('total_dislikes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_bookmarks', title: $filter('translate')('content.list.fields.TOTALBOOKMARKS'), sortable: 'liveChannel.totalBookmarks', filter: { 'liveChannel.totalBookmarks': 'number' }, show: $scope.getParamValue('total_bookmarks_show_filed', false), getValue: $scope.textValue },
            { field: 'enable_streaming', title: $filter('translate')('content.list.fields.ENABLESTREAMING'), sortable: 'liveChannel.enableStreaming', filter: { 'liveChannel.enableStreaming': 'select' }, show: $scope.getParamValue('enable_streaming_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_streaming ]]"></span>') },
            { field: 'auto_publishing', title: $filter('translate')('content.list.fields.AUTOPUBLISHING'), sortable: 'liveChannel.autoPublishing', filter: { 'liveChannel.autoPublishing': 'select' }, show: $scope.getParamValue('auto_publishing_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.auto_publishing ]]"></span>') },
            { field: 'start_publishing', title: $filter('translate')('content.list.fields.STARTPUBLISHING'), sortable: 'liveChannel.startPublishing', filter: { 'liveChannel.startPublishing': 'number' }, show: $scope.getParamValue('start_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_publishing', title: $filter('translate')('content.list.fields.ENDPUBLISHING'), sortable: 'liveChannel.endPublishing', filter: { 'liveChannel.endPublishing': 'number' }, show: $scope.getParamValue('end_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'liveChannel.createdAt', filter: { 'liveChannel.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'liveChannel.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'liveChannel.modifiedAt', filter: { 'liveChannel.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'liveChannel.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('liveChannelsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('liveChannelsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('liveChannelsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('liveChannelsCount', $scope.count);
    $scope.sorting = {'liveChannel.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('liveChannelsSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('liveChannelsFilter', $scope.filter);
    $scope.setParamValue('liveChannelsPage', $scope.page);
    $scope.setParamValue('liveChannelsCount', $scope.count);
    $scope.setParamValue('liveChannelsSorting', $scope.sorting);
    $scope.setParamValue('liveChannelsFilter', $scope.filter);
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
            $scope.setParamValue('liveChannelsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('liveChannelsPage', current);
            $scope.setParamValue('liveChannelsCount', limit);
            $scope.setParamValue('liveChannelsSorting', order_by);
            $scope.setParamValue('liveChannelsFilter', filters);
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
            return $liveChannelsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERLIVECHANNEL'),
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
                $liveChannelsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.LIVECHANNELDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.LIVECHANNELNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.LIVECHANNELNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.webtv.livechannelsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webtv.livechannelsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.webtv.livechannelsdetails', {id: row.id});
    };
}]);

