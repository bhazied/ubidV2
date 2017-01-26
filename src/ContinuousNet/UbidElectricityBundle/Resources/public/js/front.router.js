
/**
 * Config for the app router
 */
app.config(['$stateProvider',
    function ($stateProvider) {
        /*
         * Main route
        */
        $stateProvider.state('front.home', {
            url: '/',
            templateUrl : '/bundles/ubidelectricity/js/front/Home/home.html',
            title: 'front.HOME',
            resolve: loadSequence('HomeCtrl' ,'homeService', 'UserMenuFrontCtrl', 'userMenuFrontService')
        /*
         *  User Service routes
         */
        }).state('front.login', {
            url: '/login/:type',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/login.html',
            title: 'front.LOGIN',
            resolve: loadSequence('LoginFrontCtrl', 'LoginService')
        }).state('front.logout', {
            url: '/logout',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/logout.html',
            title: 'front.LOGOUT',
            resolve: loadSequence('LogoutFrontCtrl')
        }).state('front.register', {
            url: '/register/:type',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/register.html',
            title: 'front.REGISTER',
            resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'RegisterFrontCtrl', 'RegisterService', 'countryService', 'groupService', 'languageService', 'userService', 'RegisterService')
        }).state('front.resetpassword', {
            url: '/reset-password',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/reset_password.html',
            title: 'front.RESETPAWSSWORD',
            resolve: loadSequence('ResetPasswordCtrl', 'ResetPasswordService')
        }).state('front.emailconfirm', {
            url: '/auth/email-confirm/:token/:language',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/email_confirm.html',
            title: 'front.EMAILCONFIRM',
            resolve: loadSequence('EmailConfirmCtrl', 'RegisterService')
        }).state('front.reset', {
            url: '/auth/reset/:token/:language',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/reset.html',
            title: 'front.RESET',
            resolve: loadSequence('ResetCtrl', 'ResetPasswordService')
        }).state('front.lockscreen', {
            url: '/lock-screen',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/lock_screen.html',
            title: 'front.LOCKSCREEN',
            resolve: loadSequence('LockScreenCtrl', 'LoginService')
        }).state('front.profile', {
            url: '/profile',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/profile.html',
            title: 'front.PROFILE',
            resolve: loadSequence('jquery-sparkline', 'ProfileFrontCtrl', 'profileFrontService', 'countryService')
        }).state('front.usermenu', {
            url: '/user-menu',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/user_menu.html',
            title: 'front.MENU',
            resolve: loadSequence('UserMenuFrontCtrl', 'userMenuFrontService')
        }).state('front.changepassword', {
            url: '/change-password',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/change_password.html',
            title: 'front.CHANGEPASSWORD',
            resolve: loadSequence('jquery-sparkline', 'ProfileFrontCtrl', 'profileFrontService', 'countryService')
        /*
         * Public Buyer List & Details routes
         */
        }).state('front.buyers',{
            url: '/buyers',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyers.html',
            title: 'front.BUYERS',
            resolve: loadSequence('BuyersFrontCtrl', 'buyerFrontService')
        }).state('front.buyer', {
            url: '/buyer/:id',
            templateUrl : '/bundles/ubidelectricity/js/front/Buyer/buyer.html',
            title: 'front.BUYERDETAILS',
            resolve: loadSequence('BuyerFrontCtrl', 'buyerFrontService')
        /*
         * Public Supplier List & Details routes
         */
        }).state('front.suppliers',{
            url: '/suppliers',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/suppliers.html',
            title: 'front.SUPPLIERS',
            resolve: loadSequence('SuppliersFrontCtrl', 'supplierFrontService')
        }).state('front.supplier', {
            url: '/supplier/:id',
            templateUrl : '/bundles/ubidelectricity/js/front/Supplier/supplier.html',
            title: 'front.SUPPLIERDETAILS',
            resolve: loadSequence('SupplierFrontCtrl', 'supplierFrontService')
        /*
         * Public Product List & Details routes
         */
        }).state('front.products',{
            url: '/products',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/products.html',
            title: 'front.PRODUCTS',
            resolve: loadSequence('ProductsFrontCtrl', 'productFrontService')
        }).state('front.product', {
            url: '/product/:id',
            templateUrl : '/bundles/ubidelectricity/js/front/Product/product.html',
            title: 'front.PRODUCTDETAILS',
            resolve: loadSequence('ProductFrontCtrl', 'productFrontService')
        /*
         * Public Tender Lists & Details routes
         */
        }).state('front.tenders',{
            url: "/tenders",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.tenders.list',{
            url: '/list/:section',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tenders.html',
            title: 'front.TENDERS',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.tenders.details', {
            url: '/details/:id',
            templateUrl : '/bundles/ubidelectricity/js/front/Tender/tender.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('TenderFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.tenders.sector', {
            url: '/sector/:id',
            templateUrl : '/bundles/ubidelectricity/js/front/Tender/sector.html',
            title: 'front.TENDERSBYSECTOR',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.tenders.category',{
            url: '/category/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/category.html',
            title: 'front.TENDERSBYCATEGORY',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.tenders.country',{
            url: '/country/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/country.html',
            title: 'front.TENDERSBYCOUNTRY',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.advanced_search', {
            url: '/advanced-search-results',
            templateUrl: '/bundles/ubidelectricity/js/front/Search/search_results.html',
            title: 'Advanced Search',
            resolve: loadSequence('SearchFormCtrl', 'searchService', 'languageService', 'countryService', 'tenderFrontService', 'checklist-model', 'angular-slider')
        }).state('front.generic_search', {
            url: '/generic-search-results',
            templateUrl: '/bundles/ubidelectricity/js/front/Search/generic_search_result.html',
            title: 'Advanced Search',
            resolve: loadSequence('SearchFormCtrl', 'searchService', 'languageService', 'countryService', 'tenderFrontService', 'checklist-model', 'angular-slider')
        }).state('front.applay_tender', {
            url: '/applay_tender/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/applay_tender.html',
            title: 'Advanced Search',
            resolve: loadSequence('SearchFormCtrl', 'searchService', 'languageService', 'countryService', 'tenderFrontService', 'checklist-model', 'angular-slider')
            /*
             * My Tenders Manager routes
             */
        }).state('front.mytenders',{
            url: '/my-tenders',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYTENDERS',
        }).state('front.mytenders.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tender.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('MyTenderCtrl', 'TenderCtrl', 'tenderService', 'supplierService')
        }).state('front.mytenders.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tender_form.html',
            title: 'front.EDITTENDER',
            resolve: loadSequence('MyTenderFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'supplierService')
        }).state('front.mytenders.new',{
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tender_form.html',
            title: 'front.NEWTENDER',
            resolve: loadSequence('MyTenderFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'supplierService')
        }).state('front.mytenders.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tenders.html',
            title: 'front.MYTENDERS',
            resolve: loadSequence('MyTendersCtrl', 'TendersCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'supplierService')
        /*
         * My Products Manager routes
         */
        }).state('front.myproducts',{
            url: '/my-products',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYPRODUCTS',
            resolve: loadSequence('MyProductCtrl', 'SupplierProductCtrl', 'supplierProductService')
        }).state('front.myproducts.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_product.html',
            title: 'front.PRODUCTDETAILS',
            }).state('front.myproducts.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_product_form.html',
            title: 'front.EDITPRODUCT',
            resolve: loadSequence('MyProductFromCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierProductFormCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
        }).state('front.myproducts.new',{
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_product_form.html',
            title: 'front.NEWPRODUCT',
            resolve: loadSequence('MyProductFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierProductFormCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
        }).state('front.myproducts.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_products.html',
            title: 'front.MYPRODUCTS',
            resolve: loadSequence('MyProductsCtrl', 'SupplierProductsCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
        /*
         * My Bids Manager routes
         */
        }).state('front.mybids',{
            url: '/my-bids',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYBIDS',
            resolve: loadSequence()
        }).state('front.mybids.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bids.html',
            title: 'front.MYBIDS',
            params: {
                'bidsIsFiltersVisible': null,
                'bidsPage': null,
                'bidsCount': null,
                'bidsSorting': null,
                'bidsFilter': null
            },
            resolve: loadSequence('MyBidsCtrl', 'BidsCtrl', 'bidService', 'tenderService', 'supplierService', 'userService')
        }).state('front.mybids.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bid.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('MyBidCtrl', 'BidCtrl', 'bidService')
        }).state('front.mybids.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bid_form.html',
            title: 'front.EDITTENDER',
            resolve: loadSequence('MyBidFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService')
        }).state('front.mybids.new',{
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bid_form.html',
            title: 'front.NEWBID',
            resolve: loadSequence('MyBidFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService')

            /*
             * My BookmarkProject Manager routes
             */
        }).state('front.bookmarkproject',{
            url: '/bookmark-project',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.BOOKMARKPROJECT',
            resolve: loadSequence()
        }).state('front.bookmarkproject.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tenders_bookmarked.html',
            title: 'front.BOOKMARKPROJECT',
            params: {
                'tenderBookmarksIsFiltersVisible': null,
                'tenderBookmarksPage': null,
                'tenderBookmarksCount': null,
                'tenderBookmarksSorting': null,
                'tenderBookmarksFilter': null
            },
            resolve: loadSequence('MyTenderBookmarkedCtrl','TenderBookmarksCtrl', 'tenderBookmarkService', 'tenderService', 'userService')
        }).state('front.bookmarkproject.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tender_bookmarked.html',
            title: 'front.TENDERBOOKMARKEDDETAILS',
            resolve: loadSequence('MyTenderBookmarkedDetailsCtrl',  'tenderBookmarkService')
            /*
             * My Buyers Manager routes
             */
        }).state('front.mybuyers',{
            url: '/my-buyers',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYBUYERS',
        }).state('front.mybuyers.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyer.html',
            title: 'front.BUYERDETAILS',
            resolve: loadSequence('MyBuyerCtrl', 'BuyerCtrl', 'buyerService')
        }).state('front.mybuyers.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyer_form.html',
            title: 'front.EDITBUYER',
            resolve: loadSequence('MyBuyerFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService')
        }).state('front.mybuyers.new',{
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyer_form.html',
            title: 'front.NEWBUYER',
            resolve: loadSequence('MyBuyerFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService')
        }).state('front.mybuyers.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyers.html',
            title: 'front.MYBUYERS',
            resolve: loadSequence('MyBuyersCtrl', 'BuyersCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService', 'profileFrontService')
        /*
         * My Suppliers Manager routes
         */
        }).state('front.mysuppliers',{
            url: '/my-suppliers',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYSUPPLIERS',
        }).state('front.mysuppliers.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_supplier.html',
            title: 'front.SUPPLIERDETAILS',
            resolve: loadSequence('MySupplierCtrl', 'SupplierCtrl', 'supplierService')
        }).state('front.mysuppliers.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_supplier_form.html',
            title: 'front.EDITSUPPLIER',
            resolve: loadSequence('MySupplierFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'regionService', 'countryService', 'sectorService', 'supplierTypeService', 'biddingTypeService', 'userService')
        }).state('front.mysuppliers.new',{
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_supplier_form.html',
            title: 'front.NEWSUPPLIER',
            resolve: loadSequence('MySupplierFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService')
        }).state('front.mysuppliers.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_suppliers.html',
            title: 'front.MYSUPPLIERS',
            resolve: loadSequence('MySuppliersCtrl', 'SuppliersCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService')
        /*
        * Public Pages routes
        */
        }).state('front.contact', {
            url: '/contact',
            templateUrl : '/bundles/ubidelectricity/js/front/Contact/contact_form.html',
            title: 'front.CONTACT',
            resolve: loadSequence('contactService', 'ContactFormCtrl')
        }).state('front.post',{
            url: '/post/:slug',
            templateUrl: '/bundles/ubidelectricity/js/front/Post/post.html',
            title: 'front.POST',
            resolve: loadSequence('PostFrontCtrl', 'postFrontService')
            /*
            * Project Bids manager routes
            */
        }).state('front.projectbids',{
            url: '/project-bids',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.PROJECTBIDS',
            resolve: loadSequence()
        }).state('front.projectbids.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/ProjectBids/my_project_bids.html',
            title: 'front.PROJECTBIDS',
            resolve: loadSequence('MyProjectBidsCtrl' ,'TendersCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'projectBidsFrontService')
        }).state('front.projectbids.bids', {
            url: '/bids-by-project/:projectId',
            templateUrl: '/bundles/ubidelectricity/js/front/ProjectBids/bids-by-project.html',
            title: 'front.BIDSBYPROJECT',
            resolve: loadSequence('BidsByProjectCtrl', 'tenderService', 'biddingTypeService', 'userService', 'categoryService', 'projectBidsFrontService')
        }).state('front.projectbids.bid', {
            url: '/details/:slug/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/ProjectBids/bid_details.html',
            title: 'front.BIDSBYPROJECT',
            resolve: loadSequence('BidDetailsCtrl', 'BidCtrl', 'bidService', 'projectBidsFrontService')
        }).state('front.projectbids.shortlist', {
            url: '/short-list',
            templateUrl: '/bundles/ubidelectricity/js/front/ProjectBids/my_project_bids_short_list.html',
            title: 'front.PROJECTBIDSSHORTLIST',
           /* params: {
                'bidsIsFiltersVisible': null,
                'bidsPage': null,
                'bidsCount': null,
                'bidsSorting': null,
                'bidsFilter': null
            },*/
            resolve: loadSequence('BidsShortListCtrl','BidsCtrl', 'bidService', 'tenderService', 'supplierService', 'userService', 'projectBidsFrontService')
        })
    }]);
