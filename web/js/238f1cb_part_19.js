/** 
  * declare 'ubid-electricity' module with dependencies
*/
'use strict';
angular.module('ubid-electricity', [
	'ngAnimate',
	'ngCookies',
	'ngStorage',
	'ngSanitize',
	'ngResource',
	'ngTouch',
	'ngTable',
	'ui.router',
	'ui.bootstrap',
	'oc.lazyLoad',
	'cfp.loadingBar',
	'ncy-angular-breadcrumb',
	'duScroll',
	'pascalprecht.translate',
	'angular-bind-html-compile',
    'slugifier',
    'toaster',
	'colorpicker.module',
	'com.2fdevs.videogular',
	'com.2fdevs.videogular.plugins.controls',
	'com.2fdevs.videogular.plugins.buffering',
	'com.2fdevs.videogular.plugins.overlayplay',
	'com.2fdevs.videogular.plugins.poster',
	'at.multirange-slider'
]);

'use strict'
var app = angular.module('UbidElectricityFront', ['ubid-electricity']);

app.run(['$rootScope', '$state', '$stateParams', '$localStorage',
    function ($rootScope, $state, $stateParams, $localStorage) {

        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach(document.body);

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'U bid electricity', // name of your project
            description: 'Electricity Tenders Marketplace', // brief description
            author: 'ContinuousNet', // author's name or company name
            version: '2.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (function () {// true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    check = true;
                };
                return check;
            })(),
            apiURL: '/api/', // rest api url
            apiVersion: 'v1/', // rest version url
            thumbURL: '/thumb?image=', // rest version url
            layout: {
                isNavbarFixed: true, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                isFooterFixed: false, // true if you want to initialize the template with fixed footer
                theme: 'theme-1', // indicate the theme chosen for your project
                logo: '/assets/images/logo.png' // relative path of the project logo
            }
        };
        console.log( $rootScope.app)

        if (angular.isDefined($localStorage.user)) {
            $rootScope.user = $rootScope.currentUser = $localStorage.user;
        } else {
            $rootScope.user = $rootScope.currentUser = {
                firstName: 'Guest',
                job: 'Visitor',
                picture: 'app/img/user/02.jpg',
                roles: []
            };
        }

    }]);

// translate config
app.config(['$translateProvider',
    function ($translateProvider) {

        // prefix and suffix information  is required to specify a pattern
        // You can simply use the static-files loader with this pattern:
        $translateProvider.useStaticFilesLoader({
            prefix: '/assets/i18n/',
            suffix: '.json'
        });

        // Since you've now registered more then one translation table, angular-translate has to know which one to use.
        // This is where preferredLanguage(langKey) comes in.
        $translateProvider.preferredLanguage('fr');

        // Store the language in the local storage
        $translateProvider.useLocalStorage();

        // Enable sanitize
        $translateProvider.useSanitizeValueStrategy('escape'); // sanitize

    }]);

// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
    function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;

    }]);

//  This binding is brought you by [[ ]] interpolation symbols.
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

// Angular-Breadcrumb
// configuration
app.config(function($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        templateUrl: '/assets/views/partials/breadcrumb.html'
    });
});

// ngTable Filter
// configuration
app.config(function(ngTableFilterConfigProvider) {

    ngTableFilterConfigProvider.setConfig({
        aliasUrls: {
            'checkboxes': '/assets/views/partials/checkboxes.html'
        }
    });

});

if (!String.prototype.endsWith) {

    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };

}

'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});

