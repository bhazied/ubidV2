
/**
 * Config for the app router
 */
app.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('front.home', {
            url: '/',
            templateUrl : '/bundles/ubidelectricity/js/front/Home/home.html',
            title: 'front.HOME',
            resolve: loadSequence('HomeCtrl' ,'homeService')
        }).state('front.login', {
            url: '/login',
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
            url: '/email-confirm/:token/:language',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/email_confirm.html',
            title: 'front.EMAILCONFIRM',
            resolve: loadSequence('EmailConfirmCtrl', 'RegisterService')
        }).state('front.reset', {
            url: '/reset/:token/:language',
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
        }).state('front.contact', {
            url: '/contact',
            templateUrl : '/bundles/ubidelectricity/js/front/Contact/contact_form.html',
            title: 'front.CONTACT',
            resolve: loadSequence('contactService', 'ContactFormCtrl')
        }).state('front.buyers',{
            url: '/buyers',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyers.html',
            title: 'front.BUYERS',
            resolve: loadSequence('BuyersFrontCtrl', 'homeService', 'buyerFrontService')
        }).state('front.suppliers',{
            url: '/suppliers',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/suppliers.html',
            title: 'front.SUPPLIERS',
            resolve: loadSequence('SuppliersFrontCtrl', 'homeService', 'supplierFrontService')
        }).state('front.products',{
            url: '/products',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/products.html',
            title: 'front.PRODUCTS',
            resolve: loadSequence('ProductsFrontCtrl', 'homeService', 'productFrontService')
        }).state('front.tenders',{
            url: '/tenders',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tenders.html',
            title: 'front.TENDERS',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
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
            url: '/advanced-search',
            templateUrl: '/bundles/ubidelectricity/js/front/Search/search_form.html',
            title: 'Advanced Search',
            resolve: loadSequence('SearchFormCtrl', 'searchService', 'languageService', 'countryService', 'tenderFrontService', 'checklist-model', 'angular-slider')
        }).state('front.mytenders',{
            url: '/my-tenders',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYTENDERS',
        }).state('front.mytenders.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tender.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('TenderFrontCtrl', 'tenderFrontService')
        }).state('front.mytenders.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tender_form.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'tenderCategoryService', 'TenderFrontFormCtrl')
        }).state('front.mytenders.add',{
            url: '/add',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tender_form.html',
            title: 'front.NEWTENDER',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'tenderCategoryService', 'TenderFrontFormCtrl')
        }).state('front.mytenders.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tenders.html',
            title: 'front.MYTENDERS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'tenderService', 'tenderTypeService', 'countryService', 'languageService', 'userService', 'TendersFrontCtrl')
        }).state('front.myproducts',{
            url: '/my-products',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYPRODUCTS',
        }).state('front.myproducts.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_product.html',
            title: 'front.PRODUCTDETAILS',
            resolve: loadSequence('ProductFrontCtrl', 'productFrontService')
        }).state('front.myproducts.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/product_form.html',
            title: 'front.PRODUCTDETAILS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ProductFormCtrl', 'productService', 'regionService', 'countryService', 'sectorService', 'productTypeService', 'biddingTypeService', 'userService', 'productCategoryService', 'ProductFrontFormCtrl')
        }).state('front.myproducts.add',{
            url: '/add',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/product_form.html',
            title: 'front.NEWPRODUCT',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ProductFormCtrl', 'productService', 'regionService', 'countryService', 'sectorService', 'productTypeService', 'biddingTypeService', 'userService', 'productCategoryService', 'ProductFrontFormCtrl')
        }).state('front.myproducts.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_products.html',
            title: 'front.MYPRODUCTS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'productService', 'productTypeService', 'countryService', 'languageService', 'userService', 'ProductsFrontCtrl')
        }).state('front.mybuyers',{
            url: '/my-buyers',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYBUYERS',
        }).state('front.mybuyers.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyer.html',
            title: 'front.BUYERDETAILS',
            resolve: loadSequence('BuyerFrontCtrl', 'buyerFrontService')
        }).state('front.mybuyers.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyer_form.html',
            title: 'front.BUYERDETAILS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'regionService', 'countryService', 'sectorService', 'buyerTypeService', 'biddingTypeService', 'userService', 'buyerCategoryService', 'BuyerFrontFormCtrl')
        }).state('front.mybuyers.add',{
            url: '/add',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyer_form.html',
            title: 'front.NEWBUYER',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'regionService', 'countryService', 'sectorService', 'buyerTypeService', 'biddingTypeService', 'userService', 'buyerCategoryService', 'BuyerFrontFormCtrl')
        }).state('front.mybuyers.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyers.html',
            title: 'front.MYBUYERS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'userService', 'BuyersFrontCtrl')
        }).state('front.mysuppliers',{
            url: '/my-suppliers',
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYSUPPLIERS',
        }).state('front.mysuppliers.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_supplier.html',
            title: 'front.SUPPLIERDETAILS',
            resolve: loadSequence('SupplierFrontCtrl', 'supplierFrontService')
        }).state('front.mysuppliers.edit',{
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/supplier_form.html',
            title: 'front.SUPPLIERDETAILS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'regionService', 'countryService', 'sectorService', 'supplierTypeService', 'biddingTypeService', 'userService', 'supplierCategoryService', 'SupplierFrontFormCtrl')
        }).state('front.mysuppliers.add',{
            url: '/add',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/supplier_form.html',
            title: 'front.NEWSUPPLIER',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'regionService', 'countryService', 'sectorService', 'supplierTypeService', 'biddingTypeService', 'userService', 'supplierCategoryService', 'SupplierFrontFormCtrl')
        }).state('front.mysuppliers.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_suppliers.html',
            title: 'front.MYSUPPLIERS',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'userService', 'SuppliersFrontCtrl')
        }).state('front.post',{
            url: '/post/:slug',
            templateUrl: '/bundles/ubidelectricity/js/front/Post/post.html',
            title: 'front.POST',
            resolve: loadSequence('PostFrontCtrl', 'postFrontService')
        })
    }]);
