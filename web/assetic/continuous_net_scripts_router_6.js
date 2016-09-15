
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
    }).state('auth.login', {
        url: '/login',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/login.html',
        title: 'content.list.LOGIN',
        ncyBreadcrumb: {
            label: 'content.list.LOGIN'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('LoginCtrl', 'LoginService')
    }).state('auth.register', {
        url: '/register',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/register.html',
        title: 'content.list.REGISTER',
        ncyBreadcrumb: {
            label: 'content.list.REGISTER'
        },
        data: {
            appClasses: 'bg-white usersession',
            contentClasses: 'full-height'
        },
        resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'RegisterCtrl', 'RegisterService')
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
    }).state('app.profile', {
        url: '/profile',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/profile.html',
        title: 'topbar.user.PROFILE',
        ncyBreadcrumb: {
            label: 'topbar.user.PROFILE'
        },
        resolve: loadSequence('jquery-sparkline', 'ProfileCtrl', 'ProfileService', 'countryService')
    }).state('app.changepassword', {
        url: '/change-password',
        templateUrl: '/bundles/ubidelectricity/js/components/Auth/change_password.html',
        title: 'topbar.user.CHANGEPASSWORD',
        ncyBreadcrumb: {
            label: 'topbar.user.CHANGEPASSWORD'
        },
        resolve: loadSequence('jquery-sparkline', 'ChangePasswordCtrl', 'ProfileService')
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: '/bundles/ubidelectricity/js/components/Main/dashboard.html',
        title: 'content.list.DASHBOARD',
        ncyBreadcrumb: {
            label: 'content.list.DASHBOARD'
        },
        resolve: loadSequence('jquery-sparkline', 'DashboardCtrl', 'DashboardService')
    }).state('app.tenders', {
        url: '/tenders',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.tenders.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.tenders.MAIN'
        }
    }).state('app.tenders.sectors', {
        url: '/sectors',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sectors.html',
        title: 'content.list.SECTORS',
        ncyBreadcrumb: {
            label: 'content.list.SECTORS'
        },
        resolve: loadSequence('ngTable', 'SectorsCtrl', 'sectorService', 'userService')
    }).state('app.tenders.sectorsnew', {
        url: '/sectors/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sector_form.html',
        title: 'content.list.NEWSECTOR',
        ncyBreadcrumb: {
            label: 'content.list.NEWSECTOR'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SectorFormCtrl', 'sectorService', 'userService')
    }).state('app.tenders.sectorsedit', {
        url: '/sectors/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sector_form.html',
        title: 'content.list.EDITSECTOR',
        ncyBreadcrumb: {
            label: 'content.list.EDITSECTOR'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SectorFormCtrl', 'sectorService', 'userService')
    }).state('app.tenders.sectorsdetails', {
        url: '/sectors/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Sector/sector.html',
        ncyBreadcrumb: {
            label: 'content.list.SECTORDETAILS'
        },
        resolve: loadSequence('SectorCtrl', 'sectorService')
    }).state('app.tenders.tendercategories', {
        url: '/tender-categories',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderCategory/tender_categories.html',
        title: 'content.list.TENDERCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.TENDERCATEGORIES'
        },
        resolve: loadSequence('ngTable', 'TenderCategoriesCtrl', 'tenderCategoryService', 'productTypeService', 'userService')
    }).state('app.tenders.tendercategoriesnew', {
        url: '/tender-categories/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderCategory/tender_category_form.html',
        title: 'content.list.NEWTENDERCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDERCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderCategoryFormCtrl', 'tenderCategoryService', 'productTypeService', 'userService')
    }).state('app.tenders.tendercategoriesedit', {
        url: '/tender-categories/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderCategory/tender_category_form.html',
        title: 'content.list.EDITTENDERCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDERCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderCategoryFormCtrl', 'tenderCategoryService', 'productTypeService', 'userService')
    }).state('app.tenders.tendercategoriesdetails', {
        url: '/tender-categories/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderCategory/tender_category.html',
        ncyBreadcrumb: {
            label: 'content.list.TENDERCATEGORYDETAILS'
        },
        resolve: loadSequence('TenderCategoryCtrl', 'tenderCategoryService')
    }).state('app.tenders.producttypes', {
        url: '/product-types',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_types.html',
        title: 'content.list.PRODUCTTYPES',
        ncyBreadcrumb: {
            label: 'content.list.PRODUCTTYPES'
        },
        resolve: loadSequence('ngTable', 'ProductTypesCtrl', 'productTypeService', 'userService')
    }).state('app.tenders.producttypesnew', {
        url: '/product-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_type_form.html',
        title: 'content.list.NEWPRODUCTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPRODUCTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ProductTypeFormCtrl', 'productTypeService', 'userService')
    }).state('app.tenders.producttypesedit', {
        url: '/product-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_type_form.html',
        title: 'content.list.EDITPRODUCTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPRODUCTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'ProductTypeFormCtrl', 'productTypeService', 'userService')
    }).state('app.tenders.producttypesdetails', {
        url: '/product-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/ProductType/product_type.html',
        ncyBreadcrumb: {
            label: 'content.list.PRODUCTTYPEDETAILS'
        },
        resolve: loadSequence('ProductTypeCtrl', 'productTypeService')
    }).state('app.tenders.tendertypes', {
        url: '/tender-types',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_types.html',
        title: 'content.list.TENDERTYPES',
        ncyBreadcrumb: {
            label: 'content.list.TENDERTYPES'
        },
        resolve: loadSequence('ngTable', 'TenderTypesCtrl', 'tenderTypeService', 'userService')
    }).state('app.tenders.tendertypesnew', {
        url: '/tender-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_type_form.html',
        title: 'content.list.NEWTENDERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderTypeFormCtrl', 'tenderTypeService', 'userService')
    }).state('app.tenders.tendertypesedit', {
        url: '/tender-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_type_form.html',
        title: 'content.list.EDITTENDERTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDERTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderTypeFormCtrl', 'tenderTypeService', 'userService')
    }).state('app.tenders.tendertypesdetails', {
        url: '/tender-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderType/tender_type.html',
        ncyBreadcrumb: {
            label: 'content.list.TENDERTYPEDETAILS'
        },
        resolve: loadSequence('TenderTypeCtrl', 'tenderTypeService')
    }).state('app.tenders.biddingtypes', {
        url: '/bidding-types',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_types.html',
        title: 'content.list.BIDDINGTYPES',
        ncyBreadcrumb: {
            label: 'content.list.BIDDINGTYPES'
        },
        resolve: loadSequence('ngTable', 'BiddingTypesCtrl', 'biddingTypeService', 'userService')
    }).state('app.tenders.biddingtypesnew', {
        url: '/bidding-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_type_form.html',
        title: 'content.list.NEWBIDDINGTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWBIDDINGTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BiddingTypeFormCtrl', 'biddingTypeService', 'userService')
    }).state('app.tenders.biddingtypesedit', {
        url: '/bidding-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_type_form.html',
        title: 'content.list.EDITBIDDINGTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITBIDDINGTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BiddingTypeFormCtrl', 'biddingTypeService', 'userService')
    }).state('app.tenders.biddingtypesdetails', {
        url: '/bidding-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BiddingType/bidding_type.html',
        ncyBreadcrumb: {
            label: 'content.list.BIDDINGTYPEDETAILS'
        },
        resolve: loadSequence('BiddingTypeCtrl', 'biddingTypeService')
    }).state('app.settings', {
        url: '/settings',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.settings.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.settings.MAIN'
        }
    }).state('app.settings.languages', {
        url: '/languages',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/languages.html',
        title: 'content.list.LANGUAGES',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGES'
        },
        resolve: loadSequence('ngTable', 'LanguagesCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesnew', {
        url: '/languages/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/language_form.html',
        title: 'content.list.NEWLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.NEWLANGUAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LanguageFormCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesedit', {
        url: '/languages/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/language_form.html',
        title: 'content.list.EDITLANGUAGE',
        ncyBreadcrumb: {
            label: 'content.list.EDITLANGUAGE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LanguageFormCtrl', 'languageService', 'userService')
    }).state('app.settings.languagesdetails', {
        url: '/languages/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Language/language.html',
        ncyBreadcrumb: {
            label: 'content.list.LANGUAGEDETAILS'
        },
        resolve: loadSequence('LanguageCtrl', 'languageService')
    }).state('app.settings.countries', {
        url: '/countries',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/countries.html',
        title: 'content.list.COUNTRIES',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRIES'
        },
        resolve: loadSequence('ngTable', 'CountriesCtrl', 'countryService', 'regionService', 'userService')
    }).state('app.settings.countriesnew', {
        url: '/countries/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/country_form.html',
        title: 'content.list.NEWCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.NEWCOUNTRY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CountryFormCtrl', 'countryService', 'regionService', 'userService')
    }).state('app.settings.countriesedit', {
        url: '/countries/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/country_form.html',
        title: 'content.list.EDITCOUNTRY',
        ncyBreadcrumb: {
            label: 'content.list.EDITCOUNTRY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'CountryFormCtrl', 'countryService', 'regionService', 'userService')
    }).state('app.settings.countriesdetails', {
        url: '/countries/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Country/country.html',
        ncyBreadcrumb: {
            label: 'content.list.COUNTRYDETAILS'
        },
        resolve: loadSequence('CountryCtrl', 'countryService')
    }).state('app.settings.regions', {
        url: '/regions',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/regions.html',
        title: 'content.list.REGIONS',
        ncyBreadcrumb: {
            label: 'content.list.REGIONS'
        },
        resolve: loadSequence('ngTable', 'RegionsCtrl', 'regionService', 'userService')
    }).state('app.settings.regionsnew', {
        url: '/regions/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/region_form.html',
        title: 'content.list.NEWREGION',
        ncyBreadcrumb: {
            label: 'content.list.NEWREGION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'RegionFormCtrl', 'regionService', 'userService')
    }).state('app.settings.regionsedit', {
        url: '/regions/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/region_form.html',
        title: 'content.list.EDITREGION',
        ncyBreadcrumb: {
            label: 'content.list.EDITREGION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'RegionFormCtrl', 'regionService', 'userService')
    }).state('app.settings.regionsdetails', {
        url: '/regions/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Region/region.html',
        ncyBreadcrumb: {
            label: 'content.list.REGIONDETAILS'
        },
        resolve: loadSequence('RegionCtrl', 'regionService')
    }).state('app.settings.menus', {
        url: '/menus',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menus.html',
        title: 'content.list.MENUS',
        ncyBreadcrumb: {
            label: 'content.list.MENUS'
        },
        resolve: loadSequence('ngTable', 'MenusCtrl', 'menuService', 'userService')
    }).state('app.settings.menusnew', {
        url: '/menus/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menu_form.html',
        title: 'content.list.NEWMENU',
        ncyBreadcrumb: {
            label: 'content.list.NEWMENU'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuFormCtrl', 'menuService', 'userService')
    }).state('app.settings.menusedit', {
        url: '/menus/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menu_form.html',
        title: 'content.list.EDITMENU',
        ncyBreadcrumb: {
            label: 'content.list.EDITMENU'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuFormCtrl', 'menuService', 'userService')
    }).state('app.settings.menusdetails', {
        url: '/menus/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Menu/menu.html',
        ncyBreadcrumb: {
            label: 'content.list.MENUDETAILS'
        },
        resolve: loadSequence('MenuCtrl', 'menuService')
    }).state('app.settings.menulinks', {
        url: '/menu-links',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_links.html',
        title: 'content.list.MENULINKS',
        ncyBreadcrumb: {
            label: 'content.list.MENULINKS'
        },
        resolve: loadSequence('ngTable', 'MenuLinksCtrl', 'menuLinkService', 'menuService', 'userService')
    }).state('app.settings.menulinksnew', {
        url: '/menu-links/new',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_link_form.html',
        title: 'content.list.NEWMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.NEWMENULINK'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuLinkFormCtrl', 'menuLinkService', 'menuService', 'userService')
    }).state('app.settings.menulinksedit', {
        url: '/menu-links/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_link_form.html',
        title: 'content.list.EDITMENULINK',
        ncyBreadcrumb: {
            label: 'content.list.EDITMENULINK'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'MenuLinkFormCtrl', 'menuLinkService', 'menuService', 'userService')
    }).state('app.settings.menulinksdetails', {
        url: '/menu-links/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/MenuLink/menu_link.html',
        ncyBreadcrumb: {
            label: 'content.list.MENULINKDETAILS'
        },
        resolve: loadSequence('MenuLinkCtrl', 'menuLinkService')
    }).state('app.access', {
        url: '/access',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.access.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.access.MAIN'
        }
    }).state('app.access.users', {
        url: '/users',
        templateUrl: '/bundles/ubidelectricity/js/components/User/users.html',
        title: 'content.list.USERS',
        ncyBreadcrumb: {
            label: 'content.list.USERS'
        },
        resolve: loadSequence('ngTable', 'UsersCtrl', 'userService', 'countryService', 'languageService', 'groupService')
    }).state('app.access.usersnew', {
        url: '/users/new',
        templateUrl: '/bundles/ubidelectricity/js/components/User/user_form.html',
        title: 'content.list.NEWUSER',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserFormCtrl', 'userService', 'countryService', 'languageService', 'groupService')
    }).state('app.access.usersedit', {
        url: '/users/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/User/user_form.html',
        title: 'content.list.EDITUSER',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserFormCtrl', 'userService', 'countryService', 'languageService', 'groupService')
    }).state('app.access.usersdetails', {
        url: '/users/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/User/user.html',
        ncyBreadcrumb: {
            label: 'content.list.USERDETAILS'
        },
        resolve: loadSequence('UserCtrl', 'userService')
    }).state('app.access.notifications', {
        url: '/notifications',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notifications.html',
        title: 'content.list.NOTIFICATIONS',
        ncyBreadcrumb: {
            label: 'content.list.NOTIFICATIONS'
        },
        resolve: loadSequence('ngTable', 'NotificationsCtrl', 'notificationService', 'userService')
    }).state('app.access.notificationsnew', {
        url: '/notifications/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notification_form.html',
        title: 'content.list.NEWNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.NEWNOTIFICATION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'NotificationFormCtrl', 'notificationService', 'userService')
    }).state('app.access.notificationsedit', {
        url: '/notifications/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notification_form.html',
        title: 'content.list.EDITNOTIFICATION',
        ncyBreadcrumb: {
            label: 'content.list.EDITNOTIFICATION'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'NotificationFormCtrl', 'notificationService', 'userService')
    }).state('app.access.notificationsdetails', {
        url: '/notifications/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Notification/notification.html',
        ncyBreadcrumb: {
            label: 'content.list.NOTIFICATIONDETAILS'
        },
        resolve: loadSequence('NotificationCtrl', 'notificationService')
    }).state('app.access.groups', {
        url: '/groups',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/groups.html',
        title: 'content.list.GROUPS',
        ncyBreadcrumb: {
            label: 'content.list.GROUPS'
        },
        resolve: loadSequence('ngTable', 'GroupsCtrl', 'groupService', 'userService')
    }).state('app.access.groupsnew', {
        url: '/groups/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/group_form.html',
        title: 'content.list.NEWGROUP',
        ncyBreadcrumb: {
            label: 'content.list.NEWGROUP'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'GroupFormCtrl', 'groupService', 'userService')
    }).state('app.access.groupsedit', {
        url: '/groups/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/group_form.html',
        title: 'content.list.EDITGROUP',
        ncyBreadcrumb: {
            label: 'content.list.EDITGROUP'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'GroupFormCtrl', 'groupService', 'userService')
    }).state('app.access.groupsdetails', {
        url: '/groups/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Group/group.html',
        ncyBreadcrumb: {
            label: 'content.list.GROUPDETAILS'
        },
        resolve: loadSequence('GroupCtrl', 'groupService')
    }).state('app.access.logs', {
        url: '/logs',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/logs.html',
        title: 'content.list.LOGS',
        ncyBreadcrumb: {
            label: 'content.list.LOGS'
        },
        resolve: loadSequence('ngTable', 'LogsCtrl', 'logService', 'userService')
    }).state('app.access.logsnew', {
        url: '/logs/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/log_form.html',
        title: 'content.list.NEWLOG',
        ncyBreadcrumb: {
            label: 'content.list.NEWLOG'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LogFormCtrl', 'logService', 'userService')
    }).state('app.access.logsedit', {
        url: '/logs/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/log_form.html',
        title: 'content.list.EDITLOG',
        ncyBreadcrumb: {
            label: 'content.list.EDITLOG'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'LogFormCtrl', 'logService', 'userService')
    }).state('app.access.logsdetails', {
        url: '/logs/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Log/log.html',
        ncyBreadcrumb: {
            label: 'content.list.LOGDETAILS'
        },
        resolve: loadSequence('LogCtrl', 'logService')
    }).state('app.access.usersettings', {
        url: '/user-settings',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_settings.html',
        title: 'content.list.USERSETTINGS',
        ncyBreadcrumb: {
            label: 'content.list.USERSETTINGS'
        },
        resolve: loadSequence('ngTable', 'UserSettingsCtrl', 'userSettingService', 'userService')
    }).state('app.access.usersettingsnew', {
        url: '/user-settings/new',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_setting_form.html',
        title: 'content.list.NEWUSERSETTING',
        ncyBreadcrumb: {
            label: 'content.list.NEWUSERSETTING'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserSettingFormCtrl', 'userSettingService', 'userService')
    }).state('app.access.usersettingsedit', {
        url: '/user-settings/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_setting_form.html',
        title: 'content.list.EDITUSERSETTING',
        ncyBreadcrumb: {
            label: 'content.list.EDITUSERSETTING'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'UserSettingFormCtrl', 'userSettingService', 'userService')
    }).state('app.access.usersettingsdetails', {
        url: '/user-settings/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/UserSetting/user_setting.html',
        ncyBreadcrumb: {
            label: 'content.list.USERSETTINGDETAILS'
        },
        resolve: loadSequence('UserSettingCtrl', 'userSettingService')
    }).state('app.statistics', {
        url: '/statistics',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.statistics.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.statistics.MAIN'
        }
    }).state('app.statistics.hits', {
        url: '/hits',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hits.html',
        title: 'content.list.HITS',
        ncyBreadcrumb: {
            label: 'content.list.HITS'
        },
        resolve: loadSequence('ngTable', 'HitsCtrl', 'hitService', 'visitService', 'userService')
    }).state('app.statistics.hitsnew', {
        url: '/hits/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hit_form.html',
        title: 'content.list.NEWHIT',
        ncyBreadcrumb: {
            label: 'content.list.NEWHIT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'HitFormCtrl', 'hitService', 'visitService', 'userService')
    }).state('app.statistics.hitsedit', {
        url: '/hits/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hit_form.html',
        title: 'content.list.EDITHIT',
        ncyBreadcrumb: {
            label: 'content.list.EDITHIT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'HitFormCtrl', 'hitService', 'visitService', 'userService')
    }).state('app.statistics.hitsdetails', {
        url: '/hits/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Hit/hit.html',
        ncyBreadcrumb: {
            label: 'content.list.HITDETAILS'
        },
        resolve: loadSequence('HitCtrl', 'hitService')
    }).state('app.statistics.visits', {
        url: '/visits',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visits.html',
        title: 'content.list.VISITS',
        ncyBreadcrumb: {
            label: 'content.list.VISITS'
        },
        resolve: loadSequence('ngTable', 'VisitsCtrl', 'visitService', 'userService')
    }).state('app.statistics.visitsnew', {
        url: '/visits/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visit_form.html',
        title: 'content.list.NEWVISIT',
        ncyBreadcrumb: {
            label: 'content.list.NEWVISIT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'VisitFormCtrl', 'visitService', 'userService')
    }).state('app.statistics.visitsedit', {
        url: '/visits/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visit_form.html',
        title: 'content.list.EDITVISIT',
        ncyBreadcrumb: {
            label: 'content.list.EDITVISIT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'VisitFormCtrl', 'visitService', 'userService')
    }).state('app.statistics.visitsdetails', {
        url: '/visits/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Visit/visit.html',
        ncyBreadcrumb: {
            label: 'content.list.VISITDETAILS'
        },
        resolve: loadSequence('VisitCtrl', 'visitService')
    }).state('app.news', {
        url: '/news',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.news.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.news.MAIN'
        }
    }).state('app.news.posts', {
        url: '/posts',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/posts.html',
        title: 'content.list.POSTS',
        ncyBreadcrumb: {
            label: 'content.list.POSTS'
        },
        resolve: loadSequence('ngTable', 'PostsCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService')
    }).state('app.news.postsnew', {
        url: '/posts/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/post_form.html',
        title: 'content.list.NEWPOST',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOST'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostFormCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService')
    }).state('app.news.postsedit', {
        url: '/posts/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/post_form.html',
        title: 'content.list.EDITPOST',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOST'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostFormCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService')
    }).state('app.news.postsdetails', {
        url: '/posts/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Post/post.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTDETAILS'
        },
        resolve: loadSequence('PostCtrl', 'postService')
    }).state('app.news.postcategories', {
        url: '/post-categories',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_categories.html',
        title: 'content.list.POSTCATEGORIES',
        ncyBreadcrumb: {
            label: 'content.list.POSTCATEGORIES'
        },
        resolve: loadSequence('ngTable', 'PostCategoriesCtrl', 'postCategoryService', 'postTypeService', 'userService')
    }).state('app.news.postcategoriesnew', {
        url: '/post-categories/new',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_category_form.html',
        title: 'content.list.NEWPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOSTCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostCategoryFormCtrl', 'postCategoryService', 'postTypeService', 'userService')
    }).state('app.news.postcategoriesedit', {
        url: '/post-categories/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_category_form.html',
        title: 'content.list.EDITPOSTCATEGORY',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOSTCATEGORY'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostCategoryFormCtrl', 'postCategoryService', 'postTypeService', 'userService')
    }).state('app.news.postcategoriesdetails', {
        url: '/post-categories/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostCategory/post_category.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTCATEGORYDETAILS'
        },
        resolve: loadSequence('PostCategoryCtrl', 'postCategoryService')
    }).state('app.news.posttypes', {
        url: '/post-types',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_types.html',
        title: 'content.list.POSTTYPES',
        ncyBreadcrumb: {
            label: 'content.list.POSTTYPES'
        },
        resolve: loadSequence('ngTable', 'PostTypesCtrl', 'postTypeService', 'userService')
    }).state('app.news.posttypesnew', {
        url: '/post-types/new',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_type_form.html',
        title: 'content.list.NEWPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.NEWPOSTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostTypeFormCtrl', 'postTypeService', 'userService')
    }).state('app.news.posttypesedit', {
        url: '/post-types/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_type_form.html',
        title: 'content.list.EDITPOSTTYPE',
        ncyBreadcrumb: {
            label: 'content.list.EDITPOSTTYPE'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'PostTypeFormCtrl', 'postTypeService', 'userService')
    }).state('app.news.posttypesdetails', {
        url: '/post-types/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/PostType/post_type.html',
        ncyBreadcrumb: {
            label: 'content.list.POSTTYPEDETAILS'
        },
        resolve: loadSequence('PostTypeCtrl', 'postTypeService')
    }).state('app.marketplace', {
        url: '/marketplace',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'sidebar.nav.marketplace.MAIN',
        ncyBreadcrumb: {
            label: 'sidebar.nav.marketplace.MAIN'
        }
    }).state('app.marketplace.tenders', {
        url: '/tenders',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tenders.html',
        title: 'content.list.TENDERS',
        ncyBreadcrumb: {
            label: 'content.list.TENDERS'
        },
        resolve: loadSequence('ngTable', 'TendersCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'userService', 'tenderCategoryService')
    }).state('app.marketplace.tendersnew', {
        url: '/tenders/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender_form.html',
        title: 'content.list.NEWTENDER',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'userService', 'tenderCategoryService')
    }).state('app.marketplace.tendersedit', {
        url: '/tenders/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender_form.html',
        title: 'content.list.EDITTENDER',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'userService', 'tenderCategoryService')
    }).state('app.marketplace.tendersdetails', {
        url: '/tenders/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender.html',
        ncyBreadcrumb: {
            label: 'content.list.TENDERDETAILS'
        },
        resolve: loadSequence('TenderCtrl', 'tenderService')
    }).state('app.marketplace.tenderproducts', {
        url: '/tender-products',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_products.html',
        title: 'content.list.TENDERPRODUCTS',
        ncyBreadcrumb: {
            label: 'content.list.TENDERPRODUCTS'
        },
        resolve: loadSequence('ngTable', 'TenderProductsCtrl', 'tenderProductService', 'tenderService', 'productTypeService', 'userService')
    }).state('app.marketplace.tenderproductsnew', {
        url: '/tender-products/new',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_product_form.html',
        title: 'content.list.NEWTENDERPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDERPRODUCT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderProductFormCtrl', 'tenderProductService', 'tenderService', 'productTypeService', 'userService')
    }).state('app.marketplace.tenderproductsedit', {
        url: '/tender-products/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_product_form.html',
        title: 'content.list.EDITTENDERPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDERPRODUCT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderProductFormCtrl', 'tenderProductService', 'tenderService', 'productTypeService', 'userService')
    }).state('app.marketplace.tenderproductsdetails', {
        url: '/tender-products/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/TenderProduct/tender_product.html',
        ncyBreadcrumb: {
            label: 'content.list.TENDERPRODUCTDETAILS'
        },
        resolve: loadSequence('TenderProductCtrl', 'tenderProductService')
    });

}]);
