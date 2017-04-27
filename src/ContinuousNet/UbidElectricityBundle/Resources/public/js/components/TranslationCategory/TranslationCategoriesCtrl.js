'use strict';

/**
 * Controller for Translation Categories List
 */

app.controller('TranslationCategoriesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$categoriesDataFactory', '$usersDataFactory', '$translationCategoriesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $categoriesDataFactory, $usersDataFactory, $translationCategoriesDataFactory) {


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
                        data.results = $rootScope.createTree(data.results, 'parent_category', 'name', null, 0);
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
        $localStorage.translationCategoriesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.translationCategoriesParams)) {
           $localStorage.translationCategoriesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && typeof $stateParams[param] == 'string' && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($stateParams[param]) && $stateParams[param] != null) {
            return $stateParams[param];
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.translationCategoriesParams[param]) && $localStorage.translationCategoriesParams[param] != null) {
            return $localStorage.translationCategoriesParams[param];
        } else {
            $localStorage.translationCategoriesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'translationCategory.id', filter: { 'translationCategory.id': 'number' }, show: ($scope.getParamValue('id_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'category', 'class': 'has_one', title: $filter('translate')('content.list.fields.CATEGORY'), sortable: 'category.name', filter: { 'translationCategory.category': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCategories(), show: ($scope.getParamValue('category_id_show_filed', true) && true), displayInList: true, displayField: 'name', state: 'app.lists.categoriesdetails' },
            { field: 'locale', title: $filter('translate')('content.list.fields.LOCALE'), sortable: 'translationCategory.locale', filter: { 'translationCategory.locale': 'text' }, show: ($scope.getParamValue('locale_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'translationCategory.name', filter: { 'translationCategory.name': 'text' }, show: ($scope.getParamValue('name_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'translationCategory.description', filter: { 'translationCategory.description': 'text' }, show: ($scope.getParamValue('description_show_filed', true) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'meta_title', title: $filter('translate')('content.list.fields.METATITLE'), sortable: 'translationCategory.metaTitle', filter: { 'translationCategory.metaTitle': 'text' }, show: ($scope.getParamValue('meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'meta_description', title: $filter('translate')('content.list.fields.METADESCRIPTION'), sortable: 'translationCategory.metaDescription', filter: { 'translationCategory.metaDescription': 'text' }, show: ($scope.getParamValue('meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'meta_keywords', title: $filter('translate')('content.list.fields.METAKEYWORDS'), sortable: 'translationCategory.metaKeywords', filter: { 'translationCategory.metaKeywords': 'text' }, show: ($scope.getParamValue('meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tenders_description', title: $filter('translate')('content.list.fields.TENDERSDESCRIPTION'), sortable: 'translationCategory.tendersDescription', filter: { 'translationCategory.tendersDescription': 'text' }, show: ($scope.getParamValue('tenders_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tenders_meta_title', title: $filter('translate')('content.list.fields.TENDERSMETATITLE'), sortable: 'translationCategory.tendersMetaTitle', filter: { 'translationCategory.tendersMetaTitle': 'text' }, show: ($scope.getParamValue('tenders_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tenders_meta_description', title: $filter('translate')('content.list.fields.TENDERSMETADESCRIPTION'), sortable: 'translationCategory.tendersMetaDescription', filter: { 'translationCategory.tendersMetaDescription': 'text' }, show: ($scope.getParamValue('tenders_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'tenders_meta_keywords', title: $filter('translate')('content.list.fields.TENDERSMETAKEYWORDS'), sortable: 'translationCategory.tendersMetaKeywords', filter: { 'translationCategory.tendersMetaKeywords': 'text' }, show: ($scope.getParamValue('tenders_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'consultations_description', title: $filter('translate')('content.list.fields.CONSULTATIONSDESCRIPTION'), sortable: 'translationCategory.consultationsDescription', filter: { 'translationCategory.consultationsDescription': 'text' }, show: ($scope.getParamValue('consultations_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'consultations_meta_title', title: $filter('translate')('content.list.fields.CONSULTATIONSMETATITLE'), sortable: 'translationCategory.consultationsMetaTitle', filter: { 'translationCategory.consultationsMetaTitle': 'text' }, show: ($scope.getParamValue('consultations_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'consultations_meta_description', title: $filter('translate')('content.list.fields.CONSULTATIONSMETADESCRIPTION'), sortable: 'translationCategory.consultationsMetaDescription', filter: { 'translationCategory.consultationsMetaDescription': 'text' }, show: ($scope.getParamValue('consultations_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'consultations_meta_keywords', title: $filter('translate')('content.list.fields.CONSULTATIONSMETAKEYWORDS'), sortable: 'translationCategory.consultationsMetaKeywords', filter: { 'translationCategory.consultationsMetaKeywords': 'text' }, show: ($scope.getParamValue('consultations_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'buyers_description', title: $filter('translate')('content.list.fields.BUYERSDESCRIPTION'), sortable: 'translationCategory.buyersDescription', filter: { 'translationCategory.buyersDescription': 'text' }, show: ($scope.getParamValue('buyers_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'buyers_meta_title', title: $filter('translate')('content.list.fields.BUYERSMETATITLE'), sortable: 'translationCategory.buyersMetaTitle', filter: { 'translationCategory.buyersMetaTitle': 'text' }, show: ($scope.getParamValue('buyers_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'buyers_meta_description', title: $filter('translate')('content.list.fields.BUYERSMETADESCRIPTION'), sortable: 'translationCategory.buyersMetaDescription', filter: { 'translationCategory.buyersMetaDescription': 'text' }, show: ($scope.getParamValue('buyers_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'buyers_meta_keywords', title: $filter('translate')('content.list.fields.BUYERSMETAKEYWORDS'), sortable: 'translationCategory.buyersMetaKeywords', filter: { 'translationCategory.buyersMetaKeywords': 'text' }, show: ($scope.getParamValue('buyers_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'suppliers_description', title: $filter('translate')('content.list.fields.SUPPLIERSDESCRIPTION'), sortable: 'translationCategory.suppliersDescription', filter: { 'translationCategory.suppliersDescription': 'text' }, show: ($scope.getParamValue('suppliers_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'suppliers_meta_title', title: $filter('translate')('content.list.fields.SUPPLIERSMETATITLE'), sortable: 'translationCategory.suppliersMetaTitle', filter: { 'translationCategory.suppliersMetaTitle': 'text' }, show: ($scope.getParamValue('suppliers_meta_title_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'suppliers_meta_description', title: $filter('translate')('content.list.fields.SUPPLIERSMETADESCRIPTION'), sortable: 'translationCategory.suppliersMetaDescription', filter: { 'translationCategory.suppliersMetaDescription': 'text' }, show: ($scope.getParamValue('suppliers_meta_description_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'suppliers_meta_keywords', title: $filter('translate')('content.list.fields.SUPPLIERSMETAKEYWORDS'), sortable: 'translationCategory.suppliersMetaKeywords', filter: { 'translationCategory.suppliersMetaKeywords': 'text' }, show: ($scope.getParamValue('suppliers_meta_keywords_show_filed', false) && true), displayInList: true, getValue: $scope.textValue },
            { field: 'validated', title: $filter('translate')('content.list.fields.VALIDATED'), sortable: 'translationCategory.validated', filter: { 'translationCategory.validated': 'select' }, show: ($scope.getParamValue('validated_show_filed', false) && true), displayInList: true, getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.validated ]]"></span>') },
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'translationCategory.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('creator_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'translationCategory.createdAt', filter: { 'translationCategory.createdAt': 'text' }, show: ($scope.getParamValue('created_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'translationCategory.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: ($scope.getParamValue('modifier_user_show_filed', false) && true), displayInList: true, displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'translationCategory.modifiedAt', filter: { 'translationCategory.modifiedAt': 'text' }, show: ($scope.getParamValue('modified_at_show_filed', false) && true), displayInList: true, getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
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

    $scope.isFiltersVisible = $scope.getParamValue('translationCategoriesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('translationCategoriesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('translationCategoriesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('translationCategoriesCount', $scope.count);
    $scope.sorting = {'translationCategory.locale': 'asc'};
    $scope.sorting = $scope.getParamValue('translationCategoriesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('translationCategoriesFilter', $scope.filter);
    $scope.setParamValue('translationCategoriesPage', $scope.page);
    $scope.setParamValue('translationCategoriesCount', $scope.count);
    $scope.setParamValue('translationCategoriesSorting', $scope.sorting);
    $scope.setParamValue('translationCategoriesFilter', $scope.filter);
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
            $scope.setParamValue('translationCategoriesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('translationCategoriesPage', current);
            $scope.setParamValue('translationCategoriesCount', limit);
            $scope.setParamValue('translationCategoriesSorting', order_by);
            $scope.setParamValue('translationCategoriesFilter', filters);
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
            return $translationCategoriesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERTRANSLATIONCATEGORY'),
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
                $translationCategoriesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.TRANSLATIONCATEGORYDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.TRANSLATIONCATEGORYNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.TRANSLATIONCATEGORYNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.translation.translationcategoriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.translation.translationcategoriesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.translation.translationcategoriesdetails', {id: row.id});
    };
}]);

