'use strict';

/**
 * Controller for Tenders List
 */

app.controller('TendersCtrl', ['$scope', '$rootScope', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$regionsDataFactory', '$countriesDataFactory', '$sectorsDataFactory', '$tenderTypesDataFactory', '$usersDataFactory', '$tenderCategoriesDataFactory', '$tendersDataFactory',
function($scope, $rootScope, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $regionsDataFactory, $countriesDataFactory, $sectorsDataFactory, $tenderTypesDataFactory, $usersDataFactory, $tenderCategoriesDataFactory, $tendersDataFactory) {

    $scope.isFiltersVisible = false;

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

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.regions = [];
    $scope.regionsLoaded = false;

    $scope.getRegions = function() {
        $scope.regionsLoaded = true;
        if ($scope.regions.length == 0) {
            $scope.regions.push({});
            var def = $q.defer();
            $regionsDataFactory.query({offset: 0, limit: 10000, 'order_by[region.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.regions.length = 0;
                        for (var i in data.results) {
                            $scope.regions.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.regions);
                    }
                });
            });
            return def;
        } else {
            return $scope.regions;
        }
    };

    $scope.getRegions();

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $scope.countriesLoaded = true;
        if ($scope.countries.length == 0) {
            $scope.countries.push({});
            var def = $q.defer();
            $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.countries.length = 0;
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

    $scope.sectors = [];
    $scope.sectorsLoaded = false;

    $scope.getSectors = function() {
        $scope.sectorsLoaded = true;
        if ($scope.sectors.length == 0) {
            $scope.sectors.push({});
            var def = $q.defer();
            $sectorsDataFactory.query({offset: 0, limit: 10000, 'order_by[sector.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.sectors.length = 0;
                        for (var i in data.results) {
                            $scope.sectors.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.sectors);
                    }
                });
            });
            return def;
        } else {
            return $scope.sectors;
        }
    };

    $scope.getSectors();

    $scope.tenderTypes = [];
    $scope.tenderTypesLoaded = false;

    $scope.getTenderTypes = function() {
        $scope.tenderTypesLoaded = true;
        if ($scope.tenderTypes.length == 0) {
            $scope.tenderTypes.push({});
            var def = $q.defer();
            $tenderTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[tenderType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.tenderTypes.length = 0;
                        for (var i in data.results) {
                            $scope.tenderTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.tenderTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.tenderTypes;
        }
    };

    $scope.getTenderTypes();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({});
            var def = $q.defer();
            $usersDataFactory.query({offset: 0, limit: 10000, 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.users.length = 0;
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


    $scope.tenderCategories = [];
    $scope.tenderCategoriesLoaded = [];

    $scope.getTenderCategories = function() {
        $timeout(function(){
            if ($scope.tenderCategories.length == 0) {
                $scope.tenderCategories.push({});
                var def = $q.defer();
                $tenderCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[tenderCategory.id]': 'desc'}).$promise.then(function(data) {
                    $scope.tenderCategories = data.results;
                    def.resolve($scope.tenderCategories);
                });
                return def;
            } else {
                return $scope.tenderCategories;
            }
        });
    };

    $scope.getTenderCategories();

    $scope.textValue = function($scope, row) {
        return $scope.$eval('row.' + this.field);
    };

    $scope.trusted = {};

    $scope.linkValue = function($scope, row) {
        var value = row[this.field];
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var html = '<a ui-sref="'+this.state+'({id: ' + row.id + '})">' + value[this.displayField] + '</a>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.linksValue = function($scope, row) {
        var values = row[this.field];
        if (values.length == 0) {
            return '';
        }
        var links = [];
        for (var i in values) {
            links.push('<a ui-sref="'+this.state+'({id: ' + values[i].id + '})">' + values[i][this.displayField] + '</a>');
        }
        var html = links.join(', ');
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.evaluatedValue = function($scope, row) {
        var value = $scope.$eval('row.' + this.field, {row: row});
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        return $scope.$eval('\'' + value + '\' | ' + this.valueFormatter);
    };

    $scope.interpolatedValue = function($scope, row) {
        return this.interpolateExpr({
            row: row,
            statuses: $scope.statuses,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.tendersParams[param] = newValue;
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.tendersParams)) {
           $localStorage.tendersParams = {};
        }
        if (angular.isDefined($localStorage.tendersParams[param])) {
            return $localStorage.tendersParams[param];
        } else {
            $localStorage.tendersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'tender.id', filter: { 'tender.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'region', title: $filter('translate')('content.list.fields.REGION'), sortable: 'region.name', filter: { 'tender.region': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: $scope.getParamValue('region_id_show_filed', true), displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'tender.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', true), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'sector', title: $filter('translate')('content.list.fields.SECTOR'), sortable: 'sector.name', filter: { 'tender.sector': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSectors(), show: $scope.getParamValue('sector_id_show_filed', true), displayField: 'name', state: 'app.tenders.sectorsdetails' },
            { field: 'tender_type', title: $filter('translate')('content.list.fields.TENDERTYPE'), sortable: 'tender_type.name', filter: { 'tender.tenderType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenderTypes(), show: $scope.getParamValue('tender_type_id_show_filed', true), displayField: 'name', state: 'app.tenders.tendertypesdetails' },
            { field: 'bidding_type', title: $filter('translate')('content.list.fields.BIDDINGTYPE'), sortable: 'tender.biddingType', filter: { 'tender.biddingType': 'number' }, show: $scope.getParamValue('bidding_type_show_filed', true), getValue: $scope.textValue },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'tender.title', filter: { 'tender.title': 'text' }, show: $scope.getParamValue('title_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'tender.slug', filter: { 'tender.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'tender.reference', filter: { 'tender.reference': 'text' }, show: $scope.getParamValue('reference_show_filed', false), getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'tender.description', filter: { 'tender.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'details', title: $filter('translate')('content.list.fields.DETAILS'), sortable: 'tender.details', filter: { 'tender.details': 'text' }, show: $scope.getParamValue('details_show_filed', false), getValue: $scope.textValue },
            { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'tender.status', filter: { 'tender.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statuses, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'publish_date', title: $filter('translate')('content.list.fields.PUBLISHDATE'), sortable: 'tender.publishDate', filter: { 'tender.publishDate': 'text' }, show: $scope.getParamValue('publish_date_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'deadline', title: $filter('translate')('content.list.fields.DEADLINE'), sortable: 'tender.deadline', filter: { 'tender.deadline': 'text' }, show: $scope.getParamValue('deadline_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'estimated_cost', title: $filter('translate')('content.list.fields.ESTIMATEDCOST'), sortable: 'tender.estimatedCost', filter: { 'tender.estimatedCost': 'number' }, show: $scope.getParamValue('estimated_cost_show_filed', false), getValue: $scope.textValue },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'tender.address', filter: { 'tender.address': 'text' }, show: $scope.getParamValue('address_show_filed', false), getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'tender.email', filter: { 'tender.email': 'text' }, show: $scope.getParamValue('email_show_filed', false), getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'tender.phone', filter: { 'tender.phone': 'text' }, show: $scope.getParamValue('phone_show_filed', false), getValue: $scope.textValue },
            { field: 'attachment_file1', title: $filter('translate')('content.list.fields.ATTACHMENTFILE1'), sortable: 'tender.attachmentFile1', filter: { 'tender.attachmentFile1': 'text' }, show: $scope.getParamValue('attachment_file1_show_filed', false), getValue: $scope.textValue },
            { field: 'attachment_file2', title: $filter('translate')('content.list.fields.ATTACHMENTFILE2'), sortable: 'tender.attachmentFile2', filter: { 'tender.attachmentFile2': 'text' }, show: $scope.getParamValue('attachment_file2_show_filed', false), getValue: $scope.textValue },
            { field: 'attachment_file3', title: $filter('translate')('content.list.fields.ATTACHMENTFILE3'), sortable: 'tender.attachmentFile3', filter: { 'tender.attachmentFile3': 'text' }, show: $scope.getParamValue('attachment_file3_show_filed', false), getValue: $scope.textValue },
            { field: 'attachment_file4', title: $filter('translate')('content.list.fields.ATTACHMENTFILE4'), sortable: 'tender.attachmentFile4', filter: { 'tender.attachmentFile4': 'text' }, show: $scope.getParamValue('attachment_file4_show_filed', false), getValue: $scope.textValue },
            { field: 'source', title: $filter('translate')('content.list.fields.SOURCE'), sortable: 'tender.source', filter: { 'tender.source': 'text' }, show: $scope.getParamValue('source_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'tender.createdAt', filter: { 'tender.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'tender.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'tender.modifiedAt', filter: { 'tender.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'tender.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'tender_categories', title: $filter('translate')('content.list.fields.TENDERCATEGORIES'), show: $scope.getParamValue('tender_categories_show_filed', false), getValue: $scope.linksValue, state: 'app.tenders.tendercategoriesdetails', displayField: 'name' },            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<div class="btn-group pull-right">'
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

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: $scope.getParamValue('count', 50), // count per page
        sorting: $scope.getParamValue('sorting', {'tender.createdAt': 'desc'}),
        filter: $scope.getParamValue('filter', {})
    }, {
        getData: function ($defer, params) {
            var offset = (params.page() - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('sorting', order_by);
            $scope.setParamValue('filter', filters);
            $scope.setParamValue('count', limit);
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
            return $tendersDataFactory.query(http_params).$promise.then(function(data) {
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERTENDER'),
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
                $tendersDataFactory.remove(row).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.TENDERDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.TENDERNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.TENDERNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.marketplace.tendersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.tendersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.marketplace.tendersdetails', {id: row.id});
    };
}]);

