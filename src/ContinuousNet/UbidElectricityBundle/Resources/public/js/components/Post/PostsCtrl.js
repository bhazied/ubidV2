'use strict';

/**
 * Controller for Posts List
 */

app.controller('PostsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$postTypesDataFactory', '$usersDataFactory', '$postCategoriesDataFactory', '$postsDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $postTypesDataFactory, $usersDataFactory, $postCategoriesDataFactory, $postsDataFactory) {

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

    $scope.postTypes = [];
    $scope.postTypesLoaded = false;

    $scope.getPostTypes = function() {
        $scope.postTypesLoaded = true;
        if ($scope.postTypes.length == 0) {
            $scope.postTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTTYPE')});
            var def = $q.defer();
            $postTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[postType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.postTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.postTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.postTypes;
        }
    };

    $scope.getPostTypes();

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


    $scope.postCategories = [];
    $scope.postCategoriesLoaded = [];

    $scope.getPostCategories = function() {
        if ($scope.postCategories.length == 0) {
            $scope.postCategories.push({});
            var def = $q.defer();
            $postCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[postCategory.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.postCategories.length = 0;
                        for (var i in data.results) {
                            $scope.postCategories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.postCategories);
                    }
                });
            });
            return def;
        } else {
            return $scope.postCategories;
        }
    };

    $scope.getPostCategories();

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
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.postsParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.postsParams)) {
           $localStorage.postsParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.postsParams[param]) && $localStorage.postsParams[param] != null) {
            return $localStorage.postsParams[param];
        } else {
            $localStorage.postsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'post_categories', 'class': 'has_nany', title: $filter('translate')('content.list.fields.POSTCATEGORIES'), filter: { 'post.postCategories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getPostCategories(), show: $scope.getParamValue('post_categories_show_filed', false), displayInList: , display: false, displayField: 'name', state: 'app.news.postcategoriesdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('postsIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('postsIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('postsPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('postsCount', $scope.count);
    $scope.sorting = {'post.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('postsSorting', $scope.sorting);
    $scope.filter = {
        post_categories: []
    };
    $scope.filter = $scope.getParamValue('postsFilter', $scope.filter);
    $scope.setParamValue('postsPage', $scope.page);
    $scope.setParamValue('postsCount', $scope.count);
    $scope.setParamValue('postsSorting', $scope.sorting);
    $scope.setParamValue('postsFilter', $scope.filter);
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
            $scope.setParamValue('postsIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('postsPage', current);
            $scope.setParamValue('postsCount', limit);
            $scope.setParamValue('postsSorting', order_by);
            $scope.setParamValue('postsFilter', filters);
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
            return $postsDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERPOST'),
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
                $postsDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.POSTDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.POSTNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.POSTNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.news.postsnew');
    };

    $scope.edit = function(row) {
        $state.go('app.news.postsedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.news.postsdetails', {id: row.id});
    };
}]);

