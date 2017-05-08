/**
 * Config for the app router
 */
app.config(['$stateProvider',
    function ($stateProvider) {
        /*
         * Main route
         */
        $stateProvider.state('front.main', {
            url: '/',
            templateUrl: '/bundles/ubidelectricity/js/front/Home/home.html',
            title: 'front.HOME',
            resolve: loadSequence('HomeCtrl', 'homeService', 'UserMenuFrontCtrl', 'userMenuFrontService', 'postFrontService', 'notificationService')
        }).state('front.home', {
            url: '/{locale:(?:en|fr|ar)}/',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Home/home.html',
            title: 'front.HOME',
            resolve: loadSequence('HomeCtrl', 'homeService', 'UserMenuFrontCtrl', 'userMenuFrontService', 'postFrontService', 'notificationService')
            /*
             *  User Service routes
             */
        }).state('front.login', {
            url: '/{locale:(?:en|fr|ar)}/login/{type:(?:Buyer|Supplier|Both)}',
            params: {
                type: {
                    value: 'Both'
                },
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/login.html',
            title: 'front.LOGIN',
            resolve: loadSequence('LoginFrontCtrl', 'LoginService')
        }).state('front.logout', {
            url: '/{locale:(?:en|fr|ar)}/logout',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,

                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/logout.html',
            title: 'front.LOGOUT',
            resolve: loadSequence('LogoutFrontCtrl')
        }).state('front.register', {
            url: '/{locale:(?:en|fr|ar)}/register/:type',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/register.html',
            title: 'front.REGISTER',
            resolve: loadSequence('sweet-alert', 'oitozero.ngSweetAlert', 'RegisterFrontCtrl', 'RegisterService', 'countryService', 'groupService', 'languageService', 'userService', 'RegisterService', 'postFrontService', 'ModalPostCtrl')
        }).state('front.resetpassword', {
            url: '/{locale:(?:en|fr|ar)}/reset-password',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/reset_password.html',
            title: 'front.RESETPAWSSWORD',
            resolve: loadSequence('ResetPasswordCtrl', 'ResetPasswordService')
        }).state('front.emailconfirm', {
            url: '/{locale:(?:en|fr|ar)}/auth/email-confirm/:token',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/email_confirm.html',
            title: 'front.EMAILCONFIRM',
            resolve: loadSequence('EmailConfirmCtrl', 'RegisterService')
        }).state('front.reset', {
            url: '/{locale:(?:en|fr|ar)}/auth/reset/:token',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/reset.html',
            title: 'front.RESET',
            resolve: loadSequence('ResetCtrl', 'ResetPasswordService')
        }).state('front.lockscreen', {
            url: '/{locale:(?:en|fr|ar)}/lock-screen',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/lock_screen.html',
            title: 'front.LOCKSCREEN',
            resolve: loadSequence('LockScreenCtrl', 'LoginService')
        }).state('front.profile', {
            url: '/{locale:(?:en|fr|ar)}/profile',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/profile.html',
            title: 'front.PROFILE',
            resolve: loadSequence('jquery-sparkline', 'ProfileFrontCtrl', 'profileFrontService', 'countryService')
        }).state('front.usermenu', {
            url: '/{locale:(?:en|fr|ar)}/user-menu',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/user_menu.html',
            title: 'front.MENU',
            resolve: loadSequence('UserMenuFrontCtrl', 'userMenuFrontService')
        }).state('front.changepassword', {
            url: '/{locale:(?:en|fr|ar)}/change-password',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Auth/change_password.html',
            title: 'front.CHANGEPASSWORD',
            resolve: loadSequence('jquery-sparkline', 'ProfileFrontCtrl', 'profileFrontService', 'countryService')
            /*
             * Public Buyer List & Details routes
             */
        }).state('front.buyers', {
            url: '/{locale:(?:en|fr|ar)}/buyers',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyers.html',
            title: 'front.BUYERS',
            resolve: loadSequence('BuyersFrontCtrl', 'buyerFrontService', 'postFrontService')
        }).state('front.buyerscategory', {
            url: '/{locale:(?:en|fr|ar)}/buyers/:slug',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/category.html',
            title: 'front.BUYERS',
            resolve: loadSequence('BuyersCategoryFrontCtrl', 'buyerFrontService')
        }).state('front.buyer', {
            url: '/{locale:(?:en|fr|ar)}/buyer/:id',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/buyer.html',
            title: 'front.BUYERDETAILS',
            resolve: loadSequence('BuyerFrontCtrl', 'buyerFrontService', 'buyerService')
            /*
             * Public Supplier List & Details routes
             */
        }).state('front.suppliers', {
            url: '/{locale:(?:en|fr|ar)}/suppliers',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/suppliers.html',
            title: 'front.SUPPLIERS',
            resolve: loadSequence('SuppliersFrontCtrl', 'supplierFrontService', 'postFrontService')
        }).state('front.supplierscategory', {
            url: '/{locale:(?:en|fr|ar)}/suppliers/:slug',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/category.html',
            title: 'front.SUPPLIERS',
            resolve: loadSequence('SuppliersCategoryFrontCtrl', 'supplierFrontService')
        }).state('front.supplier', {
            url: '/{locale:(?:en|fr|ar)}/supplier/:id',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/supplier.html',
            title: 'front.SUPPLIERDETAILS',
            resolve: loadSequence('SupplierFrontCtrl', 'supplierFrontService', 'supplierService')
            /*
             * Public Tender Lists & Details routes
             */
        }).state('front.tenders', {
            url: '/{locale:(?:en|fr|ar)}/tenders/:section',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tenders.html',
            title: 'front.TENDERS',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService', 'postFrontService')
        }).state('front.tender', {
            url: '/{locale:(?:en|fr|ar)}/tender/:id',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tender.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('TenderFrontCtrl', 'homeService', 'tenderFrontService', 'tenderService')
        }).state('front.tenders.sector', {
            url: '/sector/:id',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/sector.html',
            title: 'front.TENDERSBYSECTOR',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.tenderscategory', {
            url: '/{locale:(?:en|fr|ar)}/tenders/:section/:slug',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/category.html',
            resolve: loadSequence('TendersCategoryFrontCtrl', 'tenderFrontService')
        }).state('front.tenders.country', {
            url: '/country/:id',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/country.html',
            title: 'front.TENDERSBYCOUNTRY',
            resolve: loadSequence('TendersFrontCtrl', 'homeService', 'tenderFrontService')
        }).state('front.generic_search', {
            url: '/{locale:(?:en|fr|ar)}/generic-search-results',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Search/generic_search_result.html',
            title: 'Advanced Search',
            resolve: loadSequence('SearchFormCtrl', 'searchService', 'languageService', 'countryService', 'tenderFrontService', 'checklist-model', 'angular-slider')
        }).state('front.apply_tender', {
            url: '/{locale:(?:en|fr|ar)}/apply_tender/:idTender',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/apply_tender.html',
            title: 'Advanced Search',
            resolve: loadSequence('ApplyTenderCtrl', 'BidFormCtrl', 'bidService', 'tenderService', 'supplierService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
            /*
             * My Tenders Manager routes
             */
        }).state('front.mytenders', {
            url: '/{locale:(?:en|fr|ar)}/my-tenders',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYTENDERS',
        }).state('front.mytenders.details', {
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tender.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('MyTenderCtrl', 'TenderCtrl', 'tenderService', 'supplierService')
        }).state('front.mytenders.edit', {
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tender_form.html',
            title: 'front.EDITTENDER',
            resolve: loadSequence('MyTenderFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'supplierService')
        }).state('front.mytenders.new', {
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tender_form.html',
            title: 'front.NEWTENDER',
            resolve: loadSequence('MyTenderFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'supplierService')
        }).state('front.mytenders.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/my_tenders.html',
            title: 'front.MYTENDERS',
            resolve: loadSequence('MyTendersCtrl', 'TendersCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'supplierService')

            /**
             * Product Manage route
             */
        }).state('front.product', {
            url: '/{locale:(?:en|fr|ar)}/product/:categorySlug/:slug/:id',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Product/product.html',
            title: 'front.PRODUCTDETAILS',
            resolve: loadSequence('ProductFrontCtrl', 'supplierFrontService')
            /*
             * My Products Manager routes
             */
        }).state('front.myproducts', {
            url: '/{locale:(?:en|fr|ar)}/my-products',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYPRODUCTS',
            resolve: loadSequence('MyProductCtrl', 'SupplierProductCtrl', 'supplierProductService')
        }).state('front.myproducts.details', {
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_product.html',
            title: 'front.PRODUCTDETAILS',
        }).state('front.myproducts.edit', {
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_product_form.html',
            title: 'front.EDITPRODUCT',
            resolve: loadSequence('MyProductFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierProductFormCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
        }).state('front.myproducts.new', {
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_product_form.html',
            title: 'front.NEWPRODUCT',
            resolve: loadSequence('MyProductFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierProductFormCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
        }).state('front.myproducts.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Product/my_products.html',
            title: 'front.MYPRODUCTS',
            resolve: loadSequence('MyProductsCtrl', 'SupplierProductsCtrl', 'supplierProductService', 'supplierService', 'categoryService', 'userService')
            /*
             * My Bids Manager routes
             */
        }).state('front.mybids', {
            url: '/{locale:(?:en|fr|ar)}/my-bids',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYBIDS',
            resolve: loadSequence()
        }).state('front.mybids.list', {
            url: '/list',

            params: {
                'bidsIsFiltersVisible': null,
                'bidsPage': null,
                'bidsCount': null,
                'bidsSorting': null,
                'bidsFilter': null
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bids.html',
            title: 'front.MYBIDS',
            resolve: loadSequence('MyBidsCtrl', 'BidsCtrl', 'bidService', 'tenderService', 'supplierService', 'userService')
        }).state('front.mybids.details', {
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bid.html',
            title: 'front.TENDERDETAILS',
            resolve: loadSequence('MyBidCtrl', 'BidCtrl', 'bidService')
        }).state('front.mybids.edit', {
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bid_form.html',
            title: 'front.EDITTENDER',
            resolve: loadSequence('bidService', 'supplierService', 'MyBidFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService')
        }).state('front.mybids.new', {
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Bid/my_bid_form.html',
            title: 'front.NEWBID',
            resolve: loadSequence('bidService', 'supplierService', 'MyBidFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService')
            /*
             * My BookmarkProject Manager routes
             */
        }).state('front.bookmarkproject', {
            url: '/{locale:(?:en|fr|ar)}/bookmark-project',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.BOOKMARKPROJECT',
            resolve: loadSequence()
        }).state('front.bookmarkproject.list', {
            url: '/list',

            params: {
                'tenderBookmarksIsFiltersVisible': null,
                'tenderBookmarksPage': null,
                'tenderBookmarksCount': null,
                'tenderBookmarksSorting': null,
                'tenderBookmarksFilter': null
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tenders_bookmarked.html',
            title: 'front.BOOKMARKPROJECT',
            resolve: loadSequence('MyTenderBookmarkedCtrl', 'TenderBookmarksCtrl', 'tenderBookmarkService', 'tenderService', 'userService')
        }).state('front.bookmarkproject.details', {
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Tender/tender_bookmarked.html',
            title: 'front.TENDERBOOKMARKEDDETAILS',
            resolve: loadSequence('MyTenderBookmarkedDetailsCtrl', 'tenderBookmarkService')
            /*
             * My Buyers Manager routes
             */
        }).state('front.mybuyers', {
            url: '/{locale:(?:en|fr|ar)}/my-buyers',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYBUYERS',
        }).state('front.mybuyers.details', {
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyer.html',
            title: 'front.BUYERDETAILS',
            resolve: loadSequence('MyBuyerCtrl', 'BuyerCtrl', 'buyerService')
        }).state('front.mybuyers.edit', {
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyer_form.html',
            title: 'front.EDITBUYER',
            resolve: loadSequence('MyBuyerFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService', 'categoryService')
        }).state('front.mybuyers.new', {
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyer_form.html',
            title: 'front.NEWBUYER',
            resolve: loadSequence('MyBuyerFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BuyerFormCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService', 'categoryService')
        }).state('front.mybuyers.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Buyer/my_buyers.html',
            title: 'front.MYBUYERS',
            resolve: loadSequence('MyBuyersCtrl', 'BuyersCtrl', 'buyerService', 'buyerTypeService', 'countryService', 'languageService', 'regionService', 'userService', 'categoryService', 'profileFrontService')
            /*
             * My Suppliers Manager routes
             */
        }).state('front.mysuppliers', {
            url: '/{locale:(?:en|fr|ar)}/my-suppliers',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYSUPPLIERS',
        }).state('front.mysuppliers.details', {
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_supplier.html',
            title: 'front.SUPPLIERDETAILS',
            resolve: loadSequence('MySupplierCtrl', 'SupplierCtrl', 'supplierService')
        }).state('front.mysuppliers.edit', {
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_supplier_form.html',
            title: 'front.EDITSUPPLIER',
            resolve: loadSequence('MySupplierFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService', 'categoryService')
        }).state('front.mysuppliers.new', {
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_supplier_form.html',
            title: 'front.NEWSUPPLIER',
            resolve: loadSequence('MySupplierFormCtrl', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'SupplierFormCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService', 'categoryService')
        }).state('front.mysuppliers.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Supplier/my_suppliers.html',
            title: 'front.MYSUPPLIERS',
            resolve: loadSequence('MySuppliersCtrl', 'SuppliersCtrl', 'supplierService', 'supplierTypeService', 'countryService', 'languageService', 'regionService', 'userService', 'categoryService', 'profileFrontService')
            /*
             * Public Pages routes
             */
        }).state('front.contact', {
            url: '/{locale:(?:en|fr|ar)}/contact',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Contact/contact_form.html',
            title: 'front.CONTACT',
            resolve: loadSequence('contactService', 'ContactFormCtrl', 'postFrontService')
        }).state('front.post', {
            url: '/{locale:(?:en|fr|ar)}/post/:slug',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Post/post.html',
            title: 'front.POST',
            resolve: loadSequence('PostFrontCtrl', 'postFrontService')
            /*
             * Project Bids manager routes
             */
        }).state('front.projectbids', {
            url: '/{locale:(?:en|fr|ar)}/project-bids',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.PROJECTBIDS',
            resolve: loadSequence()
        }).state('front.projectbids.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/ProjectBids/my_project_bids.html',
            title: 'front.PROJECTBIDS',
            resolve: loadSequence('MyProjectBidsCtrl', 'TendersCtrl', 'tenderService', 'buyerService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'categoryService', 'projectBidsFrontService', 'supplierService')
        }).state('front.projectbids.bids', {
            url: '/bids-by-project/:id',
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

            params: {
                /*
                 'bidsIsFiltersVisible': null,
                 'bidsPage': null,
                 'bidsCount': null,
                 'bidsSorting': null,
                 'bidsFilter': null
                 */
            },
            templateUrl: '/bundles/ubidelectricity/js/front/ProjectBids/my_project_bids_short_list.html',
            title: 'front.PROJECTBIDSSHORTLIST',
            resolve: loadSequence('BidsShortListCtrl', 'BidsCtrl', 'bidService', 'tenderService', 'supplierService', 'userService', 'projectBidsFrontService')
        }).state('front.myAlerts', {
            url: '/{locale:(?:en|fr|ar)}/my-alerts',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: 'front.MYALERTS',
            resolve: loadSequence()
        }).state('front.myAlerts.list', {
            url: '/list',
            templateUrl: '/bundles/ubidelectricity/js/front/Alert/my_alerts.html',
            title: 'front.MYALERTS',
            resolve: loadSequence('MyAlertsCtrl', 'AlertsCtrl', 'alertService', 'userService', 'categoryService', 'countryService')
        }).state('front.myAlerts.details', {
            url: '/details/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Alert/my_alert.html',
            title: 'front.MYALERTS',
            resolve: loadSequence('MyAlertCtrl', 'AlertCtrl', 'alertService')
        }).state('front.myAlerts.new', {
            url: '/new',
            templateUrl: '/bundles/ubidelectricity/js/front/Alert/my_alert_form.html',
            title: 'front.MYALERTADD',
            resolve: loadSequence('MyAlertFormCtrl', 'AlertFormCtrl', 'alertService', 'userService', 'categoryService', 'countryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'tenderFrontService')
        }).state('front.myAlerts.edit', {
            url: '/edit/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Alert/my_alert_form.html',
            title: 'front.MYALERTADD',
            resolve: loadSequence('MyAlertFormCtrl', 'AlertFormCtrl', 'alertService', 'userService', 'categoryService', 'countryService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'tenderFrontService')
        }).state('front.myAlerts.settings', {
            url: '/settings',
            templateUrl: '/bundles/ubidelectricity/js/front/Alert/my_alert_settings.html',
            title: 'front.MYALERTSETTINGS',

            params: {
                'userSettingsIsFiltersVisible': null,
                'userSettingsPage': null,
                'userSettingsCount': null,
                'userSettingsSorting': null,
                'userSettingsFilter': null
            },
            resolve: loadSequence('MyAlertSettingsCtrl', 'UserSettingsCtrl', 'userSettingService', 'userService')
            /**
             * Categories routes manage
             */
        }).state('front.categories', {
            url: '/{locale:(?:en|fr|ar)}/categories',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Category/categories.html',
            resolve: loadSequence('CategoriesFrontCtrl', 'CategoryFormCtrl', 'categoryService', 'productTypeService', 'userService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'tenderFrontService', 'tree-grid-directive', 'postFrontService')
        }).state('front.category', {
            url: '/{locale:(?:en|fr|ar)}/category/:slug/:target',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            templateUrl: '/bundles/ubidelectricity/js/front/Category/category.html',
            resolve: loadSequence('CategoryFrontCtrl', 'categoryFrontService')
            /**
             * Messages routes manage
             */
        }).state('front.messages', {
            url: '/{locale:(?:en|fr|ar)}/messages',

            params: {
                locale: {
                    squash: false,
                    inherit: true,
                    dynamic: true,
                    value: getCurrentLocale()
                }
            },
            template: '<div ui-view class="fade-in-up"></div>',
            title: ''
        }).state('front.messages.send', {
            url: '/send/:id/:to',
            templateUrl: '/bundles/ubidelectricity/js/front/Message/message_front_form.html',
            title: '',
            resolve: loadSequence('MessageFrontFormCtrl', 'MessageFormCtrl', 'messageService', 'userService', 'buyerService', 'supplierService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
        }).state('front.messages.list', {
            url: '/list/:type',
            templateUrl: '/bundles/ubidelectricity/js/front/Message/messages_front.html',
            title: '',
            resolve: loadSequence('MessagesFrontCtrl', 'MessageFrontFormCtrl', 'MessagesCtrl', 'MessageFormCtrl', 'messageService', 'userService', 'buyerService', 'supplierService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
        }).state('front.messages.detail', {
            url: '/detail/:id',
            templateUrl: '/bundles/ubidelectricity/js/front/Message/message_front.html',
            title: '',
            resolve: loadSequence('MessageFrontCtrl', 'MessageCtrl', 'messageService', 'userService', 'buyerService', 'supplierService', 'ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor')
        })
    }]);

var getCurrentLocale = function () {
    console.warn('getCurrentLocale');
    if (typeof localStorage['NG_TRANSLATE_LANG_KEY'] != 'undefined') {
        return localStorage['NG_TRANSLATE_LANG_KEY'];
    } else {
        return 'en';
    }
};