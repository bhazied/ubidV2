'use strict';

/**
 * Controller for Audio Categories List
 */

app.controller('AudioCategoriesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$audioTypesDataFactory', '$usersDataFactory', '$audioCategoriesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $audioTypesDataFactory, $usersDataFactory, $audioCategoriesDataFactory) {

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

    $scope.audioCategories = [];
    $scope.audioCategoriesLoaded = false;

    $scope.getParents = function() {
        $scope.audioCategoriesLoaded = true;
        if ($scope.audioCategories.length == 0) {
            $scope.audioCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPARENT')});
            var def = $q.defer();
            $audioCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[audioCategory.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.audioCategories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.audioCategories);
                    }
                });
            });
            return def;
        } else {
            return $scope.audioCategories;
        }
    };

    $scope.getParents();

    $scope.audioTypes = [];
    $scope.audioTypesLoaded = false;

    $scope.getAudioTypes = function() {
        $scope.audioTypesLoaded = true;
        if ($scope.audioTypes.length == 0) {
            $scope.audioTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTAUDIOTYPE')});
            var def = $q.defer();
            $audioTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[audioType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.audioTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.audioTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.audioTypes;
        }
    };

    $scope.getAudioTypes();

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
        $localStorage.audioCategoriesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.audioCategoriesParams)) {
           $localStorage.audioCategoriesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.audioCategoriesParams[param]) && $localStorage.audioCategoriesParams[param] != null) {
            return $localStorage.audioCategoriesParams[param];
        } else {
            $localStorage.audioCategoriesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'audioCategory.id', filter: { 'audioCategory.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'audioCategory.name', filter: { 'audioCategory.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'audioCategory.nameAr', filter: { 'audioCategory.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'audioCategory.nameFr', filter: { 'audioCategory.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'audioCategory.slug', filter: { 'audioCategory.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'audioCategory.slugAr', filter: { 'audioCategory.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'audioCategory.slugFr', filter: { 'audioCategory.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'audioCategory.picture', filter: { 'audioCategory.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'audioCategory.description', filter: { 'audioCategory.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'description_ar', title: $filter('translate')('content.list.fields.DESCRIPTIONAR'), sortable: 'audioCategory.descriptionAr', filter: { 'audioCategory.descriptionAr': 'text' }, show: $scope.getParamValue('description_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'description_fr', title: $filter('translate')('content.list.fields.DESCRIPTIONFR'), sortable: 'audioCategory.descriptionFr', filter: { 'audioCategory.descriptionFr': 'text' }, show: $scope.getParamValue('description_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'parent', title: $filter('translate')('content.list.fields.PARENT'), sortable: 'parent.name', filter: { 'audioCategory.parent': 'select' }, getValue: $scope.linkValue, filterData: $scope.getParents(), show: $scope.getParamValue('parent_id_show_filed', false), displayField: 'name', state: 'app.webradio.audiocategoriesdetails' },
            { field: 'audio_type', title: $filter('translate')('content.list.fields.AUDIOTYPE'), sortable: 'audio_type.name', filter: { 'audioCategory.audioType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getAudioTypes(), show: $scope.getParamValue('audio_type_id_show_filed', false), displayField: 'name', state: 'app.webradio.audiotypesdetails' },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'audioCategory.ordering', filter: { 'audioCategory.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'audioCategory.createdAt', filter: { 'audioCategory.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'audioCategory.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'audioCategory.modifiedAt', filter: { 'audioCategory.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'audioCategory.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('audioCategoriesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('audioCategoriesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('audioCategoriesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('audioCategoriesCount', $scope.count);
    $scope.sorting = {'audioCategory.name': 'asc'};
    $scope.sorting = $scope.getParamValue('audioCategoriesSorting', $scope.sorting);
    $scope.filter = {
        audios: []
    };
    $scope.filter = $scope.getParamValue('audioCategoriesFilter', $scope.filter);
    $scope.setParamValue('audioCategoriesPage', $scope.page);
    $scope.setParamValue('audioCategoriesCount', $scope.count);
    $scope.setParamValue('audioCategoriesSorting', $scope.sorting);
    $scope.setParamValue('audioCategoriesFilter', $scope.filter);
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
            $scope.setParamValue('audioCategoriesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('audioCategoriesPage', current);
            $scope.setParamValue('audioCategoriesCount', limit);
            $scope.setParamValue('audioCategoriesSorting', order_by);
            $scope.setParamValue('audioCategoriesFilter', filters);
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
            return $audioCategoriesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERAUDIOCATEGORY'),
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
                $audioCategoriesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.AUDIOCATEGORYDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.AUDIOCATEGORYNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.AUDIOCATEGORYNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.webradio.audiocategoriesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.webradio.audiocategoriesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.webradio.audiocategoriesdetails', {id: row.id});
    };
}]);

