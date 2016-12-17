'use strict';

/**
 * Controller for Images List
 */

app.controller('ImagesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$imageTypesDataFactory', '$pricesDataFactory', '$sharingsDataFactory', '$galleriesDataFactory', '$usersDataFactory', '$imageCategoriesDataFactory', '$imagesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $imageTypesDataFactory, $pricesDataFactory, $sharingsDataFactory, $galleriesDataFactory, $usersDataFactory, $imageCategoriesDataFactory, $imagesDataFactory) {

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

    $scope.imageTypes = [];
    $scope.imageTypesLoaded = false;

    $scope.getImageTypes = function() {
        $scope.imageTypesLoaded = true;
        if ($scope.imageTypes.length == 0) {
            $scope.imageTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTIMAGETYPE')});
            var def = $q.defer();
            $imageTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[imageType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.imageTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.imageTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.imageTypes;
        }
    };

    $scope.getImageTypes();

    $scope.prices = [];
    $scope.pricesLoaded = false;

    $scope.getPrices = function() {
        $scope.pricesLoaded = true;
        if ($scope.prices.length == 0) {
            $scope.prices.push({id: '', title: $filter('translate')('content.form.messages.SELECTPRICE')});
            var def = $q.defer();
            $pricesDataFactory.query({offset: 0, limit: 10000, 'order_by[price.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.prices.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.prices);
                    }
                });
            });
            return def;
        } else {
            return $scope.prices;
        }
    };

    $scope.getPrices();

    $scope.sharings = [];
    $scope.sharingsLoaded = false;

    $scope.getSharings = function() {
        $scope.sharingsLoaded = true;
        if ($scope.sharings.length == 0) {
            $scope.sharings.push({id: '', title: $filter('translate')('content.form.messages.SELECTSHARING')});
            var def = $q.defer();
            $sharingsDataFactory.query({offset: 0, limit: 10000, 'order_by[sharing.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.sharings.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.sharings);
                    }
                });
            });
            return def;
        } else {
            return $scope.sharings;
        }
    };

    $scope.getSharings();

    $scope.galleries = [];
    $scope.galleriesLoaded = false;

    $scope.getGalleries = function() {
        $scope.galleriesLoaded = true;
        if ($scope.galleries.length == 0) {
            $scope.galleries.push({id: '', title: $filter('translate')('content.form.messages.SELECTGALLERY')});
            var def = $q.defer();
            $galleriesDataFactory.query({offset: 0, limit: 10000, 'order_by[gallery.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.galleries.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.galleries);
                    }
                });
            });
            return def;
        } else {
            return $scope.galleries;
        }
    };

    $scope.getGalleries();

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


    $scope.imageCategories = [];
    $scope.imageCategoriesLoaded = [];

    $scope.getImageCategories = function() {
        if ($scope.imageCategories.length == 0) {
            $scope.imageCategories.push({});
            var def = $q.defer();
            $imageCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[imageCategory.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        $scope.imageCategories.length = 0;
                        for (var i in data.results) {
                            $scope.imageCategories.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.imageCategories);
                    }
                });
            });
            return def;
        } else {
            return $scope.imageCategories;
        }
    };

    $scope.getImageCategories();

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
        $localStorage.imagesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.imagesParams)) {
           $localStorage.imagesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.imagesParams[param]) && $localStorage.imagesParams[param] != null) {
            return $localStorage.imagesParams[param];
        } else {
            $localStorage.imagesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'image.id', filter: { 'image.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'image_type', title: $filter('translate')('content.list.fields.IMAGETYPE'), sortable: 'image_type.name', filter: { 'image.imageType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getImageTypes(), show: $scope.getParamValue('image_type_id_show_filed', true), displayField: 'name', state: 'app.photos.imagetypesdetails' },
            { field: 'price', title: $filter('translate')('content.list.fields.PRICE'), sortable: 'price.name', filter: { 'image.price': 'select' }, getValue: $scope.linkValue, filterData: $scope.getPrices(), show: $scope.getParamValue('price_id_show_filed', true), displayField: 'name', state: 'app.offer.pricesdetails' },
            { field: 'sharing', title: $filter('translate')('content.list.fields.SHARING'), sortable: 'sharing.name', filter: { 'image.sharing': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSharings(), show: $scope.getParamValue('sharing_id_show_filed', true), displayField: 'name', state: 'app.offer.sharingsdetails' },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'image.name', filter: { 'image.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'image.nameAr', filter: { 'image.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'image.nameFr', filter: { 'image.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'image.slug', filter: { 'image.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'image.slugAr', filter: { 'image.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'image.slugFr', filter: { 'image.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'image.picture', filter: { 'image.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'image.description', filter: { 'image.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'description_ar', title: $filter('translate')('content.list.fields.DESCRIPTIONAR'), sortable: 'image.descriptionAr', filter: { 'image.descriptionAr': 'text' }, show: $scope.getParamValue('description_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'description_fr', title: $filter('translate')('content.list.fields.DESCRIPTIONFR'), sortable: 'image.descriptionFr', filter: { 'image.descriptionFr': 'text' }, show: $scope.getParamValue('description_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'gallery', title: $filter('translate')('content.list.fields.GALLERY'), sortable: 'gallery.name', filter: { 'image.gallery': 'select' }, getValue: $scope.linkValue, filterData: $scope.getGalleries(), show: $scope.getParamValue('gallery_id_show_filed', false), displayField: 'name', state: 'app.photos.galleriesdetails' },
            { field: 'remote_source', title: $filter('translate')('content.list.fields.REMOTESOURCE'), sortable: 'image.remoteSource', filter: { 'image.remoteSource': 'select' }, show: $scope.getParamValue('remote_source_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.remote_source ]]"></span>') },
            { field: 'url', title: $filter('translate')('content.list.fields.URL'), sortable: 'image.url', filter: { 'image.url': 'text' }, show: $scope.getParamValue('url_show_filed', false), getValue: $scope.textValue },
            { field: 'copyright', title: $filter('translate')('content.list.fields.COPYRIGHT'), sortable: 'image.copyright', filter: { 'image.copyright': 'text' }, show: $scope.getParamValue('copyright_show_filed', false), getValue: $scope.textValue },
            { field: 'is_top', title: $filter('translate')('content.list.fields.ISTOP'), sortable: 'image.isTop', filter: { 'image.isTop': 'select' }, show: $scope.getParamValue('is_top_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_top ]]"></span>') },
            { field: 'is_new', title: $filter('translate')('content.list.fields.ISNEW'), sortable: 'image.isNew', filter: { 'image.isNew': 'select' }, show: $scope.getParamValue('is_new_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_new ]]"></span>') },
            { field: 'watermark_text', title: $filter('translate')('content.list.fields.WATERMARKTEXT'), sortable: 'image.watermarkText', filter: { 'image.watermarkText': 'text' }, show: $scope.getParamValue('watermark_text_show_filed', false), getValue: $scope.textValue },
            { field: 'total_previewed', title: $filter('translate')('content.list.fields.TOTALPREVIEWED'), sortable: 'image.totalPreviewed', filter: { 'image.totalPreviewed': 'number' }, show: $scope.getParamValue('total_previewed_show_filed', false), getValue: $scope.textValue },
            { field: 'total_downloads', title: $filter('translate')('content.list.fields.TOTALDOWNLOADS'), sortable: 'image.totalDownloads', filter: { 'image.totalDownloads': 'number' }, show: $scope.getParamValue('total_downloads_show_filed', false), getValue: $scope.textValue },
            { field: 'total_hits', title: $filter('translate')('content.list.fields.TOTALHITS'), sortable: 'image.totalHits', filter: { 'image.totalHits': 'number' }, show: $scope.getParamValue('total_hits_show_filed', false), getValue: $scope.textValue },
            { field: 'total_comments', title: $filter('translate')('content.list.fields.TOTALCOMMENTS'), sortable: 'image.totalComments', filter: { 'image.totalComments': 'number' }, show: $scope.getParamValue('total_comments_show_filed', false), getValue: $scope.textValue },
            { field: 'total_ratings', title: $filter('translate')('content.list.fields.TOTALRATINGS'), sortable: 'image.totalRatings', filter: { 'image.totalRatings': 'number' }, show: $scope.getParamValue('total_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'average_ratings', title: $filter('translate')('content.list.fields.AVERAGERATINGS'), sortable: 'image.averageRatings', filter: { 'image.averageRatings': 'number' }, show: $scope.getParamValue('average_ratings_show_filed', false), getValue: $scope.textValue },
            { field: 'total_likes', title: $filter('translate')('content.list.fields.TOTALLIKES'), sortable: 'image.totalLikes', filter: { 'image.totalLikes': 'number' }, show: $scope.getParamValue('total_likes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_dislikes', title: $filter('translate')('content.list.fields.TOTALDISLIKES'), sortable: 'image.totalDislikes', filter: { 'image.totalDislikes': 'number' }, show: $scope.getParamValue('total_dislikes_show_filed', false), getValue: $scope.textValue },
            { field: 'total_bookmarks', title: $filter('translate')('content.list.fields.TOTALBOOKMARKS'), sortable: 'image.totalBookmarks', filter: { 'image.totalBookmarks': 'number' }, show: $scope.getParamValue('total_bookmarks_show_filed', false), getValue: $scope.textValue },
            { field: 'auto_publishing', title: $filter('translate')('content.list.fields.AUTOPUBLISHING'), sortable: 'image.autoPublishing', filter: { 'image.autoPublishing': 'select' }, show: $scope.getParamValue('auto_publishing_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.auto_publishing ]]"></span>') },
            { field: 'start_publishing', title: $filter('translate')('content.list.fields.STARTPUBLISHING'), sortable: 'image.startPublishing', filter: { 'image.startPublishing': 'number' }, show: $scope.getParamValue('start_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_publishing', title: $filter('translate')('content.list.fields.ENDPUBLISHING'), sortable: 'image.endPublishing', filter: { 'image.endPublishing': 'number' }, show: $scope.getParamValue('end_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'image.createdAt', filter: { 'image.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'image.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'image.modifiedAt', filter: { 'image.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'image.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'image_categories', title: $filter('translate')('content.list.fields.IMAGECATEGORIES'), filter: { 'image.imageCategories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getImageCategories(), show: $scope.getParamValue('image_categories_show_filed', false), display: false, displayField: 'name', state: 'app.photos.imagecategoriesdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('imagesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('imagesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('imagesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('imagesCount', $scope.count);
    $scope.sorting = {'image.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('imagesSorting', $scope.sorting);
    $scope.filter = {
        image_categories: []
    };
    $scope.filter = $scope.getParamValue('imagesFilter', $scope.filter);
    $scope.setParamValue('imagesPage', $scope.page);
    $scope.setParamValue('imagesCount', $scope.count);
    $scope.setParamValue('imagesSorting', $scope.sorting);
    $scope.setParamValue('imagesFilter', $scope.filter);
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
            $scope.setParamValue('imagesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('imagesPage', current);
            $scope.setParamValue('imagesCount', limit);
            $scope.setParamValue('imagesSorting', order_by);
            $scope.setParamValue('imagesFilter', filters);
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
            return $imagesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERIMAGE'),
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
                $imagesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.IMAGEDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.IMAGENOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.IMAGENOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.photos.imagesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.photos.imagesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.photos.imagesdetails', {id: row.id});
    };
}]);

