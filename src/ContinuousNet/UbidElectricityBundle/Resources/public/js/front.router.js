
/**
 * Config for the app router
 */
app.config(['$stateProvider',
    function ($stateProvider) {

        $stateProvider.state('auth', {
            url: '/auth',
            template: '<div ui-view class="fade-in-right-big smooth"></div>',
            title: 'sidebar.nav.auth.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.auth.MAIN'
            }
        }).state('front.login', {
            url: '/login',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/login.html',
            title: 'content.list.LOGIN',
            ncyBreadcrumb: {
                label: 'content.list.LOGIN'
            },
            data: {
                appClasses: 'bg-white usersession',
                contentClasses: 'full-height'
            },
            resolve: loadSequence('LoginCtrl', 'LoginService')
        }).state('front.register', {
            url: '/register/:type',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/register.html',
            title: 'content.list.REGISTER',
            ncyBreadcrumb: {
                label: 'content.list.REGISTER'
            },
            data: {
                appClasses: 'bg-white usersession',
                contentClasses: 'full-height'
            },
            resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'RegisterFrontCtrl', 'RegisterService', 'countryService', 'groupService', 'languageService', 'userService', 'RegisterService')
        }).state('auth.resetpassword', {
            url: '/reset-password',
            templateUrl: '/bundles/ubidelectricity/js/components/Auth/reset_password.html',
            title: 'content.list.RESETPAWSSWORD',
            ncyBreadcrumb: {
                label: 'content.list.RESETPAWSSWORD'
            },
            data: {
                appClasses: 'bg-white usersession',
                contentClasses: 'full-height'
            },
            resolve: loadSequence('ResetPasswordCtrl', 'ResetPasswordService')
        }).state('auth.emailconfirm', {
            url: '/email-confirm/:token/:language',
            templateUrl: '/bundles/ubidelectricity/js/components/Auth/email_confirm.html',
            title: 'content.list.EMAILCONFIRM',
            ncyBreadcrumb: {
                label: 'content.list.EMAILCONFIRM'
            },
            data: {
                appClasses: 'bg-white usersession',
                contentClasses: 'full-height'
            },
            resolve: loadSequence('EmailConfirmCtrl', 'RegisterService')
        }).state('auth.reset', {
            url: '/reset/:token/:language',
            templateUrl: '/bundles/ubidelectricity/js/components/Auth/reset.html',
            title: 'content.list.RESET',
            ncyBreadcrumb: {
                label: 'content.list.RESET'
            },
            data: {
                appClasses: 'bg-white usersession',
                contentClasses: 'full-height'
            },
            resolve: loadSequence('ResetCtrl', 'ResetPasswordService')
        }).state('auth.lockscreen', {
            url: '/lock-screen',
            templateUrl: '/bundles/ubidelectricity/js/components/Auth/lock_screen.html',
            title: 'content.list.LOCKSCREEN',
            ncyBreadcrumb: {
                label: 'content.list.LOCKSCREEN'
            },
            data: {
                appClasses: 'bg-white usersession',
                contentClasses: 'full-height'
            },
            resolve: loadSequence('LockScreenCtrl', 'LoginService')
        }).state('front.profile', {
            url: '/profile',
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/profile.html',
            title: 'topbar.user.PROFILE',
            ncyBreadcrumb: {
                label: 'topbar.user.PROFILE'
            },
            resolve: loadSequence('jquery-sparkline', 'ProfileFrontCtrl', 'profileFrontService', 'countryService')
        }).state('front.changepassword', {
            url: '/change-password',
            templateUrl: '/bundles/ubidelectricity/js/components/Auth/change_password.html',
            title: 'topbar.user.CHANGEPASSWORD',
            ncyBreadcrumb: {
                label: 'topbar.user.CHANGEPASSWORD'
            },
            resolve: loadSequence('jquery-sparkline', 'ChangePasswordCtrl', 'ProfileService')
        }).state('front.home', {
            url:'/',
            templateUrl : '/bundles/ubidelectricity/js/front/Home/home.html',
            title: "HOME PAGE UBID",
            resolve: loadSequence('HomeCtrl' ,'homeService')
        }).state('front.contact', {
            url:'/contact',
            templateUrl : "/bundles/ubidelectricity/js/front/Contact/contact_form.html",
            title: "Contact page",
            resolve: loadSequence('contactService', 'ContactFormCtrl')
        }).state('front.about', {
            url:'/about-us',
            template : "<div>this is about us page</div>",
            title: "about us page",
            resolve: loadSequence()
        }).state('front.tenders',{
            url: "/tenders",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.tenders.sector', {
            url:'/sector/:id',
            templateUrl : '/bundles/ubidelectricity/js/front/Sector/tenderList.html',
            title: "sector",
            resolve: loadSequence()
        }).state('front.tenders.list',{
            url: '/list/:section',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tenders.html',
            title: "Tenders list",
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.tenders.category',{
            url: '/category/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tenders.html',
            title: 'Tenders list filtred by category',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.tender',{
            url: "/tender",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.tender.details',{
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tender.html',
            title: "Tender description",
            resolve: loadSequence('TenderFrontCtrl', 'tenderFrontService')
        }).state('front.tender.add',{
            url: '/add',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/add_tender.html',
            title: "Tender description",
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'tenderCategoryService', 'TenderFrontFormCtrl')
        }).state('front.advanced_search', {
            url: '/advanced-search',
            templateUrl: '/bundles/ubidelectricity/js/front/Search/search_form.html',
            title: "Advanced Search",
            resolve: loadSequence('SearchFormCtrl', 'searchService', 'languageService', 'countryService', 'tenderFrontService', 'checklist-model', 'angular-slider')
        }).state('front.bidder',{
            url: "/bidder",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.buyer',{
            url: "/buyer",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.buyer.add',{
            url:"/buyer/add",
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/add_buyer.html',
            title: 'ADD buyer',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'userService', 'BuyerFrontFormCtrl'),
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.buyer.list',{
            url:"/buyer/list",
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyers.html',
            title: 'ADD buyer',
            resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'userService', 'BuyersCtrl' ,'BuyersFrontCtrl'),
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.buyers',{
            url: "/buyers",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.buyers.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyers.html',
            title: "Buyers list",
            resolve: loadSequence('BuyersFrontCtrl', 'homeService', 'BuyerFrontService')
        }).state('front.suppliers',{
            url: "/buyers",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.suppliers.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/suppliers.html',
            title: "Suppliers list",
            resolve: loadSequence('SuppliersFrontCtrl', 'homeService', 'SupplierFrontService')
        }).state('front.product',{
            url: "/products",
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'sidebar.nav.adserving.MAIN',
            ncyBreadcrumb: {
                label: 'sidebar.nav.adserving.MAIN'
            }
        }).state('front.products.list',{
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/products.html',
            title: "Products list",
            resolve: loadSequence('ProductsFrontCtrl', 'homeService', 'ProductFrontService')
        }).state('front.post',{
            url: '/post/:slug',
            templateUrl: '/bundles/ubidelectricity/js/front/Post/post.html',
            title: "Post",
            resolve: loadSequence('PostFrontCtrl', 'postFrontService')
        })
    }]);
