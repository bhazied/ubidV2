'use strict';

/**
 * Controller for Posts List
 */

app.controller('PostsCtrl', ['$scope', '$rootScope', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$postTypesDataFactory', '$usersDataFactory', '$postCategoriesDataFactory', '$postsDataFactory',
function($scope, $rootScope, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $postTypesDataFactory, $usersDataFactory, $postCategoriesDataFactory, $postsDataFactory) {

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

    $scope.booleanOptions = [{
        id: '1',
        title: $filter('translate')('content.common.YES'),
        css: 'success'
     }, {
        id: '0',
        title: $filter('translate')('content.common.NO'),
        css: 'danger'
    }];

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.postTypes = [];
    $scope.postTypesLoaded = false;

    $scope.getPostTypes = function() {
        $scope.postTypesLoaded = true;
        if ($scope.postTypes.length == 0) {
            $scope.postTypes.push({});
            var def = $q.defer();
            $postTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[postType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.postTypes.length = 0;
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


    $scope.postCategories = [];
    $scope.postCategoriesLoaded = [];

    $scope.getPostCategories = function() {
        $timeout(function(){
            if ($scope.postCategories.length == 0) {
                $scope.postCategories.push({});
                var def = $q.defer();
                $postCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[postCategory.id]': 'desc'}).$promise.then(function(data) {
                    $scope.postCategories = data.results;
                    def.resolve($scope.postCategories);
                });
                return def;
            } else {
                return $scope.postCategories;
            }
        });
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
        $localStorage.postsParams[param] = newValue;
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.postsParams)) {
           $localStorage.postsParams = {};
        }
        if (angular.isDefined($localStorage.postsParams[param])) {
            return $localStorage.postsParams[param];
        } else {
            $localStorage.postsParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'post.id', filter: { 'post.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'post_type', title: $filter('translate')('content.list.fields.POSTTYPE'), sortable: 'post_type.name', filter: { 'post.postType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPostTypes(), show: $scope.getParamValue('post_type_id_show_filed', true), displayField: 'name', state: 'app.news.posttypesdetails' },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'post.title', filter: { 'post.title': 'text' }, show: $scope.getParamValue('title_show_filed', true), getValue: $scope.textValue },
            { field: 'title_ar', title: $filter('translate')('content.list.fields.TITLEAR'), sortable: 'post.titleAr', filter: { 'post.titleAr': 'text' }, show: $scope.getParamValue('title_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'title_fr', title: $filter('translate')('content.list.fields.TITLEFR'), sortable: 'post.titleFr', filter: { 'post.titleFr': 'text' }, show: $scope.getParamValue('title_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'post.slug', filter: { 'post.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'post.slugAr', filter: { 'post.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'post.slugFr', filter: { 'post.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'post.picture', filter: { 'post.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'content', title: $filter('translate')('content.list.fields.CONTENT'), sortable: 'post.content', filter: { 'post.content': 'text' }, show: $scope.getParamValue('content_show_filed', false), getValue: $scope.textValue },
            { field: 'content_ar', title: $filter('translate')('content.list.fields.CONTENTAR'), sortable: 'post.contentAr', filter: { 'post.contentAr': 'text' }, show: $scope.getParamValue('content_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'content_fr', title: $filter('translate')('content.list.fields.CONTENTFR'), sortable: 'post.contentFr', filter: { 'post.contentFr': 'text' }, show: $scope.getParamValue('content_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'is_headline', title: $filter('translate')('content.list.fields.ISHEADLINE'), sortable: 'post.isHeadline', filter: { 'post.isHeadline': 'select' }, show: $scope.getParamValue('is_headline_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_headline ]]"></span>') },
            { field: 'auto_publishing', title: $filter('translate')('content.list.fields.AUTOPUBLISHING'), sortable: 'post.autoPublishing', filter: { 'post.autoPublishing': 'select' }, show: $scope.getParamValue('auto_publishing_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.auto_publishing ]]"></span>') },
            { field: 'start_publishing', title: $filter('translate')('content.list.fields.STARTPUBLISHING'), sortable: 'post.startPublishing', filter: { 'post.startPublishing': 'text' }, show: $scope.getParamValue('start_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_publishing', title: $filter('translate')('content.list.fields.ENDPUBLISHING'), sortable: 'post.endPublishing', filter: { 'post.endPublishing': 'text' }, show: $scope.getParamValue('end_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'publish_date', title: $filter('translate')('content.list.fields.PUBLISHDATE'), sortable: 'post.publishDate', filter: { 'post.publishDate': 'text' }, show: $scope.getParamValue('publish_date_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'meta_title', title: $filter('translate')('content.list.fields.METATITLE'), sortable: 'post.metaTitle', filter: { 'post.metaTitle': 'text' }, show: $scope.getParamValue('meta_title_show_filed', false), getValue: $scope.textValue },
            { field: 'meta_description', title: $filter('translate')('content.list.fields.METADESCRIPTION'), sortable: 'post.metaDescription', filter: { 'post.metaDescription': 'text' }, show: $scope.getParamValue('meta_description_show_filed', false), getValue: $scope.textValue },
            { field: 'meta_keywords', title: $filter('translate')('content.list.fields.METAKEYWORDS'), sortable: 'post.metaKeywords', filter: { 'post.metaKeywords': 'text' }, show: $scope.getParamValue('meta_keywords_show_filed', false), getValue: $scope.textValue },
            { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'post.status', filter: { 'post.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statuses, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
            { field: 'total_prints', title: $filter('translate')('content.list.fields.TOTALPRINTS'), sortable: 'post.totalPrints', filter: { 'post.totalPrints': 'number' }, show: $scope.getParamValue('total_prints_show_filed', false), getValue: $scope.textValue },
            { field: 'total_hits', title: $filter('translate')('content.list.fields.TOTALHITS'), sortable: 'post.totalHits', filter: { 'post.totalHits': 'number' }, show: $scope.getParamValue('total_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'total_comments', title: $filter('translate')('content.list.fields.TOTALCOMMENTS'), sortable: 'post.totalComments', filter: { 'post.totalComments': 'number' }, show: $scope.getParamValue('total_comments_show_filed', false), getValue: $scope.textValue },
            { field: 'total_ratings', title: $filter('translate')('content.list.fields.TOTALRATINGS'), sortable: 'post.totalRatings', filter: { 'post.totalRatings': 'number' }, show: $scope.getParamValue('total_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'average_ratings', title: $filter('translate')('content.list.fields.AVERAGERATINGS'), sortable: 'post.averageRatings', filter: { 'post.averageRatings': 'number' }, show: $scope.getParamValue('average_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'total_likes', title: $filter('translate')('content.list.fields.TOTALLIKES'), sortable: 'post.totalLikes', filter: { 'post.totalLikes': 'number' }, show: $scope.getParamValue('total_likes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_dislikes', title: $filter('translate')('content.list.fields.TOTALDISLIKES'), sortable: 'post.totalDislikes', filter: { 'post.totalDislikes': 'number' }, show: $scope.getParamValue('total_dislikes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_bookmarks', title: $filter('translate')('content.list.fields.TOTALBOOKMARKS'), sortable: 'post.totalBookmarks', filter: { 'post.totalBookmarks': 'number' }, show: $scope.getParamValue('total_bookmarks_show_filed', false), getValue: $scope.textValue },
            { field: 'is_top', title: $filter('translate')('content.list.fields.ISTOP'), sortable: 'post.isTop', filter: { 'post.isTop': 'select' }, show: $scope.getParamValue('is_top_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_top ]]"></span>') },
            { field: 'is_new', title: $filter('translate')('content.list.fields.ISNEW'), sortable: 'post.isNew', filter: { 'post.isNew': 'select' }, show: $scope.getParamValue('is_new_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_new ]]"></span>') },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'post.ordering', filter: { 'post.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'post.createdAt', filter: { 'post.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'post.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'post.modifiedAt', filter: { 'post.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'post.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'post_categories', title: $filter('translate')('content.list.fields.POSTCATEGORIES'), show: $scope.getParamValue('post_categories_show_filed', false), getValue: $scope.linksValue, state: 'app.news.postcategoriesdetails', displayField: 'name' },            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<div class="btn-group pull-right">'
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
        sorting: $scope.getParamValue('sorting', {'post.createdAt': 'desc'}),
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
            return $postsDataFactory.query(http_params).$promise.then(function(data) {
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
                $postsDataFactory.remove(row).$promise.then(function(data) {
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

