var app = angular.module('ubidElectricityApp', ['ubid-electricity']);

var languages = {
    'en' : 'English'/*,
    'fr' : 'Français',
    'es' : 'Español',
    'it' : 'Italiano',
    'de' : 'Deutsch'*/
};

app.run(['$rootScope', '$state', '$stateParams', '$localStorage', '$timeout',
    function ($rootScope, $state, $stateParams, $localStorage, $timeout) {

    $rootScope.languages = languages;

    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'E-electricity', // name of your project
        description: 'Electricity Tenders Marketplace', // brief description
        keywords: 'Electricity, Tenders, Suppliers, Buyers, Consultations', // brief description
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

    $rootScope.seo = {
        meta_title: '',
        meta_keywords: '',
        meta_description: ''
    };

    $rootScope.pageTitle = function() {
        return ($rootScope.seo.meta_title || $rootScope.app.name);
    };

    $rootScope.pageDescription = function() {
        return ($rootScope.seo.meta_description || $rootScope.app.description);
    };

    $rootScope.pageKeywords = function() {
        return ($rootScope.seo.meta_keywords || $rootScope.app.keywords);
    };

    $rootScope.createTree = function (items, parentField, labelField, parentId, level) {
        var tree = [];
        for (var i in items) {
            var addToTree = false;
            if (parentId == null && items[i][parentField] == null) {
                addToTree = true;
            } else if (items[i][parentField] != null) {
                if (items[i][parentField].id == parentId) {
                    addToTree = true;
                }
            }
            if (addToTree) {
                if (level > 0) {
                    var newLabel = '╚';
                    newLabel += '═'.repeat(level);
                    newLabel += ' '+items[i][labelField];
                    items[i][labelField] = newLabel;
                }
                tree.push(items[i]);
                var children = $rootScope.createTree(items, parentField, labelField, items[i].id, level+1);
                for (var j in children) {
                    tree.push(children[j]);
                }
            }
        }
        return tree;
    };

    $rootScope.checkStatePermission = function (state) {
        if ($rootScope.currentUser.roles.join('').indexOf('ADM') > -1) {
            return true;
        } else {
            if (
                state.indexOf('supplierproduct') > -1 ||
                state.indexOf('supplier') > -1 ||
                state.indexOf('buyer') > -1 ||
                state.indexOf('tender') > -1 ||
                state.indexOf('bid') > -1
            ) {
                return true;
            } else {
                return false;
            }
        }
    };

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
