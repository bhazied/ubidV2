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

var app = angular.module('ubidElectricityApp', ['ubid-electricity']);
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
            firstName: 'User',
            job: 'Webmaster',
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
    $urlRouterProvider.otherwise('/auth/login');
    //
    // Set up the states
    $stateProvider.state('app', {
        url: '/app',
        templateUrl: '/assets/views/app.html',
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
    }).state('app.dashboard', {
        url: '/dashboard',
        templateUrl: '/bundles/ubidelectricity/js/components/Main/dashboard.html',
        title: 'content.list.DASHBOARD',
        ncyBreadcrumb: {
            label: 'content.list.DASHBOARD'
        },
        resolve: loadSequence('jquery-sparkline', 'DashboardCtrl', 'DashboardService')
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
        resolve: loadSequence('TendersCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'tenderCategoryService')
    }).state('app.marketplace.tendersnew', {
        url: '/tenders/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender_form.html',
        title: 'content.list.NEWTENDER',
        ncyBreadcrumb: {
            label: 'content.list.NEWTENDER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'tenderCategoryService')
    }).state('app.marketplace.tendersedit', {
        url: '/tenders/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Tender/tender_form.html',
        title: 'content.list.EDITTENDER',
        ncyBreadcrumb: {
            label: 'content.list.EDITTENDER'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'TenderFormCtrl', 'tenderService', 'regionService', 'countryService', 'sectorService', 'tenderTypeService', 'biddingTypeService', 'userService', 'tenderCategoryService')
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
        resolve: loadSequence('TenderProductsCtrl', 'tenderProductService', 'tenderService', 'productTypeService', 'userService')
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
    }).state('app.marketplace.bids', {
        url: '/bids',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bids.html',
        title: 'content.list.BIDS',
        ncyBreadcrumb: {
            label: 'content.list.BIDS'
        },
        resolve: loadSequence('BidsCtrl', 'bidService', 'tenderService', 'userService')
    }).state('app.marketplace.bidsnew', {
        url: '/bids/new',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bid_form.html',
        title: 'content.list.NEWBID',
        ncyBreadcrumb: {
            label: 'content.list.NEWBID'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidFormCtrl', 'bidService', 'tenderService', 'userService')
    }).state('app.marketplace.bidsedit', {
        url: '/bids/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bid_form.html',
        title: 'content.list.EDITBID',
        ncyBreadcrumb: {
            label: 'content.list.EDITBID'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidFormCtrl', 'bidService', 'tenderService', 'userService')
    }).state('app.marketplace.bidsdetails', {
        url: '/bids/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/Bid/bid.html',
        ncyBreadcrumb: {
            label: 'content.list.BIDDETAILS'
        },
        resolve: loadSequence('BidCtrl', 'bidService')
    }).state('app.marketplace.bidproducts', {
        url: '/bid-products',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_products.html',
        title: 'content.list.BIDPRODUCTS',
        ncyBreadcrumb: {
            label: 'content.list.BIDPRODUCTS'
        },
        resolve: loadSequence('BidProductsCtrl', 'bidProductService', 'tenderProductService', 'bidService', 'userService')
    }).state('app.marketplace.bidproductsnew', {
        url: '/bid-products/new',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_product_form.html',
        title: 'content.list.NEWBIDPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.NEWBIDPRODUCT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidProductFormCtrl', 'bidProductService', 'tenderProductService', 'bidService', 'userService')
    }).state('app.marketplace.bidproductsedit', {
        url: '/bid-products/edit/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_product_form.html',
        title: 'content.list.EDITBIDPRODUCT',
        ncyBreadcrumb: {
            label: 'content.list.EDITBIDPRODUCT'
        },
        resolve: loadSequence('ui.select', 'monospaced.elastic', 'touchspin-plugin', 'checklist-model', 'ckeditor-plugin', 'ckeditor', 'BidProductFormCtrl', 'bidProductService', 'tenderProductService', 'bidService', 'userService')
    }).state('app.marketplace.bidproductsdetails', {
        url: '/bid-products/details/:id',
        templateUrl: '/bundles/ubidelectricity/js/components/BidProduct/bid_product.html',
        ncyBreadcrumb: {
            label: 'content.list.BIDPRODUCTDETAILS'
        },
        resolve: loadSequence('BidProductCtrl', 'bidProductService')
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
        resolve: loadSequence('SectorsCtrl', 'sectorService', 'userService')
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
        resolve: loadSequence('TenderCategoriesCtrl', 'tenderCategoryService', 'productTypeService', 'userService')
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
        resolve: loadSequence('ProductTypesCtrl', 'productTypeService', 'userService')
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
        resolve: loadSequence('TenderTypesCtrl', 'tenderTypeService', 'userService')
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
        resolve: loadSequence('BiddingTypesCtrl', 'biddingTypeService', 'userService')
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
        resolve: loadSequence('LanguagesCtrl', 'languageService', 'userService')
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
        resolve: loadSequence('CountriesCtrl', 'countryService', 'regionService', 'userService')
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
        resolve: loadSequence('RegionsCtrl', 'regionService', 'userService')
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
        resolve: loadSequence('MenusCtrl', 'menuService', 'userService')
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
        resolve: loadSequence('MenuLinksCtrl', 'menuLinkService', 'menuService', 'userService')
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
        resolve: loadSequence('UsersCtrl', 'userService', 'countryService', 'languageService', 'groupService')
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
        resolve: loadSequence('NotificationsCtrl', 'notificationService', 'userService')
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
        resolve: loadSequence('GroupsCtrl', 'groupService', 'userService')
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
        resolve: loadSequence('LogsCtrl', 'logService', 'userService')
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
        resolve: loadSequence('UserSettingsCtrl', 'userSettingService', 'userService')
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
        resolve: loadSequence('HitsCtrl', 'hitService', 'visitService', 'userService')
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
        resolve: loadSequence('VisitsCtrl', 'visitService', 'userService')
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
        resolve: loadSequence('PostsCtrl', 'postService', 'postTypeService', 'userService', 'postCategoryService')
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
        resolve: loadSequence('PostCategoriesCtrl', 'postCategoryService', 'postTypeService', 'userService')
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
        resolve: loadSequence('PostTypesCtrl', 'postTypeService', 'userService')
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
    });

}]);
