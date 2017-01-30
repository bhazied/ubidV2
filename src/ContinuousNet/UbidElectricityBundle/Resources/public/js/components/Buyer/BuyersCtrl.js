'use strict';

/**
 * Controller for Buyers List
 */

app.controller('BuyersCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyerTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$buyersDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyerTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $buyersDataFactory) {


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

    $scope.buyerTypes = [];
    $scope.buyerTypesLoaded = false;

    $scope.getBuyerTypes = function() {
        $scope.buyerTypesLoaded = true;
        if ($scope.buyerTypes.length == 0) {
            $scope.buyerTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTBUYERTYPE')});
            var def = $q.defer();
            $buyerTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[buyerType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.buyerTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.buyerTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.buyerTypes;
        }
    };

    $scope.getBuyerTypes();

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

    $scope.languages = [];
    $scope.languagesLoaded = false;

    $scope.getLanguages = function() {
        $scope.languagesLoaded = true;
        if ($scope.languages.length == 0) {
            $scope.languages.push({id: '', title: $filter('translate')('content.form.messages.SELECTLANGUAGE')});
            var def = $q.defer();
            $languagesDataFactory.query({offset: 0, limit: 10000, 'order_by[language.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.languages.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.languages);
                    }
                });
            });
            return def;
        } else {
            return $scope.languages;
        }
    };

    $scope.getLanguages();

    $scope.regions = [];
    $scope.regionsLoaded = false;

    $scope.getRegions = function() {
        $scope.regionsLoaded = true;
        if ($scope.regions.length == 0) {
            $scope.regions.push({id: '', title: $filter('translate')('content.form.messages.SELECTFIRSTMARKETREGION')});
            var def = $q.defer();
            $regionsDataFactory.query({offset: 0, limit: 10000, 'order_by[region.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
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
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.buyersParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.buyersParams)) {
           $localStorage.buyersParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.buyersParams[param]) && $localStorage.buyersParams[param] != null) {
            return $localStorage.buyersParams[param];
        } else {
            $localStorage.buyersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'buyer.id', filter: { 'buyer.id': 'number' }, displayInList: true, getValue: $scope.textValue },
            { field: 'buyer_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.BUYERTYPE'), sortable: 'buyer_type.name', filter: { 'buyer.buyerType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyerTypes(), displayInList: true, displayField: 'name', state: 'app.lists.buyertypesdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'buyer.name', filter: { 'buyer.name': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'buyer.email', filter: { 'buyer.email': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'buyer.phone', filter: { 'buyer.phone': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'buyer.firstName', filter: { 'buyer.firstName': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'buyer.lastName', filter: { 'buyer.lastName': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'job', title: $filter('translate')('content.list.fields.JOB'), sortable: 'buyer.job', filter: { 'buyer.job': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'buyer.companyName', filter: { 'buyer.companyName': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'buyer.address', filter: { 'buyer.address': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'buyer.description', filter: { 'buyer.description': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'zip_code', title: $filter('translate')('content.list.fields.ZIPCODE'), sortable: 'buyer.zipCode', filter: { 'buyer.zipCode': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'city', title: $filter('translate')('content.list.fields.CITY'), sortable: 'buyer.city', filter: { 'buyer.city': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'country', 'class': 'has_one', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'buyer.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), displayInList: true, displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'fax', title: $filter('translate')('content.list.fields.FAX'), sortable: 'buyer.fax', filter: { 'buyer.fax': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'website', title: $filter('translate')('content.list.fields.WEBSITE'), sortable: 'buyer.website', filter: { 'buyer.website': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'buyer.picture', filter: { 'buyer.picture': 'text' }, displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'main_products_services', title: $filter('translate')('content.list.fields.MAINPRODUCTSSERVICES'), sortable: 'buyer.mainProductsServices', filter: { 'buyer.mainProductsServices': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'total_revenu', title: $filter('translate')('content.list.fields.TOTALREVENU'), sortable: 'buyer.totalRevenu', filter: { 'buyer.totalRevenu': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'first_market_region', 'class': 'has_one', title: $filter('translate')('content.list.fields.FIRSTMARKETREGION'), sortable: 'first_market_region.name', filter: { 'buyer.firstMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), displayInList: true, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'first_market_rate', title: $filter('translate')('content.list.fields.FIRSTMARKETRATE'), sortable: 'buyer.firstMarketRate', filter: { 'buyer.firstMarketRate': 'number' }, displayInList: true, getValue: $scope.textValue },
            { field: 'second_market_region', 'class': 'has_one', title: $filter('translate')('content.list.fields.SECONDMARKETREGION'), sortable: 'second_market_region.name', filter: { 'buyer.secondMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), displayInList: true, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'second_market_rate', title: $filter('translate')('content.list.fields.SECONDMARKETRATE'), sortable: 'buyer.secondMarketRate', filter: { 'buyer.secondMarketRate': 'number' }, displayInList: true, getValue: $scope.textValue },
            { field: 'third_market_region', 'class': 'has_one', title: $filter('translate')('content.list.fields.THIRDMARKETREGION'), sortable: 'third_market_region.name', filter: { 'buyer.thirdMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), displayInList: true, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'third_market_rate', title: $filter('translate')('content.list.fields.THIRDMARKETRATE'), sortable: 'buyer.thirdMarketRate', filter: { 'buyer.thirdMarketRate': 'number' }, displayInList: true, getValue: $scope.textValue },
            { field: 'reference_number', title: $filter('translate')('content.list.fields.REFERENCENUMBER'), sortable: 'buyer.referenceNumber', filter: { 'buyer.referenceNumber': 'text' }, displayInList: true, getValue: $scope.textValue },
            { field: 'language', 'class': 'has_one', title: $filter('translate')('content.list.fields.LANGUAGE'), sortable: 'language.name', filter: { 'buyer.language': 'select' }, getValue: $scope.linkValue, filterData: $scope.getLanguages(), displayInList: true, displayField: 'name', state: 'app.settings.languagesdetails' },
            { field: 'is_public', title: $filter('translate')('content.list.fields.ISPUBLIC'), sortable: 'buyer.isPublic', filter: { 'buyer.isPublic': 'select' }, displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_public ]]"></span>') },
            { field: 'enable_comment', title: $filter('translate')('content.list.fields.ENABLECOMMENT'), sortable: 'buyer.enableComment', filter: { 'buyer.enableComment': 'select' }, displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_comment ]]"></span>') },
            { field: 'enable_private_message', title: $filter('translate')('content.list.fields.ENABLEPRIVATEMESSAGE'), sortable: 'buyer.enablePrivateMessage', filter: { 'buyer.enablePrivateMessage': 'select' }, displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_private_message ]]"></span>') },
            { field: 'enable_share', title: $filter('translate')('content.list.fields.ENABLESHARE'), sortable: 'buyer.enableShare', filter: { 'buyer.enableShare': 'select' }, displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_share ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'buyer.createdAt', filter: { 'buyer.createdAt': 'text' }, displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'buyer.modifiedAt', filter: { 'buyer.modifiedAt': 'text' }, displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'buyer.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'buyer.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('buyersIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('buyersIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('buyersPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('buyersCount', $scope.count);
    $scope.sorting = {'buyer.id': 'asc'};
    $scope.sorting = $scope.getParamValue('buyersSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('buyersFilter', $scope.filter);
    $scope.setParamValue('buyersPage', $scope.page);
    $scope.setParamValue('buyersCount', $scope.count);
    $scope.setParamValue('buyersSorting', $scope.sorting);
    $scope.setParamValue('buyersFilter', $scope.filter);
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
            $scope.setParamValue('buyersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('buyersPage', current);
            $scope.setParamValue('buyersCount', limit);
            $scope.setParamValue('buyersSorting', order_by);
            $scope.setParamValue('buyersFilter', filters);
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
            return $buyersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERBUYER'),
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
                $buyersDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.BUYERDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.BUYERNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.BUYERNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.marketplace.buyersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.buyersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.marketplace.buyersdetails', {id: row.id});
    };
}]);

