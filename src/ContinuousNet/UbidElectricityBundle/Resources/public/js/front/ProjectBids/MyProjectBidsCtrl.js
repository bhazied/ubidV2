'use strict';

/**
 * Controller for Bids List
 */

app.controller('MyProjectBidsCtrl', ['$scope','$controller', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$tendersDataFactory', '$usersDataFactory',
    function($scope, $controller, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $tendersDataFactory, $usersDataFactory) {
        
        angular.extend(this, $controller('TendersCtrl', {$scope:$scope}));

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 500);

        $scope.setCols = function() {
            $scope.cols = [
                { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'tender.id', filter: { 'tender.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
                { field: 'section', title: $filter('translate')('content.list.fields.SECTION'), sortable: 'tender.section', filter: { 'tender.section': 'select' }, show: $scope.getParamValue('section_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.sectionsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.section ]]" my-enum-list=\'[[ sections ]]\'></span>') },
                { field: 'buyer', title: $filter('translate')('content.list.fields.BUYER'), sortable: 'buyer.name', filter: { 'tender.buyer': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBuyers(), show: $scope.getParamValue('buyer_id_show_filed', true), displayField: 'name', state: 'app.marketplace.buyersdetails' },
                { field: 'region', title: $filter('translate')('content.list.fields.REGION'), sortable: 'region.name', filter: { 'tender.region': 'select' }, getValue: $scope.linkValue, filterData: $scope.getRegions(), show: $scope.getParamValue('region_id_show_filed', true), displayField: 'name', state: 'app.settings.regionsdetails' },
                { field: 'country', title: $filter('translate')('content.list.fields.COUNTRY'), sortable: 'country.name', filter: { 'tender.country': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('country_id_show_filed', true), displayField: 'name', state: 'app.settings.countriesdetails' },
                { field: 'sector', title: $filter('translate')('content.list.fields.SECTOR'), sortable: 'sector.name', filter: { 'tender.sector': 'select' }, getValue: $scope.linkValue, filterData: $scope.getSectors(), show: $scope.getParamValue('sector_id_show_filed', true), displayField: 'name', state: 'app.lists.sectorsdetails' },
                { field: 'tender_type', title: $filter('translate')('content.list.fields.TENDERTYPE'), sortable: 'tender_type.name', filter: { 'tender.tenderType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTenderTypes(), show: $scope.getParamValue('tender_type_id_show_filed', true), displayField: 'name', state: 'app.lists.tendertypesdetails' },
                { field: 'bidding_type', title: $filter('translate')('content.list.fields.BIDDINGTYPE'), sortable: 'bidding_type.name', filter: { 'tender.biddingType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getBiddingTypes(), show: $scope.getParamValue('bidding_type_id_show_filed', false), displayField: 'name', state: 'app.lists.biddingtypesdetails' },
                { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'tender.title', filter: { 'tender.title': 'text' }, show: $scope.getParamValue('title_show_filed', false), getValue: $scope.textValue },
                { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'tender.slug', filter: { 'tender.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
                { field: 'reference', title: $filter('translate')('content.list.fields.REFERENCE'), sortable: 'tender.reference', filter: { 'tender.reference': 'text' }, show: $scope.getParamValue('reference_show_filed', false), getValue: $scope.textValue },
                { field: 'fees', title: $filter('translate')('content.list.fields.FEES'), sortable: 'tender.fees', filter: { 'tender.fees': 'number' }, show: $scope.getParamValue('fees_show_filed', false), getValue: $scope.textValue },
                { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'tender.description', filter: { 'tender.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
                { field: 'status', title: $filter('translate')('content.list.fields.STATUS'), sortable: 'tender.status', filter: { 'tender.status': 'select' }, show: $scope.getParamValue('status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.statusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.status ]]" my-enum-list=\'[[ statuses ]]\'></span>') },
                { field: 'publish_date', title: $filter('translate')('content.list.fields.PUBLISHDATE'), sortable: 'tender.publishDate', filter: { 'tender.publishDate': 'text' }, show: $scope.getParamValue('publish_date_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
                { field: 'deadline', title: $filter('translate')('content.list.fields.DEADLINE'), sortable: 'tender.deadline', filter: { 'tender.deadline': 'text' }, show: $scope.getParamValue('deadline_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
                { field: 'estimated_cost', title: $filter('translate')('content.list.fields.ESTIMATEDCOST'), sortable: 'tender.estimatedCost', filter: { 'tender.estimatedCost': 'number' }, show: $scope.getParamValue('estimated_cost_show_filed', false), getValue: $scope.textValue },
                { field: 'address', title: $filter('translate')('content.list.fields.ADDRESS'), sortable: 'tender.address', filter: { 'tender.address': 'text' }, show: $scope.getParamValue('address_show_filed', false), getValue: $scope.textValue },
                { field: 'email', title: $filter('translate')('content.list.fields.EMAIL'), sortable: 'tender.email', filter: { 'tender.email': 'text' }, show: $scope.getParamValue('email_show_filed', false), getValue: $scope.textValue },
                { field: 'phone', title: $filter('translate')('content.list.fields.PHONE'), sortable: 'tender.phone', filter: { 'tender.phone': 'text' }, show: $scope.getParamValue('phone_show_filed', false), getValue: $scope.textValue },
                { field: 'attachment_file1', title: $filter('translate')('content.list.fields.ATTACHMENTFILE1'), sortable: 'tender.attachmentFile1', filter: { 'tender.attachmentFile1': 'text' }, show: $scope.getParamValue('attachment_file1_show_filed', false), getValue: $scope.textValue },
                { field: 'attachment_file2', title: $filter('translate')('content.list.fields.ATTACHMENTFILE2'), sortable: 'tender.attachmentFile2', filter: { 'tender.attachmentFile2': 'text' }, show: $scope.getParamValue('attachment_file2_show_filed', false), getValue: $scope.textValue },
                { field: 'attachment_file3', title: $filter('translate')('content.list.fields.ATTACHMENTFILE3'), sortable: 'tender.attachmentFile3', filter: { 'tender.attachmentFile3': 'text' }, show: $scope.getParamValue('attachment_file3_show_filed', false), getValue: $scope.textValue },
                { field: 'attachment_file4', title: $filter('translate')('content.list.fields.ATTACHMENTFILE4'), sortable: 'tender.attachmentFile4', filter: { 'tender.attachmentFile4': 'text' }, show: $scope.getParamValue('attachment_file4_show_filed', false), getValue: $scope.textValue },
                { field: 'source', title: $filter('translate')('content.list.fields.SOURCE'), sortable: 'tender.source', filter: { 'tender.source': 'text' }, show: $scope.getParamValue('source_show_filed', false), getValue: $scope.textValue },
                { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'tender.createdAt', filter: { 'tender.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'tender.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'tender.modifiedAt', filter: { 'tender.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
                { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'tender.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
                { field: 'categories', title: $filter('translate')('content.list.fields.CATEGORIES'), filter: { 'tender.categories': 'checkboxes' }, getValue: $scope.linksValue, filterData: $scope.getCategories(), show: $scope.getParamValue('categories_show_filed', false), display: false, displayField: 'name', state: 'app.lists.categoriesdetails' },
                { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
                    +'<div class="btn-group pull-right">'
                    +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('front.BIDS')+'" ng-click="bids(row)"><i class="fa fa-tags"></i></button>'
                    +'</div>') }
            ];
        };

        $scope.setCols();
        
        $scope.bids = function (row) {
            $state.go('front.projectbids.bids', {projectId : row.id});
        }

        
       /* $scope.add = function() {
            $state.go('app.marketplace.bidsnew');
        };

        $scope.edit = function(row) {
            $state.go('app.marketplace.bidsedit', {id: row.id});
        };

        $scope.details = function(row) {
            $state.go('app.marketplace.bidsdetails', {id: row.id});
        };*/
    }]);

