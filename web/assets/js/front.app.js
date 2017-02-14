'use strict'
var app = angular.module('UbidElectricityFront', ['ubid-electricity', 'bw.paging', 'isteven-multi-select', 'angularFileUpload']);

var languages = {
    'en' : 'English',
    'fr' : 'Français',
    'es' : 'Español',
    'it' : 'Italiano',
    'de' : 'Deutsch'
};

app.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$timeout',
    function ($rootScope, $state, $stateParams, $localStorage) {

        $rootScope.languages = languages;

        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach(document.body);

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // left right side to be shown or not
        $rootScope.leftrightside = false;
        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'E-electricity', // name of your project
            description: 'Electricity Tenders web site', // brief description
            keywords: 'Electricity, Tenders, Buyers, Suppliers, Products', // some keywords
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
                logo: '/assets/images/big_logo.png', // relative path of the project logo
            }
        };

        if (angular.isDefined($localStorage.user)) {
            $rootScope.user = $rootScope.currentUser = $localStorage.user;

        } else {
            $rootScope.user = $rootScope.currentUser = {
                //firstName: 'Guest',
                //job: 'Visitor',
                //picture: 'app/img/user/02.jpg',
                //roles: []
            };
        }
        $rootScope.loggedIn = angular.isDefined($localStorage.access_token);

        $rootScope.seo = {
            meta_title: '',
            meta_description: '',
            meta_keywords: ''
        };

    }]);

// translate config
app.config(['$translateProvider',   
    function ($translateProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
        prefix: '/assets/i18n/front/',
        suffix: '.json'
    });

    var currentLanguage = null;
    if (typeof localStorage['ngStorage-language'] != 'undefined') {
        currentLanguage = JSON.parse(localStorage['ngStorage-language']);
    }
    for (var languageKey in languages) {
        if (currentLanguage == null) {
            currentLanguage = languageKey;
        }
        if (window.location.hash.endsWith('/' + languageKey)) {
            currentLanguage = languageKey;
        }
    }
    localStorage['NG_TRANSLATE_LANG_KEY'] = currentLanguage;
    localStorage['ngStorage-language'] = '"'+currentLanguage+'"';

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    $translateProvider.preferredLanguage(currentLanguage);

    // Store the language in the local storage
    $translateProvider.useLocalStorage();
    
    // Enable sanitize
    $translateProvider.useSanitizeValueStrategy('escape'); // sanitize

    }]);

// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
    function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = false;
        cfpLoadingBarProvider.includeSpinner = true;
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
