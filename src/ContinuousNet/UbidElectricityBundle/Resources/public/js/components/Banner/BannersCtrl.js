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
            { field: 'banner_positions', 'class': 'has_nany', title: $filter('translate')('content.list.fields.BANNERPOSITIONS'), filter: { 'banner.bannerPositions': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getBannerPositions(), show: $scope.getParamValue('banner_positions_show_filed', false), displayInList: , display: false, displayField: 'name', state: 'app.adserving.bannerpositionsdetails' },
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

