'use strict';

/**
 * Controller for Menus List
 */

app.controller('MenusCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$menusDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $menusDataFactory) {

    $scope.modesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Link',
        title: $filter('translate')('content.list.fields.modes.LINK'),
        css: 'primary'
    }, {
        id: 'ImageCategory',
        title: $filter('translate')('content.list.fields.modes.IMAGECATEGORY'),
        css: 'success'
    }, {
        id: 'PostCategory',
        title: $filter('translate')('content.list.fields.modes.POSTCATEGORY'),
        css: 'warning'
    }, {
        id: 'VideoCategory',
        title: $filter('translate')('content.list.fields.modes.VIDEOCATEGORY'),
        css: 'danger'
    }, {
        id: 'Album',
        title: $filter('translate')('content.list.fields.modes.ALBUM'),
        css: 'default'
    }, {
        id: 'Show',
        title: $filter('translate')('content.list.fields.modes.SHOW'),
        css: 'info'
    }, {
        id: 'Sport',
        title: $filter('translate')('content.list.fields.modes.SPORT'),
        css: 'primary'
    }, {
        id: 'SportEvent',
        title: $filter('translate')('content.list.fields.modes.SPORTEVENT'),
        css: 'success'
    }, {
        id: 'Team',
        title: $filter('translate')('content.list.fields.modes.TEAM'),
        css: 'warning'
    }, {
        id: 'Stadium',
        title: $filter('translate')('content.list.fields.modes.STADIUM'),
        css: 'danger'
    }, {
        id: 'Player',
        title: $filter('translate')('content.list.fields.modes.PLAYER'),
        css: 'default'
    }, {
        id: 'Day',
        title: $filter('translate')('content.list.fields.modes.DAY'),
        css: 'info'
    }, {
        id: 'Package',
        title: $filter('translate')('content.list.fields.modes.PACKAGE'),
        css: 'primary'
    }];
    $scope.displayModesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'ImageWithText',
        title: $filter('translate')('content.list.fields.displaymodes.IMAGEWITHTEXT'),
        css: 'primary'
    }, {
        id: 'ImageOnly',
        title: $filter('translate')('content.list.fields.displaymodes.IMAGEONLY'),
        css: 'success'
    }, {
        id: 'TextOnly',
        title: $filter('translate')('content.list.fields.displaymodes.TEXTONLY'),
        css: 'warning'
    }];
    $scope.textPositionsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'None',
        title: $filter('translate')('content.list.fields.textpositions.NONE'),
        css: 'primary'
    }, {
        id: 'Top',
        title: $filter('translate')('content.list.fields.textpositions.TOP'),
        css: 'success'
    }, {
        id: 'Bottom',
        title: $filter('translate')('content.list.fields.textpositions.BOTTOM'),
        css: 'warning'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.textpositions.LEFT'),
        css: 'danger'
    }, {
        id: 'Right',
        title: $filter('translate')('content.list.fields.textpositions.RIGHT'),
        css: 'default'
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
            modes: $scope.modesOptions,
            displayModes: $scope.displayModesOptions,
            textPositions: $scope.textPositionsOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.menusParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.menusParams)) {
           $localStorage.menusParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.menusParams[param]) && $localStorage.menusParams[param] != null) {
            return $localStorage.menusParams[param];
        } else {
            $localStorage.menusParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'menu.id', filter: { 'menu.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'menu.createdAt', filter: { 'menu.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'menu.modifiedAt', filter: { 'menu.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', true), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'active_css', title: $filter('translate')('content.list.fields.ACTIVECSS'), sortable: 'menu.activeCss', filter: { 'menu.activeCss': 'text' }, show: $scope.getParamValue('active_css_show_filed', true), getValue: $scope.textValue },
            { field: 'after_txt', title: $filter('translate')('content.list.fields.AFTERTXT'), sortable: 'menu.afterTxt', filter: { 'menu.afterTxt': 'text' }, show: $scope.getParamValue('after_txt_show_filed', true), getValue: $scope.textValue },
            { field: 'before_txt', title: $filter('translate')('content.list.fields.BEFORETXT'), sortable: 'menu.beforeTxt', filter: { 'menu.beforeTxt': 'text' }, show: $scope.getParamValue('before_txt_show_filed', true), getValue: $scope.textValue },
            { field: 'columns_number', title: $filter('translate')('content.list.fields.COLUMNSNUMBER'), sortable: 'menu.columnsNumber', filter: { 'menu.columnsNumber': 'number' }, show: $scope.getParamValue('columns_number_show_filed', true), getValue: $scope.textValue },
            { field: 'display_mode', 'class': 'enum', title: $filter('translate')('content.list.fields.DISPLAYMODE'), sortable: 'menu.displayMode', filter: { 'menu.displayMode': 'select' }, show: $scope.getParamValue('display_mode_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.displayModesOptions, interpolateExpr: $interpolate('<span class="menuDisplayMode" my-enum="[[ row.display_mode ]]" my-enum-list=\'[[ displayModes ]]\'></span>') },
            { field: 'first_css', title: $filter('translate')('content.list.fields.FIRSTCSS'), sortable: 'menu.firstCss', filter: { 'menu.firstCss': 'text' }, show: $scope.getParamValue('first_css_show_filed', false), getValue: $scope.textValue },
            { field: 'is_published', title: $filter('translate')('content.list.fields.ISPUBLISHED'), sortable: 'menu.isPublished', filter: { 'menu.isPublished': 'select' }, show: $scope.getParamValue('is_published_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_published ]]"></span>') },
            { field: 'item_css', title: $filter('translate')('content.list.fields.ITEMCSS'), sortable: 'menu.itemCss', filter: { 'menu.itemCss': 'text' }, show: $scope.getParamValue('item_css_show_filed', false), getValue: $scope.textValue },
            { field: 'last_css', title: $filter('translate')('content.list.fields.LASTCSS'), sortable: 'menu.lastCss', filter: { 'menu.lastCss': 'text' }, show: $scope.getParamValue('last_css_show_filed', false), getValue: $scope.textValue },
            { field: 'menu_css', title: $filter('translate')('content.list.fields.MENUCSS'), sortable: 'menu.menuCss', filter: { 'menu.menuCss': 'text' }, show: $scope.getParamValue('menu_css_show_filed', false), getValue: $scope.textValue },
            { field: 'mode', 'class': 'enum', title: $filter('translate')('content.list.fields.MODE'), sortable: 'menu.mode', filter: { 'menu.mode': 'select' }, show: $scope.getParamValue('mode_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.modesOptions, interpolateExpr: $interpolate('<span class="menuMode" my-enum="[[ row.mode ]]" my-enum-list=\'[[ modes ]]\'></span>') },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'menu.name', filter: { 'menu.name': 'text' }, show: $scope.getParamValue('name_show_filed', false), getValue: $scope.textValue },
            { field: 'not_active_css', title: $filter('translate')('content.list.fields.NOTACTIVECSS'), sortable: 'menu.notActiveCss', filter: { 'menu.notActiveCss': 'text' }, show: $scope.getParamValue('not_active_css_show_filed', false), getValue: $scope.textValue },
            { field: 'separator', title: $filter('translate')('content.list.fields.SEPARATOR'), sortable: 'menu.separator', filter: { 'menu.separator': 'text' }, show: $scope.getParamValue('separator_show_filed', false), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'menu.slug', filter: { 'menu.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'text_position', 'class': 'enum', title: $filter('translate')('content.list.fields.TEXTPOSITION'), sortable: 'menu.textPosition', filter: { 'menu.textPosition': 'select' }, show: $scope.getParamValue('text_position_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.textPositionsOptions, interpolateExpr: $interpolate('<span class="menuTextPosition" my-enum="[[ row.text_position ]]" my-enum-list=\'[[ textPositions ]]\'></span>') },
            { field: 'creator_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'menu.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modifier_user', 'class': 'has_one', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'menu.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('menusIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('menusIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('menusPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('menusCount', $scope.count);
    $scope.sorting = {'menu.name': 'asc'};
    $scope.sorting = $scope.getParamValue('menusSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('menusFilter', $scope.filter);
    $scope.setParamValue('menusPage', $scope.page);
    $scope.setParamValue('menusCount', $scope.count);
    $scope.setParamValue('menusSorting', $scope.sorting);
    $scope.setParamValue('menusFilter', $scope.filter);
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
            $scope.setParamValue('menusIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('menusPage', current);
            $scope.setParamValue('menusCount', limit);
            $scope.setParamValue('menusSorting', order_by);
            $scope.setParamValue('menusFilter', filters);
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
            return $menusDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERMENU'),
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
                $menusDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.MENUDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.MENUNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.MENUNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.settings.menusnew');
    };

    $scope.edit = function(row) {
        $state.go('app.settings.menusedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.settings.menusdetails', {id: row.id});
    };
}]);

