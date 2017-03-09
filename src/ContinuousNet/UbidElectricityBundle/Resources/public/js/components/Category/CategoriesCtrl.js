'use strict';

/**
 * Controller for Categories List
 */

app.controller('CategoriesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$productTypesDataFactory', '$usersDataFactory', '$categoriesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $productTypesDataFactory, $usersDataFactory, $categoriesDataFactory) {

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

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.categories = [];
    $scope.categoriesLoaded = false;

    $scope.getCategories = function() {
        $scope.categoriesLoaded = true;
        if ($scope.categories.length == 0) {
            $scope.categories.push({id: '', title: $filter('translate')('content.form.messages.SELECTCATEGORY')});
            var def = $q.defer();
            $categoriesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[category.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        data.results = $rootScope.createTree(data.results, 'parent_category_id', 'name', null, 0);
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

    $scope.productTypes = [];
    $scope.productTypesLoaded = false;

    $scope.getProductTypes = function() {
        $scope.productTypesLoaded = true;
        if ($scope.productTypes.length == 0) {
            $scope.productTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRODUCTTYPE')});
            var def = $q.defer();
            $productTypesDataFactory.query({locale: $localStorage.language, offset: 0, limit: 10000, 'order_by[productType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.productTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.productTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.productTypes;
        }
    };

    $scope.getProductTypes();

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
            displayText += value[displayFields[i]] + ' ';
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
        $localStorage.categoriesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.categoriesParams)) {
           $localStorage.categoriesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.categoriesParams[param]) && $localStorage.categoriesParams[param] != null) {
            return $localStorage.categoriesParams[param];
        } else {
            $localStorage.categoriesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'category.id', filter: { 'category.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'category.name', filter: { 'category.name': 'text' }, show: ($scope.getParamValue('name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'category.slug', filter: { 'category.slug': 'text' }, show: ($scope.getParamValue('slug_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'category.picture', filter: { 'category.picture': 'text' }, show: ($scope.getParamValue('picture_show_filed', true) && true), displayInList: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'category.description', filter: { 'category.description': 'text' }, show: ($scope.getParamValue('description_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'parent_category', 'class': 'has_one', title: $filter('translate')('content.list.fields.PARENTCATEGORY'), sortable: 'parent_category.name', filter: { 'category.parentCategory': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCategories(), show: ($scope.getParamValue('parent_category_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.lists.categoriesdetails' },
            { field: 'product_type', 'class': 'has_one', title: $filter('translate')('content.list.fields.PRODUCTTYPE'), sortable: 'product_type.name', filter: { 'category.productType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getProductTypes(), show: ($scope.getParamValue('product_type_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.lists.producttypesdetails' },
            { field: 'meta_title', title: $filter('translate')('content.list.fields.METATITLE'), sortable: 'category.metaTitle', filter: { 'category.metaTitle': 'text' }, show: ($scope.getParamValue('meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'meta_description', title: $filter('translate')('content.list.fields.METADESCRIPTION'), sortable: 'category.metaDescription', filter: { 'category.metaDescription': 'text' }, show: ($scope.getParamValue('meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'meta_keywords', title: $filter('translate')('content.list.fields.METAKEYWORDS'), sortable: 'category.metaKeywords', filter: { 'category.metaKeywords': 'text' }, show: ($scope.getParamValue('meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tenders_meta_title', title: $filter('translate')('content.list.fields.TENDERSMETATITLE'), sortable: 'category.tendersMetaTitle', filter: { 'category.tendersMetaTitle': 'text' }, show: ($scope.getParamValue('tenders_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tenders_meta_description', title: $filter('translate')('content.list.fields.TENDERSMETADESCRIPTION'), sortable: 'category.tendersMetaDescription', filter: { 'category.tendersMetaDescription': 'text' }, show: ($scope.getParamValue('tenders_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tenders_meta_keywords', title: $filter('translate')('content.list.fields.TENDERSMETAKEYWORDS'), sortable: 'category.tendersMetaKeywords', filter: { 'category.tendersMetaKeywords': 'text' }, show: ($scope.getParamValue('tenders_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'consultations_meta_title', title: $filter('translate')('content.list.fields.CONSULTATIONSMETATITLE'), sortable: 'category.consultationsMetaTitle', filter: { 'category.consultationsMetaTitle': 'text' }, show: ($scope.getParamValue('consultations_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'consultations_meta_description', title: $filter('translate')('content.list.fields.CONSULTATIONSMETADESCRIPTION'), sortable: 'category.consultationsMetaDescription', filter: { 'category.consultationsMetaDescription': 'text' }, show: ($scope.getParamValue('consultations_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'consultations_meta_keywords', title: $filter('translate')('content.list.fields.CONSULTATIONSMETAKEYWORDS'), sortable: 'category.consultationsMetaKeywords', filter: { 'category.consultationsMetaKeywords': 'text' }, show: ($scope.getParamValue('consultations_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'buyers_meta_title', title: $filter('translate')('content.list.fields.BUYERSMETATITLE'), sortable: 'category.buyersMetaTitle', filter: { 'category.buyersMetaTitle': 'text' }, show: ($scope.getParamValue('buyers_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'buyers_meta_description', title: $filter('translate')('content.list.fields.BUYERSMETADESCRIPTION'), sortable: 'category.buyersMetaDescription', filter: { 'category.buyersMetaDescription': 'text' }, show: ($scope.getParamValue('buyers_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'buyers_meta_keywords', title: $filter('translate')('content.list.fields.BUYERSMETAKEYWORDS'), sortable: 'category.buyersMetaKeywords', filter: { 'category.buyersMetaKeywords': 'text' }, show: ($scope.getParamValue('buyers_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'suppliers_meta_title', title: $filter('translate')('content.list.fields.SUPPLIERSMETATITLE'), sortable: 'category.suppliersMetaTitle', filter: { 'category.suppliersMetaTitle': 'text' }, show: ($scope.getParamValue('suppliers_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'suppliers_meta_description', title: $filter('translate')('content.list.fields.SUPPLIERSMETADESCRIPTION'), sortable: 'category.suppliersMetaDescription', filter: { 'category.suppliersMetaDescription': 'text' }, show: ($scope.getParamValue('suppliers_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'suppliers_meta_keywords', title: $filter('translate')('content.list.fields.SUPPLIERSMETAKEYWORDS'), sortable: 'category.suppliersMetaKeywords', filter: { 'category.suppliersMetaKeywords': 'text' }, show: ($scope.getParamValue('suppliers_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'category.ordering', filter: { 'category.ordering': 'number' }, show: ($scope.getParamValue('ordering_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'status', 'class': 'enum', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'category.status', filter: { 'category.status': 'select' }, show: ($scope.getParamValue('status_show_filed', false) && ($rootScope.currentUser.roles.join('').indexOf('ROLE_ADMIN_PUBLISHER') > -1)), displayInList: ($rootScope.currentUser.roles.join('').indexOf('ROLE_ADMIN_PUBLISHER') > -1), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span class="categoryStatus" my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'category.createdAt', filter: { 'category.createdAt': 'number' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'category.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'category.modifiedAt', filter: { 'category.modifiedAt': 'number' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'category.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('categoriesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('categoriesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('categoriesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('categoriesCount', $scope.count);
    $scope.sorting = {'category.name': 'asc'};
    $scope.sorting = $scope.getParamValue('categoriesSorting', $scope.sorting);
    $scope.filter = {
        suppliers: [],
        tenders: []
    };
    $scope.filter = $scope.getParamValue('categoriesFilter', $scope.filter);
    $scope.setParamValue('categoriesPage', $scope.page);
    $scope.setParamValue('categoriesCount', $scope.count);
    $scope.setParamValue('categoriesSorting', $scope.sorting);
    $scope.setParamValue('categoriesFilter', $scope.filter);
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
            $scope.setParamValue('categoriesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('categoriesPage', current);
            $scope.setParamValue('categoriesCount', limit);
            $scope.setParamValue('categoriesSorting', order_by);
            $scope.setParamValue('categoriesFilter', filters);
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
            return $categoriesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERCATEGORY'),
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
                $categoriesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.CATEGORYDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.CATEGORYNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.CATEGORYNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.lists.categoriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.lists.categoriesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.lists.categoriesdetails', {id: row.id});
    };
}]);

