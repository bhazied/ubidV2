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