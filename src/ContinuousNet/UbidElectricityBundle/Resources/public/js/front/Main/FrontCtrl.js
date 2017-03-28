'use strict';
/**
 * Ubid electricity Main Controller
 */
app.controller('FrontCtrl', ['$rootScope', '$scope', '$state', '$translate', '$localStorage', '$window', '$document', '$timeout', 'cfpLoadingBar', '$filter', '$stateParams', '$loginDataFactory','toaster','$advancedSearchDataFactory','$q',
    function($rootScope, $scope, $state, $translate, $localStorage, $window, $document, $timeout, cfpLoadingBar, $filter, $stateParams, $loginDataFactory, toaster, $advancedSearchDataFactory, $q) {

       /* $timeout(function () {
            $rootScope.showSlogan = false;
            $rootScope.showUserMenu = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        });*/

        //header searchForm show
        $rootScope.SearchFormHeader = false;

        $rootScope.showLogo = false;
        $rootScope.showBrandName = false;

        $rootScope.searchLoaded = false;

        $scope.anonymousStates = [
            'front.login',
            'front.register',
            'front.reset',
            'auth.lockscreen',
            'auth.emailconfirm',
            'front.home',
            'front.tenders',
            'front.tenders.category',
            'front.tenders.country',
            'front.tenders.sector',
            'front.advanced_search',
            'front.generic_search',
            'front.tender',
            'front.buyers',
            'front.buyer',
            'front.suppliers',
            'front.supplierscategory',
            'front.supplier',
            'front.post',
            'front.contact',
            'front.categories',
            'front.category'
        ];

        $timeout(function() {
            if ($scope.anonymousStates.indexOf($state.current.name) == -1 && !angular.isDefined($localStorage.access_token)) {
                $timeout(function() {
                    console.warn('no access token for ('+$state.current.name+') > redirection');
                    $state.go('front.home');
                });
            }
        }, 2000);

        $scope.hide_left_right_side_in = [
            'front.home',
            'front.post',
            'front.register',
            'front.resetpassword',
            'front.changepassword',
            'front.login',
            'front.logout',
            'front.usermenu',
            'front.profile',
            'front.contact'
        ];

        $scope.changeLanguage = function (lang) {
            $translate.use(lang);
            $rootScope.currentLanguage = lang
        }
        
        // Loading bar transition
        // -----------------------------------
        var $win = $($window);

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            //start loading bar on stateChangeStart
            cfpLoadingBar.start();
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

            //reset the search loaded result
            $rootScope.searchLoaded = false;
            
            //stop loading bar on stateChangeSuccess
            event.targetScope.$watch('$viewContentLoaded', function() {
                $timeout(function() {
                    cfpLoadingBar.complete();
                }, 500);
            });

            if ($state.current.name == 'front.home') {
                $rootScope.SearchFormHeader = true;
                $rootScope.showLogo = false;
                $rootScope.showBrandName = true;
            } else if ($state.current.name == 'front.usermenu') {
                $rootScope.SearchFormHeader = true;
                $rootScope.showLogo = false;
                $rootScope.showBrandName = true;
            } else {
                $rootScope.SearchFormHeader = true;
                $rootScope.showLogo = true;
                $rootScope.showBrandName = false;
            }

            // scroll top the page on change state
            $('#app .main-content').css({
                position : 'relative',
                top : 'auto'
            });

            $('footer').show();

            window.scrollTo(0, 0);

            if (angular.element('.email-reader').length) {
                angular.element('.email-reader').animate({
                    scrollTop : 0
                }, 0);
            }

            // Save the route title
            $rootScope.currTitle = $filter('translate')($state.current.title);

            if ($state.current.name == 'front.home') {
                $timeout(function() {
                    $rootScope.showSlogan = false;
                    $rootScope.showLeftSide = true;
                    $rootScope.showRightSide = false;
                    $rootScope.showUserMenu = false;
                    $rootScope.contentSize = 8;
                    $rootScope.contentOffset = 0;
                })
            }
            if( $state.current.name.indexOf('front.mybuyers') != -1 ){
                $timeout(function() {
                    $rootScope.showSlogan = false;
                    $rootScope.showLeftSide = false;
                    $rootScope.showRightSide = false;
                    $rootScope.showUserMenu = true;
                    $rootScope.contentSize = 10;
                    $rootScope.contentOffset = 0;
                }, 2000);
            }
            if($state.current.name == 'front.login'){
                $timeout(function() {
                    $rootScope.showSlogan = false;
                    $rootScope.showLeftSide = false;
                    $rootScope.showRightSide = false;
                    $rootScope.showUserMenu = false;
                    $rootScope.contentSize = 6;
                    $rootScope.contentOffset = 3;
                }, 1500);
            }
            if($state.current.name == 'front.generic_search'){
                $timeout(function() {
                    $rootScope.showSlogan = false;
                    $rootScope.showLeftSide = true;
                    $rootScope.showRightSide = false;
                    $rootScope.showUserMenu = false;
                    $rootScope.contentSize = 8;
                    $rootScope.contentOffset = 0;
                }, 2000);
            }
            
        });

        // State not found
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            //$rootScope.loading = false;
            console.log(unfoundState.to);
            // 'lazy.state'
            console.log(unfoundState.toParams);
            // {a:1, b:2}
            console.log(unfoundState.options);
            // {inherit:false} + default options
        });

        $rootScope.pageTitle = function() {
            var title = $rootScope.app.name;
            if ($rootScope.currTitle) {
                title = $rootScope.currTitle;
            }else if ($rootScope.seo.meta_title) {
                title = $rootScope.seo.meta_title;
            }
            return title;
        };

        $rootScope.pageDescription = function () {
            var description = $rootScope.app.description;
            if ($rootScope.seo.meta_description) {
                description = $rootScope.seo.meta_description;
            }
            return description;
        };

        $rootScope.pageKeywords = function () {
            var keywords = $rootScope.app.keywords;
            if ($rootScope.seo.meta_keywords) {
                keywords = $rootScope.seo.meta_keywords;
            }
            return keywords;
        };

        // save settings to local storage
        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;
        } else {
            $localStorage.layout = $scope.app.layout;
        }

        $scope.$watch('app.layout', function() {
            // save to local storage
            $localStorage.layout = $scope.app.layout;
        }, true);

        //global function to scroll page up
        $scope.toTheTop = function() {

            $document.scrollTopAnimated(0, 600);

        };

        // angular translate
        // ----------------------

        $scope.language = {
            // Handles language dropdown
            listIsOpen : false,
            // list of available languages
            available : $rootScope.languages,
            // display always the current ui language
            init : function() {
                if (angular.isDefined($stateParams.language)) {
                    $scope.language.selected = $scope.language.available[$stateParams.language];
                    $rootScope.currentLanguage = $localStorage.language = $stateParams.language;
                } else {
                    var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                    var preferredLanguage = $translate.preferredLanguage();
                    for (var lang in $scope.language.available) {
                        if (window.location.hash.endsWith('/'+lang)) {
                            proposedLanguage = lang;
                        }
                    }
                    // we know we have set a preferred one in app.config
                    $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
                    $rootScope.currentLanguage = $localStorage.language = (proposedLanguage || preferredLanguage);
                }
            },
            set : function(localeId) {
                $translate.use(localeId);
                $scope.language.selected = $scope.language.available[localeId];
                $scope.language.listIsOpen = !$scope.language.listIsOpen;
                $localStorage.language = localeId;
                $rootScope.$broadcast('languageChange', [localeId]);
            }
        };

        $scope.language.init();

        // Function that find the exact height and width of the viewport in a cross-browser way
        var viewport = function() {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width : e[a + 'Width'],
                height : e[a + 'Height']
            };
        };

        // function that adds information in a scope of the height and width of the page
        $scope.getWindowDimensions = function() {
            return {
                'h' : viewport().height,
                'w' : viewport().width
            };
        };

        // Detect when window is resized and set some variables
        $scope.$watch($scope.getWindowDimensions, function(newValue, oldValue) {
            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;

            if (newValue.w >= 992) {
                $scope.isLargeDevice = true;
            } else {
                $scope.isLargeDevice = false;
            }
            if (newValue.w < 992) {
                $scope.isSmallDevice = true;
            } else {
                $scope.isSmallDevice = false;
            }
            if (newValue.w <= 768) {
                $scope.isMobileDevice = true;
            } else {
                $scope.isMobileDevice = false;
            }
        }, true);

        // Apply on resize
        $win.on('resize', function() {

            $scope.$apply();
            if ($scope.isLargeDevice) {
                $('#app .main-content').css({
                    position : 'relative',
                    top : 'auto',
                    width: 'auto'
                });
                $('footer').show();
            }
        });

        $scope.add_tender = function () {
            $state.go('front.tender.add');
        }

        $scope.show_tender = function (id) {
            $state.go('front.tender', {id: id})
        }
        
    }]);
