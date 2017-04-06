'use strict';

/**
 * Controller for Suppliers List
 */

app.controller('SuppliersCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$supplierTypesDataFactory', '$countriesDataFactory', '$languagesDataFactory', '$regionsDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$suppliersDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $supplierTypesDataFactory, $countriesDataFactory, $languagesDataFactory, $regionsDataFactory, $usersDataFactory, $categoriesDataFactory, $suppliersDataFactory) {


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

    $scope.supplierTypes = [];
    $scope.supplierTypesLoaded = false;

    $scope.getSupplierTypes = function() {
        $scope.supplierTypesLoaded = true;
        if ($scope.supplierTypes.length == 0) {
            $scope.supplierTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTSUPPLIERTYPE')});
            var def = $q.defer();
            $supplierTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[supplierType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.supplierTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.supplierTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.supplierTypes;
        }
    };

    $scope.getSupplierTypes();

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $scope.countriesLoaded = true;
        if ($scope.countries.length == 0) {
            $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
            var def = $q.defer();
            $countriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[country.id]': 'desc'}).$promise.then(function(data) {
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
            $languagesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[language.id]': 'desc'}).$promise.then(function(data) {
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
            $scope.regions.push({id: '', title: $filter('translate')('content.form.messages.SELECTREGION')});
            var def = $q.defer();
            $regionsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[region.id]': 'desc'}).$promise.then(function(data) {
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
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTUSER')});
            var def = $q.defer();
            $usersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
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


    $scope.categories = [];
    $scope.categoriesLoaded = [];

    $scope.getCategories = function() {
        if ($scope.categories.length == 0) {
            $scope.categories.push({});
            var def = $q.defer();
            $categoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[category.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.categories.length = 0;
                        for (var i in data.results) {
                            $scope.categories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.categories);
                    }
                });
            });
            return def;
        } else {
            return $scope.categories;
        }
    };

    $scope.getCategories();

    $scope.textValue = function($scope, row) {
        return $scope.$eval('row.' + this.field);
    };

    $scope.trusted = {};

    $scope.linkValue = function($scope, row) {
        var value = row[this.field];
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var displayFields = this.displayField.split(' ');
        var displayText = ''
        for (var i in displayFields) {
            if (angular.isDefined(value[displayFields[i]])) {
                displayText += value[displayFields[i]] + ' ';
            }
        }
        var html = '';
        if ($rootScope.checkStatePermission(this.state)) {
            html += '<a ui-sref="'+this.state+'({id: ' + value.id + '})">';
            html += displayText.trim();
            html += '</a>';
        } else {
            html += displayText.trim();
        }
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.linksValue = function($scope, row) {
        var values = row[this.field];
        if (values.length == 0) {
            return '';
        }
        var links = [];
        for (var i in values) {
            var link = '';
            if ($rootScope.checkStatePermission(this.state)) {
                link += '<a ui-sref="'+this.state+'({id: ' + values[i].id + '})">';
            }
            var displayFields = this.displayField.split(' ');
            for (var j in displayFields) {
                link += values[i][displayFields[j]] + ' ';
            }
            link = link.trim();
            if ($rootScope.checkStatePermission(this.state)) {
                link += '</a>';
            }
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
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.suppliersParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.suppliersParams)) {
           $localStorage.suppliersParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.suppliersParams[param]) && $localStorage.suppliersParams[param] != null) {
            return $localStorage.suppliersParams[param];
        } else {
            $localStorage.suppliersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'supplier.id', filter: { 'supplier.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'supplier_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.SUPPLIERTYPE'), sortable: 'supplier_type.name', filter: { 'supplier.supplierType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSupplierTypes(), show: ($scope.getParamValue('supplier_type_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.lists.suppliertypesdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'supplier.name', filter: { 'supplier.name': 'text' }, show: ($scope.getParamValue('name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'supplier.email', filter: { 'supplier.email': 'text' }, show: ($scope.getParamValue('email_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'supplier.phone', filter: { 'supplier.phone': 'text' }, show: ($scope.getParamValue('phone_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'supplier.firstName', filter: { 'supplier.firstName': 'text' }, show: ($scope.getParamValue('first_name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'supplier.lastName', filter: { 'supplier.lastName': 'text' }, show: ($scope.getParamValue('last_name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'job', title: $filter('translate')('content.list.fields.JOB'), sortable: 'supplier.job', filter: { 'supplier.job': 'text' }, show: ($scope.getParamValue('job_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'company_name', title: $filter('translate')('content.list.fields.COMPANYNAME'), sortable: 'supplier.companyName', filter: { 'supplier.companyName': 'text' }, show: ($scope.getParamValue('company_name_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'supplier.address', filter: { 'supplier.address': 'text' }, show: ($scope.getParamValue('address_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'supplier.description', filter: { 'supplier.description': 'text' }, show: ($scope.getParamValue('description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'zip_code', title: $filter('translate')('content.list.fields.ZIPCODE'), sortable: 'supplier.zipCode', filter: { 'supplier.zipCode': 'text' }, show: ($scope.getParamValue('zip_code_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'city', title: $filter('translate')('content.list.fields.CITY'), sortable: 'supplier.city', filter: { 'supplier.city': 'text' }, show: ($scope.getParamValue('city_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'country', 'class': 'has_one', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'supplier.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: ($scope.getParamValue('country_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'fax', title: $filter('translate')('content.list.fields.FAX'), sortable: 'supplier.fax', filter: { 'supplier.fax': 'text' }, show: ($scope.getParamValue('fax_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'website', title: $filter('translate')('content.list.fields.WEBSITE'), sortable: 'supplier.website', filter: { 'supplier.website': 'text' }, show: ($scope.getParamValue('website_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'supplier.picture', filter: { 'supplier.picture': 'text' }, show: ($scope.getParamValue('picture_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'main_products_services', title: $filter('translate')('content.list.fields.MAINPRODUCTSSERVICES'), sortable: 'supplier.mainProductsServices', filter: { 'supplier.mainProductsServices': 'text' }, show: ($scope.getParamValue('main_products_services_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'total_revenu', title: $filter('translate')('content.list.fields.TOTALREVENU'), sortable: 'supplier.totalRevenu', filter: { 'supplier.totalRevenu': 'text' }, show: ($scope.getParamValue('total_revenu_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'first_market_region', 'class': 'has_one', title: $filter('translate')('content.list.fields.FIRSTMARKETREGION'), sortable: 'first_market_region.name', filter: { 'supplier.firstMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: ($scope.getParamValue('first_market_region_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'first_market_rate', title: $filter('translate')('content.list.fields.FIRSTMARKETRATE'), sortable: 'supplier.firstMarketRate', filter: { 'supplier.firstMarketRate': 'number' }, show: ($scope.getParamValue('first_market_rate_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'second_market_region', 'class': 'has_one', title: $filter('translate')('content.list.fields.SECONDMARKETREGION'), sortable: 'second_market_region.name', filter: { 'supplier.secondMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: ($scope.getParamValue('second_market_region_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'second_market_rate', title: $filter('translate')('content.list.fields.SECONDMARKETRATE'), sortable: 'supplier.secondMarketRate', filter: { 'supplier.secondMarketRate': 'number' }, show: ($scope.getParamValue('second_market_rate_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'third_market_region', 'class': 'has_one', title: $filter('translate')('content.list.fields.THIRDMARKETREGION'), sortable: 'third_market_region.name', filter: { 'supplier.thirdMarketRegion': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: ($scope.getParamValue('third_market_region_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'third_market_rate', title: $filter('translate')('content.list.fields.THIRDMARKETRATE'), sortable: 'supplier.thirdMarketRate', filter: { 'supplier.thirdMarketRate': 'number' }, show: ($scope.getParamValue('third_market_rate_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'reference_number', title: $filter('translate')('content.list.fields.REFERENCENUMBER'), sortable: 'supplier.referenceNumber', filter: { 'supplier.referenceNumber': 'text' }, show: ($scope.getParamValue('reference_number_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'language', 'class': 'has_one', title: $filter('translate')('content.list.fields.LANGUAGE'), sortable: 'language.name', filter: { 'supplier.language': 'select' }, getValue: $scope.linkValue, filterData: $scope.getLanguages(), show: ($scope.getParamValue('language_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.settings.languagesdetails' },
            { field: 'is_public', title: $filter('translate')('content.list.fields.ISPUBLIC'), sortable: 'supplier.isPublic', filter: { 'supplier.isPublic': 'select' }, show: ($scope.getParamValue('is_public_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_public ]]"></span>') },
            { field: 'enable_comment', title: $filter('translate')('content.list.fields.ENABLECOMMENT'), sortable: 'supplier.enableComment', filter: { 'supplier.enableComment': 'select' }, show: ($scope.getParamValue('enable_comment_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_comment ]]"></span>') },
            { field: 'enable_private_message', title: $filter('translate')('content.list.fields.ENABLEPRIVATEMESSAGE'), sortable: 'supplier.enablePrivateMessage', filter: { 'supplier.enablePrivateMessage': 'select' }, show: ($scope.getParamValue('enable_private_message_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_private_message ]]"></span>') },
            { field: 'enable_share', title: $filter('translate')('content.list.fields.ENABLESHARE'), sortable: 'supplier.enableShare', filter: { 'supplier.enableShare': 'select' }, show: ($scope.getParamValue('enable_share_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.enable_share ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'supplier.createdAt', filter: { 'supplier.createdAt': 'text' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'supplier.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'supplier.modifiedAt', filter: { 'supplier.modifiedAt': 'text' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'supplier.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'categories', 'class': 'has_nany', title: $filter('translate')('content.list.fields.CATEGORIES'), filter: { 'supplier.categories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCategories(), show: ($scope.getParamValue('categories_show_filed', false) && true), displayInList: true, display: false, displayField: 'name', state: 'app.lists.categoriesdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
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

    $scope.isFiltersVisible = $scope.getParamValue('suppliersIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('suppliersIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('suppliersPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('suppliersCount', $scope.count);
    $scope.sorting = {'supplier.id': 'asc'};
    $scope.sorting = $scope.getParamValue('suppliersSorting', $scope.sorting);
    $scope.filter = {
        categories: []
    };
    $scope.filter = $scope.getParamValue('suppliersFilter', $scope.filter);
    $scope.setParamValue('suppliersPage', $scope.page);
    $scope.setParamValue('suppliersCount', $scope.count);
    $scope.setParamValue('suppliersSorting', $scope.sorting);
    $scope.setParamValue('suppliersFilter', $scope.filter);
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
            $scope.setParamValue('suppliersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('suppliersPage', current);
            $scope.setParamValue('suppliersCount', limit);
            $scope.setParamValue('suppliersSorting', order_by);
            $scope.setParamValue('suppliersFilter', filters);
            var http_params = {
                locale: $localStorage.language,
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
            return $suppliersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERSUPPLIER'),
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
                $suppliersDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.SUPPLIERDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.SUPPLIERNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.SUPPLIERNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.marketplace.suppliersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.marketplace.suppliersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.marketplace.suppliersdetails', {id: row.id});
    };
}]);