app.constant('JS_REQUIRES', {   
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'modernizr': ['/assets/bower_components/components-modernizr/modernizr.js'],
        'moment': ['/assets/bower_components/moment/min/moment.min.js'],
        'spin': '/assets/bower_components/spin.js/spin.js',

        //*** jQuery Plugins
        'perfect-scrollbar-plugin': ['/assets/bower_components/perfect-scrollbar/js/min/perfect-scrollbar.jquery.min.js', '/assets/bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css'],
        'ladda': ['/assets/bower_components/ladda/dist/ladda.min.js', '/assets/bower_components/ladda/dist/ladda-themeless.min.css'],
        'sweet-alert': ['/assets/bower_components/sweetalert/lib/sweet-alert.min.js', '/assets/bower_components/sweetalert/lib/sweet-alert.css'],
        'chartjs': '/assets/bower_components/chartjs/Chart.min.js',
        'jquery-sparkline': '/assets/bower_components/jquery.sparkline.build/dist/jquery.sparkline.min.js',
        'ckeditor-plugin': ['/assets/bower_components/ckeditor/ckeditor.js'],
        'jquery-nestable-plugin': ['/assets/bower_components/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['/assets/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', '/assets/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],

        //*** Controllers
        'dashboardCtrl': '/assets/js/controllers/dashboardCtrl.js',
        'signInCtrl': '/assets/js/controllers/signInCtrl.js',
        'iconsCtrl': '/assets/js/controllers/iconsCtrl.js',
        'vAccordionCtrl': '/assets/js/controllers/vAccordionCtrl.js',
        'ckeditorCtrl': '/assets/js/controllers/ckeditorCtrl.js',
        'laddaCtrl': '/assets/js/controllers/laddaCtrl.js',
        'ngTableCtrl': '/assets/js/controllers/ngTableCtrl.js',
        'cropCtrl': '/assets/js/controllers/cropCtrl.js',
        'asideCtrl': '/assets/js/controllers/asideCtrl.js',
        'toasterCtrl': '/assets/js/controllers/toasterCtrl.js',
        'sweetAlertCtrl': '/assets/js/controllers/sweetAlertCtrl.js',
        'mapsCtrl': '/assets/js/controllers/mapsCtrl.js',
        'chartsCtrl': '/assets/js/controllers/chartsCtrl.js',
        'calendarCtrl': '/assets/js/controllers/calendarCtrl.js',
        'nestableCtrl': '/assets/js/controllers/nestableCtrl.js',
        'validationCtrl': ['/assets/js/controllers/validationCtrl.js'],
        'userCtrl': ['/assets/js/controllers/userCtrl.js'],
        'selectCtrl': '/assets/js/controllers/selectCtrl.js',
        'wizardCtrl': '/assets/js/controllers/wizardCtrl.js',
        'uploadCtrl': '/assets/js/controllers/uploadCtrl.js',
        'treeCtrl': '/assets/js/controllers/treeCtrl.js',
        'inboxCtrl': '/assets/js/controllers/inboxCtrl.js',
        'xeditableCtrl': '/assets/js/controllers/xeditableCtrl.js',
        'chatCtrl': '/assets/js/controllers/chatCtrl.js',
        'dynamicTableCtrl': '/assets/js/controllers/dynamicTableCtrl.js',
        'NotificationIconsCtrl': '/assets/js/controllers/notificationIconsCtrl.js',
        
        //*** Filters
        'htmlToPlaintext': '/assets/js/filters/htmlToPlaintext.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'angularMoment',
        files: ['/assets/bower_components/angular-moment/angular-moment.min.js']
    }, {
        name: 'toaster',
        files: ['/assets/bower_components/AngularJS-Toaster/toaster.js', '/assets/bower_components/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['/assets/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', '/assets/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'angular-ladda',
        files: ['/assets/bower_components/angular-ladda/dist/angular-ladda.min.js']
    }, {
        name: 'ui.select',
        files: ['/assets/bower_components/angular-ui-select/dist/select.min.js', '/assets/bower_components/angular-ui-select/dist/select.min.css', '/assets/bower_components/select2/dist/css/select2.min.css', '/assets/bower_components/select2-bootstrap-css/select2-bootstrap.min.css', '/assets/bower_components/selectize/dist/css/selectize.bootstrap3.css']
    }, {
        name: 'ui.mask',
        files: ['/assets/bower_components/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['/assets/bower_components/ngImgCrop/compile/minified/ng-img-crop.js', '/assets/bower_components/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['/assets/bower_components/angular-file-upload/angular-file-upload.min.js']
    }, {
        name: 'ngAside',
        files: ['/assets/bower_components/angular-aside/dist/js/angular-aside.min.js', '/assets/bower_components/angular-aside/dist/css/angular-aside.min.css']
    }, {
        name: 'truncate',
        files: ['/assets/bower_components/angular-truncate/src/truncate.js']
    }, {
        name: 'oitozero.ngSweetAlert',
        files: ['/assets/bower_components/angular-sweetalert-promised/SweetAlert.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['/assets/bower_components/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['/assets/bower_components/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'tc.chartjs',
        files: ['/assets/bower_components/tc-angular-chartjs/dist/tc-angular-chartjs.min.js']
    }, {
        name: 'flow',
        files: ['/assets/bower_components/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'uiSwitch',
        files: ['/assets/bower_components/angular-ui-switch/angular-ui-switch.min.js', '/assets/bower_components/angular-ui-switch/angular-ui-switch.min.css']
    }, {
        name: 'ckeditor',
        files: ['/assets/bower_components/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['/assets/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', '/assets/bower_components/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', '/assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['/assets/bower_components/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'vAccordion',
        files: ['/assets/bower_components/v-accordion/dist/v-accordion.min.js', '/assets/bower_components/v-accordion/dist/v-accordion.min.css']
    }, {
        name: 'xeditable',
        files: ['/assets/bower_components/angular-xeditable/dist/js/xeditable.min.js', '/assets/bower_components/angular-xeditable/dist/css/xeditable.css', '/assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['/assets/bower_components/checklist-model/checklist-model.js']
    }, {
        name: 'angular-notification-icons',
        files: ['/assets/bower_components/angular-notification-icons/dist/angular-notification-icons.min.js', '/assets/bower_components/angular-notification-icons/dist/angular-notification-icons.min.css']
    }]
});

app.constant('APP_JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Controllers
        'LoginCtrl': '/bundles/ubidelectricity/js/components/Auth/LoginCtrl.js',
        'LockScreenCtrl': '/bundles/ubidelectricity/js/components/Auth/LockScreenCtrl.js',
        'RegisterCtrl': '/bundles/ubidelectricity/js/components/Auth/RegisterCtrl.js',
        'EmailConfirmCtrl': '/bundles/ubidelectricity/js/components/Auth/EmailConfirmCtrl.js',
        'ResetPasswordCtrl': '/bundles/ubidelectricity/js/components/Auth/ResetPasswordCtrl.js',
        'ResetCtrl': '/bundles/ubidelectricity/js/components/Auth/ResetCtrl.js',
        'ChangePasswordCtrl': '/bundles/ubidelectricity/js/components/Auth/ChangePasswordCtrl.js',
        'ProfileCtrl': '/bundles/ubidelectricity/js/components/Auth/ProfileCtrl.js',
        'DashboardCtrl': '/bundles/ubidelectricity/js/components/Main/DashboardCtrl.js',
        'BidsCtrl': '/bundles/ubidelectricity/js/components/Bid/BidsCtrl.js',
        'BidFormCtrl': '/bundles/ubidelectricity/js/components/Bid/BidFormCtrl.js',
        'BidCtrl': '/bundles/ubidelectricity/js/components/Bid/BidCtrl.js',
        'BidProductsCtrl': '/bundles/ubidelectricity/js/components/BidProduct/BidProductsCtrl.js',
        'BidProductFormCtrl': '/bundles/ubidelectricity/js/components/BidProduct/BidProductFormCtrl.js',
        'BidProductCtrl': '/bundles/ubidelectricity/js/components/BidProduct/BidProductCtrl.js',
        'BiddingTypesCtrl': '/bundles/ubidelectricity/js/components/BiddingType/BiddingTypesCtrl.js',
        'BiddingTypeFormCtrl': '/bundles/ubidelectricity/js/components/BiddingType/BiddingTypeFormCtrl.js',
        'BiddingTypeCtrl': '/bundles/ubidelectricity/js/components/BiddingType/BiddingTypeCtrl.js',
        'CountriesCtrl': '/bundles/ubidelectricity/js/components/Country/CountriesCtrl.js',
        'CountryFormCtrl': '/bundles/ubidelectricity/js/components/Country/CountryFormCtrl.js',
        'CountryCtrl': '/bundles/ubidelectricity/js/components/Country/CountryCtrl.js',
        'GroupsCtrl': '/bundles/ubidelectricity/js/components/Group/GroupsCtrl.js',
        'GroupFormCtrl': '/bundles/ubidelectricity/js/components/Group/GroupFormCtrl.js',
        'GroupCtrl': '/bundles/ubidelectricity/js/components/Group/GroupCtrl.js',
        'HitsCtrl': '/bundles/ubidelectricity/js/components/Hit/HitsCtrl.js',
        'HitFormCtrl': '/bundles/ubidelectricity/js/components/Hit/HitFormCtrl.js',
        'HitCtrl': '/bundles/ubidelectricity/js/components/Hit/HitCtrl.js',
        'LanguagesCtrl': '/bundles/ubidelectricity/js/components/Language/LanguagesCtrl.js',
        'LanguageFormCtrl': '/bundles/ubidelectricity/js/components/Language/LanguageFormCtrl.js',
        'LanguageCtrl': '/bundles/ubidelectricity/js/components/Language/LanguageCtrl.js',
        'LogsCtrl': '/bundles/ubidelectricity/js/components/Log/LogsCtrl.js',
        'LogFormCtrl': '/bundles/ubidelectricity/js/components/Log/LogFormCtrl.js',
        'LogCtrl': '/bundles/ubidelectricity/js/components/Log/LogCtrl.js',
        'MenusCtrl': '/bundles/ubidelectricity/js/components/Menu/MenusCtrl.js',
        'MenuFormCtrl': '/bundles/ubidelectricity/js/components/Menu/MenuFormCtrl.js',
        'MenuCtrl': '/bundles/ubidelectricity/js/components/Menu/MenuCtrl.js',
        'MenuLinksCtrl': '/bundles/ubidelectricity/js/components/MenuLink/MenuLinksCtrl.js',
        'MenuLinkFormCtrl': '/bundles/ubidelectricity/js/components/MenuLink/MenuLinkFormCtrl.js',
        'MenuLinkCtrl': '/bundles/ubidelectricity/js/components/MenuLink/MenuLinkCtrl.js',
        'NotificationsCtrl': '/bundles/ubidelectricity/js/components/Notification/NotificationsCtrl.js',
        'NotificationFormCtrl': '/bundles/ubidelectricity/js/components/Notification/NotificationFormCtrl.js',
        'NotificationCtrl': '/bundles/ubidelectricity/js/components/Notification/NotificationCtrl.js',
        'PostsCtrl': '/bundles/ubidelectricity/js/components/Post/PostsCtrl.js',
        'PostFormCtrl': '/bundles/ubidelectricity/js/components/Post/PostFormCtrl.js',
        'PostCtrl': '/bundles/ubidelectricity/js/components/Post/PostCtrl.js',
        'PostCategoriesCtrl': '/bundles/ubidelectricity/js/components/PostCategory/PostCategoriesCtrl.js',
        'PostCategoryFormCtrl': '/bundles/ubidelectricity/js/components/PostCategory/PostCategoryFormCtrl.js',
        'PostCategoryCtrl': '/bundles/ubidelectricity/js/components/PostCategory/PostCategoryCtrl.js',
        'PostTypesCtrl': '/bundles/ubidelectricity/js/components/PostType/PostTypesCtrl.js',
        'PostTypeFormCtrl': '/bundles/ubidelectricity/js/components/PostType/PostTypeFormCtrl.js',
        'PostTypeCtrl': '/bundles/ubidelectricity/js/components/PostType/PostTypeCtrl.js',
        'ProductTypesCtrl': '/bundles/ubidelectricity/js/components/ProductType/ProductTypesCtrl.js',
        'ProductTypeFormCtrl': '/bundles/ubidelectricity/js/components/ProductType/ProductTypeFormCtrl.js',
        'ProductTypeCtrl': '/bundles/ubidelectricity/js/components/ProductType/ProductTypeCtrl.js',
        'RegionsCtrl': '/bundles/ubidelectricity/js/components/Region/RegionsCtrl.js',
        'RegionFormCtrl': '/bundles/ubidelectricity/js/components/Region/RegionFormCtrl.js',
        'RegionCtrl': '/bundles/ubidelectricity/js/components/Region/RegionCtrl.js',
        'SectorsCtrl': '/bundles/ubidelectricity/js/components/Sector/SectorsCtrl.js',
        'SectorFormCtrl': '/bundles/ubidelectricity/js/components/Sector/SectorFormCtrl.js',
        'SectorCtrl': '/bundles/ubidelectricity/js/components/Sector/SectorCtrl.js',
        'TendersCtrl': '/bundles/ubidelectricity/js/components/Tender/TendersCtrl.js',
        'TenderFormCtrl': '/bundles/ubidelectricity/js/components/Tender/TenderFormCtrl.js',
        'TenderCtrl': '/bundles/ubidelectricity/js/components/Tender/TenderCtrl.js',
        'TenderCategoriesCtrl': '/bundles/ubidelectricity/js/components/TenderCategory/TenderCategoriesCtrl.js',
        'TenderCategoryFormCtrl': '/bundles/ubidelectricity/js/components/TenderCategory/TenderCategoryFormCtrl.js',
        'TenderCategoryCtrl': '/bundles/ubidelectricity/js/components/TenderCategory/TenderCategoryCtrl.js',
        'TenderProductsCtrl': '/bundles/ubidelectricity/js/components/TenderProduct/TenderProductsCtrl.js',
        'TenderProductFormCtrl': '/bundles/ubidelectricity/js/components/TenderProduct/TenderProductFormCtrl.js',
        'TenderProductCtrl': '/bundles/ubidelectricity/js/components/TenderProduct/TenderProductCtrl.js',
        'TenderTypesCtrl': '/bundles/ubidelectricity/js/components/TenderType/TenderTypesCtrl.js',
        'TenderTypeFormCtrl': '/bundles/ubidelectricity/js/components/TenderType/TenderTypeFormCtrl.js',
        'TenderTypeCtrl': '/bundles/ubidelectricity/js/components/TenderType/TenderTypeCtrl.js',
        'UsersCtrl': '/bundles/ubidelectricity/js/components/User/UsersCtrl.js',
        'UserFormCtrl': '/bundles/ubidelectricity/js/components/User/UserFormCtrl.js',
        'UserCtrl': '/bundles/ubidelectricity/js/components/User/UserCtrl.js',
        'UserSettingsCtrl': '/bundles/ubidelectricity/js/components/UserSetting/UserSettingsCtrl.js',
        'UserSettingFormCtrl': '/bundles/ubidelectricity/js/components/UserSetting/UserSettingFormCtrl.js',
        'UserSettingCtrl': '/bundles/ubidelectricity/js/components/UserSetting/UserSettingCtrl.js',
        'VisitsCtrl': '/bundles/ubidelectricity/js/components/Visit/VisitsCtrl.js',
        'VisitFormCtrl': '/bundles/ubidelectricity/js/components/Visit/VisitFormCtrl.js',
        'VisitCtrl': '/bundles/ubidelectricity/js/components/Visit/VisitCtrl.js'
    },
    modules: [{
        name: 'LoginService',
        files: ['/bundles/ubidelectricity/js/components/Auth/LoginService.js']
    },{
        name: 'RegisterService',
        files: ['/bundles/ubidelectricity/js/components/Auth/RegisterService.js']
    },{
        name: 'ResetPasswordService',
        files: ['/bundles/ubidelectricity/js/components/Auth/ResetPasswordService.js']
    },{
        name: 'ProfileService',
        files: ['/bundles/ubidelectricity/js/components/Auth/ProfileService.js']
    },{
        name: 'DashboardService',
        files: ['/bundles/ubidelectricity/js/components/Main/DashboardService.js']
    },{
        name: 'bidService',
        files: ['/bundles/ubidelectricity/js/components/Bid/BidService.js']
    },{
        name: 'bidProductService',
        files: ['/bundles/ubidelectricity/js/components/BidProduct/BidProductService.js']
    },{
        name: 'biddingTypeService',
        files: ['/bundles/ubidelectricity/js/components/BiddingType/BiddingTypeService.js']
    },{
        name: 'countryService',
        files: ['/bundles/ubidelectricity/js/components/Country/CountryService.js']
    },{
        name: 'groupService',
        files: ['/bundles/ubidelectricity/js/components/Group/GroupService.js']
    },{
        name: 'hitService',
        files: ['/bundles/ubidelectricity/js/components/Hit/HitService.js']
    },{
        name: 'languageService',
        files: ['/bundles/ubidelectricity/js/components/Language/LanguageService.js']
    },{
        name: 'logService',
        files: ['/bundles/ubidelectricity/js/components/Log/LogService.js']
    },{
        name: 'menuService',
        files: ['/bundles/ubidelectricity/js/components/Menu/MenuService.js']
    },{
        name: 'menuLinkService',
        files: ['/bundles/ubidelectricity/js/components/MenuLink/MenuLinkService.js']
    },{
        name: 'notificationService',
        files: ['/bundles/ubidelectricity/js/components/Notification/NotificationService.js']
    },{
        name: 'postService',
        files: ['/bundles/ubidelectricity/js/components/Post/PostService.js']
    },{
        name: 'postCategoryService',
        files: ['/bundles/ubidelectricity/js/components/PostCategory/PostCategoryService.js']
    },{
        name: 'postTypeService',
        files: ['/bundles/ubidelectricity/js/components/PostType/PostTypeService.js']
    },{
        name: 'productTypeService',
        files: ['/bundles/ubidelectricity/js/components/ProductType/ProductTypeService.js']
    },{
        name: 'regionService',
        files: ['/bundles/ubidelectricity/js/components/Region/RegionService.js']
    },{
        name: 'sectorService',
        files: ['/bundles/ubidelectricity/js/components/Sector/SectorService.js']
    },{
        name: 'tenderService',
        files: ['/bundles/ubidelectricity/js/components/Tender/TenderService.js']
    },{
        name: 'tenderCategoryService',
        files: ['/bundles/ubidelectricity/js/components/TenderCategory/TenderCategoryService.js']
    },{
        name: 'tenderProductService',
        files: ['/bundles/ubidelectricity/js/components/TenderProduct/TenderProductService.js']
    },{
        name: 'tenderTypeService',
        files: ['/bundles/ubidelectricity/js/components/TenderType/TenderTypeService.js']
    },{
        name: 'userService',
        files: ['/bundles/ubidelectricity/js/components/User/UserService.js']
    },{
        name: 'userSettingService',
        files: ['/bundles/ubidelectricity/js/components/UserSetting/UserSettingService.js']
    },{
        name: 'visitService',
        files: ['/bundles/ubidelectricity/js/components/Visit/VisitService.js']
    }]
});


'use strict';

app.factory('httpRequestInterceptor', ['$q', '$localStorage', '$location', '$filter', '$timeout', 'toaster',
    function ($q, $localStorage, $location, $filter, $timeout, toaster) {
        return {
            request: function (config) {
                if ($localStorage.access_token) {
                    config.headers['Authorization'] = 'Bearer ' + $localStorage.access_token ;
                }
                return config;
            },
            responseError: function (response) {
                if ( response.status === 401) {
                    delete $localStorage.access_token;
                    $location.path('/login/signin');
                } else if (response.status === 403) {
                    toaster.pop('warning', $filter('translate')('content.common.WARNING'), $filter('translate')('login.ACCESSDENEID'));
                    $timeout(function(){
                        $location.path('/app/dashboard');
                    }, 1000);
                }
                return $q.reject(response);
            }
        };
    }]);

// Generates a resolve object previously configured in constant.JS_REQUIRES or in constant.APP_JS_REQUIRES (config.constant.js)
function loadSequence() {
    var _args = arguments;
    return {
        deps: ['$ocLazyLoad', '$q', 'JS_REQUIRES', 'APP_JS_REQUIRES',
            function ($ocLL, $q, jsRequires, appJsRequires) {
                var promise = $q.when(1);
                for (var i = 0, len = _args.length; i < len; i++) {
                    promise = promiseThen(_args[i]);
                }
                return promise;

                function promiseThen(_arg) {
                    if (typeof _arg == 'function')
                        return promise.then(_arg);
                    else
                        return promise.then(function () {
                            var nowLoad = requiredData(_arg);
                            if (!nowLoad)
                                return $.error('Route resolve: Bad resource name [' + _arg + ']');
                            return $ocLL.load(nowLoad);
                        });
                }

                function requiredData(name) {
                    if (jsRequires.modules)
                        for (var m in jsRequires.modules)
                            if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                return jsRequires.modules[m];
                    if (appJsRequires.modules)
                        for (var m in appJsRequires.modules)
                            if (appJsRequires.modules[m].name && appJsRequires.modules[m].name === name)
                                return appJsRequires.modules[m];
                    return (jsRequires.scripts && jsRequires.scripts[name]) || (appJsRequires.scripts && appJsRequires.scripts[name]);
                }
            }]
    };
}

/**
 * Config for the router
 */
app.config(['$stateProvider', '$httpProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES', 'APP_JS_REQUIRES',
    function ($stateProvider, $httpProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires, appJsRequires) {

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;

        $httpProvider.interceptors.push('httpRequestInterceptor');

        // LAZY MODULES

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules.concat(appJsRequires)
        });


        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /auth/login
        $urlRouterProvider.otherwise('/');
        //
        // Set up the states
        $stateProvider.state('front', {
            url: '/',
            templateUrl: '/assets/views/front.html',
            resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'truncate', 'htmlToPlaintext', 'angular-notification-icons'),
            abstract: true
        }).state('error', {
            url: '/error',
            template: '<div ui-view class="fade-in-up"></div>'
        }).state('error.404', {
            url: '/404',
            templateUrl: '/assets/views/utility_404.html',
        }).state('error.500', {
            url: '/500',
            templateUrl: '/assets/views/utility_500.html',
        });

    }]);

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
        })

    }]);
