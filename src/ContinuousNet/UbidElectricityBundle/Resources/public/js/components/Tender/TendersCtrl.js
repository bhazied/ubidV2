'use strict';

/**
 * Controller for Tenders List
 */

app.controller('TendersCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$buyersDataFactory', '$suppliersDataFactory', '$regionsDataFactory', '$countriesDataFactory', '$sectorsDataFactory', '$tenderTypesDataFactory', '$biddingTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory', '$languagesDataFactory', '$tendersDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $buyersDataFactory, $suppliersDataFactory, $regionsDataFactory, $countriesDataFactory, $sectorsDataFactory, $tenderTypesDataFactory, $biddingTypesDataFactory, $usersDataFactory, $categoriesDataFactory, $languagesDataFactory, $tendersDataFactory) {

    $scope.sectionsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Consultation',
        title: $filter('translate')('content.list.fields.sections.CONSULTATION'),
        css: 'primary'
    }, {
        id: 'Tender',
        title: $filter('translate')('content.list.fields.sections.TENDER'),
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

    $scope.buyers = [];
    $scope.buyersLoaded = false;

    $scope.getBuyers = function() {
        $scope.buyersLoaded = true;
        if ($scope.buyers.length == 0) {
            $scope.buyers.push({id: '', title: $filter('translate')('content.form.messages.SELECTBUYER')});
            var def = $q.defer();
            $buyersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[buyer.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.buyers.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.buyers);
                    }
                });
            });
            return def;
        } else {
            return $scope.buyers;
        }
    };

    $scope.getBuyers();

    $scope.suppliers = [];
    $scope.suppliersLoaded = false;

    $scope.getSuppliers = function() {
        $scope.suppliersLoaded = true;
        if ($scope.suppliers.length == 0) {
            $scope.suppliers.push({id: '', title: $filter('translate')('content.form.messages.SELECTSUPPLIER')});
            var def = $q.defer();
            $suppliersDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[supplier.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.suppliers.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.suppliers);
                    }
                });
            });
            return def;
        } else {
            return $scope.suppliers;
        }
    };

    $scope.getSuppliers();

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

    $scope.sectors = [];
    $scope.sectorsLoaded = false;

    $scope.getSectors = function() {
        $scope.sectorsLoaded = true;
        if ($scope.sectors.length == 0) {
            $scope.sectors.push({id: '', title: $filter('translate')('content.form.messages.SELECTSECTOR')});
            var def = $q.defer();
            $sectorsDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[sector.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
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
            $scope.tenderTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTTENDERTYPE')});
            var def = $q.defer();
            $tenderTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[tenderType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
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

    $scope.biddingTypes = [];
    $scope.biddingTypesLoaded = false;

    $scope.getBiddingTypes = function() {
        $scope.biddingTypesLoaded = true;
        if ($scope.biddingTypes.length == 0) {
            $scope.biddingTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTBIDDINGTYPE')});
            var def = $q.defer();
            $biddingTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[biddingType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.biddingTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.biddingTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.biddingTypes;
        }
    };

    $scope.getBiddingTypes();

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

    $scope.languages = [];
    $scope.languagesLoaded = [];

    $scope.getLanguages = function() {
        if ($scope.languages.length == 0) {
            $scope.languages.push({});
            var def = $q.defer();
            $languagesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[language.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.languages.length = 0;
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
                if (angular.isDefined(values[i][displayFields[j]])) {
                    link += values[i][displayFields[j]] + ' ';
                }
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
            sections: $scope.sectionsOptions,
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.tendersParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.tendersParams)) {
           $localStorage.tendersParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.tendersParams[param]) && $localStorage.tendersParams[param] != null) {
            return $localStorage.tendersParams[param];
        } else {
            $localStorage.tendersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'tender.id', filter: { 'tender.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'section', 'class': 'enum', title: $filter('translate')('content.list.fields.SECTION'), sortable: 'tender.section', filter: { 'tender.section': 'select' }, show: ($scope.getParamValue('section_show_filed', true) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.sectionsOptions, interpolateExpr: $interpolate('<span class="tenderSection" my-enum="[[ row.section ]]" my-enum-list=\'[[ sections ]]\'></span>') },
            { field: 'buyer', 'class': 'has_one', title: $filter('translate')('content.list.fields.BUYER'), sortable: 'buyer.name', filter: { 'tender.buyer': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyers(), show: ($scope.getParamValue('buyer_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.marketplace.buyersdetails' },
            { field: 'supplier', 'class': 'has_one', title: $filter('translate')('content.list.fields.SUPPLIER'), sortable: 'supplier.name', filter: { 'tender.supplier': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSuppliers(), show: ($scope.getParamValue('supplier_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.marketplace.suppliersdetails' },
            { field: 'tender_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.TENDERTYPE'), sortable: 'tender_type.name', filter: { 'tender.tenderType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenderTypes(), show: ($scope.getParamValue('tender_type_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.lists.tendertypesdetails' },
            { field: 'bidding_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.BIDDINGTYPE'), sortable: 'bidding_type.name', filter: { 'tender.biddingType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBiddingTypes(), show: ($scope.getParamValue('bidding_type_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.lists.biddingtypesdetails' },
            { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'tender.reference', filter: { 'tender.reference': 'text' }, show: ($scope.getParamValue('reference_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'tender.title', filter: { 'tender.title': 'text' }, show: ($scope.getParamValue('title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'tender.description', filter: { 'tender.description': 'text' }, show: ($scope.getParamValue('description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'fees', title: $filter('translate')('content.list.fields.FEES'), sortable: 'tender.fees', filter: { 'tender.fees': 'number' }, show: ($scope.getParamValue('fees_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'tender.slug', filter: { 'tender.slug': 'text' }, show: ($scope.getParamValue('slug_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'estimated_cost', title: $filter('translate')('content.list.fields.ESTIMATEDCOST'), sortable: 'tender.estimatedCost', filter: { 'tender.estimatedCost': 'number' }, show: ($scope.getParamValue('estimated_cost_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'sector', 'class': 'has_one', title: $filter('translate')('content.list.fields.SECTOR'), sortable: 'sector.name', filter: { 'tender.sector': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSectors(), show: ($scope.getParamValue('sector_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.lists.sectorsdetails' },
            { field: 'deadline', title: $filter('translate')('content.list.fields.DEADLINE'), sortable: 'tender.deadline', filter: { 'tender.deadline': 'number' }, show: ($scope.getParamValue('deadline_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'publish_date', title: $filter('translate')('content.list.fields.PUBLISHDATE'), sortable: 'tender.publishDate', filter: { 'tender.publishDate': 'number' }, show: ($scope.getParamValue('publish_date_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'tender.status', filter: { 'tender.status': 'select' }, show: ($scope.getParamValue('status_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="tenderStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'region', 'class': 'has_one', title: $filter('translate')('content.list.fields.REGION'), sortable: 'region.name', filter: { 'tender.region': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: ($scope.getParamValue('region_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.settings.regionsdetails' },
            { field: 'country', 'class': 'has_one', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'tender.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: ($scope.getParamValue('country_show_filed', false) && true), displayInList: true, displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'attachment_files', title: $filter('translate')('content.list.fields.ATTACHMENTFILES'), sortable: 'tender.attachmentFiles', filter: { 'tender.attachmentFiles': 'text' }, show: ($scope.getParamValue('attachment_files_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'validated', title: $filter('translate')('content.list.fields.VALIDATED'), sortable: 'tender.validated', filter: { 'tender.validated': 'select' }, show: ($scope.getParamValue('validated_show_filed', false) && ($rootScope.currentUser.roles.join('').indexOf('ADM') > -1)), displayInList: ($rootScope.currentUser.roles.join('').indexOf('ADM') > -1), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.validated ]]"></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'tender.createdAt', filter: { 'tender.createdAt': 'text' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'tender.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'tender.modifiedAt', filter: { 'tender.modifiedAt': 'text' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'tender.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'categories', 'class': 'has_nany', title: $filter('translate')('content.list.fields.CATEGORIES'), filter: { 'tender.categories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCategories(), show: ($scope.getParamValue('categories_show_filed', false) && true), displayInList: true, display: false, displayField: 'name', state: 'app.lists.categoriesdetails' },
            { field: 'languages', 'class': 'has_nany', title: $filter('translate')('content.list.fields.LANGUAGES'), filter: { 'tender.languages': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getLanguages(), show: ($scope.getParamValue('languages_show_filed', false) && true), displayInList: true, display: false, displayField: 'name', state: 'app.settings.languagesdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('tendersIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('tendersIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('tendersPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('tendersCount', $scope.count);
    $scope.sorting = {'tender.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('tendersSorting', $scope.sorting);
    $scope.filter = {
        categories: [],
        languages: []
    };
    $scope.filter = $scope.getParamValue('tendersFilter', $scope.filter);
    $scope.setParamValue('tendersPage', $scope.page);
    $scope.setParamValue('tendersCount', $scope.count);
    $scope.setParamValue('tendersSorting', $scope.sorting);
    $scope.setParamValue('tendersFilter', $scope.filter);
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
            $scope.setParamValue('tendersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('tendersPage', current);
            $scope.setParamValue('tendersCount', limit);
            $scope.setParamValue('tendersSorting', order_by);
            $scope.setParamValue('tendersFilter', filters);
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
            return $tendersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
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
                $tendersDataFactory.remove({id: row.id}).$promise.then(function(data) {
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

