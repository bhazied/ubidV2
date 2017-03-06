'use strict';
/**
 * controllers for UI Bootstrap components
 */
app.controller('AlertDemoCtrl', ["$scope", function ($scope) {
    $scope.alerts = [{
        type: 'danger',
        msg: 'Oh snap! Change a few things up and try submitting again.'
    }, {
        type: 'success',
        msg: 'Well done! You successfully read this important alert message.'
    }];

    $scope.addAlert = function () {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
}]).controller('ButtonsCtrl', ["$scope", function ($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    };
}]).controller('ProgressDemoCtrl', ["$scope", function ($scope) {
    $scope.max = 200;

    $scope.random = function () {
        var value = Math.floor((Math.random() * 100) + 1);
        var type;

        if (value < 25) {
            type = 'success';
        } else if (value < 50) {
            type = 'info';
        } else if (value < 75) {
            type = 'warning';
        } else {
            type = 'danger';
        }

        $scope.showWarning = (type === 'danger' || type === 'warning');

        $scope.dynamic = value;
        $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function () {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];

        for (var i = 0, n = Math.floor((Math.random() * 4) + 1) ; i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            $scope.stacked.push({
                value: Math.floor((Math.random() * 30) + 1),
                type: types[index]
            });
        }
    };
    $scope.randomStacked();
}]).controller('TooltipDemoCtrl', ["$scope", function ($scope) {
    $scope.dynamicTooltip = 'I am a dynamic Tooltip text';
    $scope.dynamicTooltipText = 'I am a dynamic Tooltip Popup text';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
}]).controller('PopoverDemoCtrl', ["$scope", function ($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
    $scope.popoverType = 'bottom';
}]).controller('PaginationDemoCtrl', ["$scope", "$log", function ($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        $log.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
}]).controller('RatingDemoCtrl', ["$scope", function ($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [{
        stateOn: 'glyphicon-ok-sign',
        stateOff: 'glyphicon-ok-circle'
    }, {
        stateOn: 'glyphicon-star',
        stateOff: 'glyphicon-star-empty'
    }, {
        stateOn: 'glyphicon-heart',
        stateOff: 'glyphicon-ban-circle'
    }, {
        stateOn: 'glyphicon-heart'
    }, {
        stateOff: 'glyphicon-off'
    }];
}]).controller('DropdownCtrl', ["$scope", "$log", function ($scope, $log) {
    $scope.items = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}]).controller('TabsDemoCtrl', ["$scope", "SweetAlert", function ($scope, SweetAlert) {
    $scope.tabs = [{
        title: 'Dynamic Title 1',
        content: 'Dynamic content 1'
    }, {
        title: 'Dynamic Title 2',
        content: 'Dynamic content 2',
        disabled: false
    }];

    $scope.alertMe = function () {
        setTimeout(function () {
            SweetAlert.swal({
	        	title: 'You\'ve selected the alert tab!',
	        	confirmButtonColor: '#007AFF'
        	});
        });
    };
}]).controller('AccordionDemoCtrl', ["$scope", function ($scope) {
    $scope.oneAtATime = true;

    $scope.groups = [{
        title: 'Dynamic Group Header - 1',
        content: 'Dynamic Group Body - 1'
    }, {
        title: 'Dynamic Group Header - 2',
        content: 'Dynamic Group Body - 2'
    }];

    $scope.items = ['Item 1', 'Item 2', 'Item 3'];

    $scope.addItem = function () {
        var newItemNo = $scope.items.length + 1;
        $scope.items.push('Item ' + newItemNo);
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
}]).controller('DatepickerDemoCtrl', ["$scope", "$log", function ($scope, $log) {
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();
 	$scope.maxDate = new Date(2020, 5, 22);
    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = !$scope.opened;
    };
    $scope.endOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };
    $scope.startOpen = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.hstep = 1;
    $scope.mstep = 15;

    // Time Picker
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.dt = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.dt);
    };

    $scope.clear = function () {
        $scope.dt = null;
    };

}]).controller('DropdownCtrl', ["$scope", "$log", function ($scope, $log) {
    $scope.items = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function (open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
}]).controller('ModalDemoCtrl', ["$scope", "$uibModal", "$log", function ($scope, $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

app.controller('ModalInstanceCtrl', ["$scope", "$uibModalInstance", "items", function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);
'use strict';

/**
 * Login Data Factory
 */
app.factory('$loginDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {

        return $resource($rootScope.app.apiURL + 'login_check', {}, {
            check: { method: 'POST' }
        });

    }
]);

'use strict';

/**
 * Controller for user login
 */
app.controller('LoginFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$loginDataFactory', 'toaster', '$filter', '$stateParams',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $loginDataFactory, toaster, $filter, $stateParams) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 6;
            $rootScope.contentOffset = 3;
        }, 1000);

        $scope.type = angular.isDefined($stateParams.type) ? $stateParams.type : 'Both';

        $scope.resetAccess = function(){
            if ($localStorage.access_token) {
                delete $localStorage.access_token;
            }
            if ($localStorage.user) {
                delete  $localStorage.user;
            }
            $scope.status = '';
            $scope.user = $rootScope.user = {};
            $rootScope.loggedIn = false;

        };

        $scope.submit = function () {
            $scope.user = {
                email: $scope.email,
                password: $scope.password
            };
            $loginDataFactory.check($scope.user).$promise.then(function(data) {
                if (data.user.roles.indexOf('ROLE_SUBSCRIBER') == -1) {
                    $scope.status = 'error';
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('login.ERROR'));
                    return;
                }
                toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('login.WELCOME'));
                $scope.status = 'welcome';
                $localStorage.access_token = data.token;
                $scope.user = $localStorage.user = $rootScope.user = data.user;
                $timeout(function() {
                    $rootScope.loggedIn = true;
                    $state.go('front.usermenu');
                }, 1000);
            }, function(error) {
                $scope.status = 'error';
                toaster.pop('error', $filter('translate')('content.common.WARNING'), $filter('translate')('login.ERROR'));
                $rootScope.loggedIn = false;
            });
            return false;
        };

        $scope.logout = function(){
            $scope.resetAccess();
            $timeout(function() {

                $rootScope.loggedIn = false;

                $state.go('front.home');
            }, 1000);
        };

        $scope.myProfile = function () {
            $state.go('front.profile');
        };
        
        $scope.register = function (type) {
            $state.go('front.register', {type: type});
        };
        
        $scope.goLogin = function () {
            $state.go('front.login');
        };

        $scope.gotoUserMenu = function () {
            $state.go('front.usermenu');
        }

    }]);

'use strict';
/**
 * Ubid electricity Main Controller
 */
app.controller('FrontCtrl', ['$rootScope', '$scope', '$state', '$translate', '$localStorage', '$window', '$document', '$timeout', 'cfpLoadingBar', '$filter', '$stateParams', '$loginDataFactory','toaster','$advancedSearchDataFactory','$q',
    function($rootScope, $scope, $state, $translate, $localStorage, $window, $document, $timeout, cfpLoadingBar, $filter, $stateParams, $loginDataFactory, toaster, $advancedSearchDataFactory, $q) {

        $rootScope.showSlogan = false;
        $rootScope.showUserMenu = false;
        $rootScope.showLeftSide = false;
        $rootScope.showRightSide = false;
        $rootScope.contentSize = 9;
        $rootScope.contentOffset = 0;

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

app.controller('SearchFormCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout','toaster','$filter','$countriesDataFactory','$languagesDataFactory','$tendersFrontDataFactory','$q','$advancedSearchDataFactory','SweetAlert',
    function ($scope, $rootScope, $localStorage, $state, $timeout, toaster, $filter, $countriesDataFactory, $languagesDataFactory, $tendersFrontDataFactory, $q, $advancedSearchDataFactory, SweetAlert) {

       /* $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1000);*/

        $scope.showForm = false;
        $scope.toggle = function() {
          if ($scope.showForm) {
              $scope.showForm = false;
              $('#searchform').addClass('hidden-sm-down');
          } else {
              $scope.showForm = true;
              $('#searchform').removeClass('hidden-sm-down');
          }
        };

        if(angular.isDefined($localStorage.searchResult)){
                $scope.tenders = $localStorage.searchResult.tenders ? $localStorage.searchResult.tenders : [];
                $scope.pageSize = $localStorage.searchResult.pageSize ?  $localStorage.searchResult.pageSize : 10;
                $scope.total = $localStorage.searchResult.total ? $localStorage.searchResult.total : 0;
                $scope.page = $localStorage.searchResult.page ? $localStorage.searchResult.page : 1;
        }

        if(angular.isDefined($localStorage.genericSearchResults)){
            //$state.reload();
            $scope.totalCount = $localStorage.genericSearchResults.inlineCount ? $localStorage.genericSearchResults.inlineCount : 0;
            $scope.tenders = $localStorage.genericSearchResults.tenders.data ? $localStorage.genericSearchResults.tenders.data : [];
            $scope.tenderCount = $localStorage.genericSearchResults.tenders.inlineCount ? $localStorage.genericSearchResults.tenders.inlineCount : 0;
            $scope.suppliers = $localStorage.genericSearchResults.suppliers.data ? $localStorage.genericSearchResults.suppliers.data : [];
            $scope.supplierCount = $localStorage.genericSearchResults.suppliers.inlineCount ? $localStorage.genericSearchResults.suppliers.inlineCount : 0;
            $scope.buyers = $localStorage.genericSearchResults.buyers.data ? $localStorage.genericSearchResults.buyers.data : 0;
            $scope.buyerCount = $localStorage.genericSearchResults.buyers.inlineCount ? $localStorage.genericSearchResults.buyers.inlineCount : [];

            $scope.tabs = [
                {
                    title: $filter('translate')('front.TENDERS'),
                    template: '/bundles/ubidelectricity/js/front/Search/generic_search_tabs/tenders.html',
                    inlineCount: $scope.tenderCount
                },
                {
                    title: $filter('translate')('front.SUPPLIERS'),
                    template: '/bundles/ubidelectricity/js/front/Search/generic_search_tabs/suppliers.html',
                    inlineCount: $scope.supplierCount
                },
                {
                    title: $filter('translate')('front.BUYER'),
                    template: '/bundles/ubidelectricity/js/front/Search/generic_search_tabs/buyers.html',
                    inlineCount: $scope.buyerCount
                },
            ];
        }

        $scope.col = 8;
        $scope.selectListCountries = [];
        $scope.selectedListCountries = [];

        $scope.labels = {
            selectAll       : $filter('translate')("content.form.country_picker.selectAll"),
            selectNone      : $filter('translate')("content.form.country_picker.selectNone"),
            reset           : $filter('translate')("content.form.country_picker.reset"),
            search          : $filter('translate')("content.form.country_picker.search"),
            search          : $filter('translate')("content.form.country_picker.search"),
            nothingSelected : $filter('translate')("content.form.country_picker.nothingSelected")
        };

        $scope.fromPublishDateOpened = false;
        $scope.fromPublishDateToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.fromPublishDateOpened = !$scope.fromPublishDateOpened;
        };

        $scope.toPublishDateOpened = false;
        $scope.toPublishDateToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.toPublishDateOpened = !$scope.toPublishDateOpened;
        };

        $scope.deadline1Opened = false;
        $scope.deadline1Toggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.deadline1Opened = !$scope.deadline1Opened;
        };

        $scope.deadline2Opened = false;
        $scope.deadline2Toggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.deadline2Opened = !$scope.deadline2Opened;
        };
        
        $scope.dateFormat = $filter('translate')('formats.DATE');
        $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
        $scope.timeFormat = $filter('translate')('formats.TIME');
        $scope.minDate = new Date(2010, 0, 1);
        $scope.maxDate = new Date(2050, 11, 31);
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.disabled = function (date, mode) {
            return (mode === 'day' && (date.getDay() === -1));
        };

        $scope.disableSubmit = false;
        $scope.countriesLoaded = false;
        $scope.countries = [];

        $scope.getCountries = function(){
            $timeout(function(){
                $scope.countriesLoaded = true;
                if ($scope.countries.length == 0) {
                    $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                    var def = $q.defer();
                    $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                        for (var i in data.results) {
                            data.results[i].hidden = false;
                            $scope.selectListCountries.push({
                                icon: '<img src="' + data.results[i].picture + '">',
                                name: data.results[i].name,
                                marker: data.results[i].id,
                                ticked: false
                            });
                        }
                        $scope.countries = data.results;
                        def.resolve($scope.countries);
                    });
                    return def;
                } else {
                    return $scope.countries;
                }
            });
        }

        $scope.tenderCategoriesLoaded = false;
        $scope.tenderCategories = [];

        $scope.getTenderCategories = function () {
            $timeout(function () {
                $scope.tenderCategoriesLoaded = true;
                if($scope.tenderCategories.length == 0){
                    var def = $q.defer();
                    $tendersFrontDataFactory.categoriesTenders({locale: $localStorage.language}).$promise.then(function (data) {
                        for (var i in data.results) {
                            data.results[i].expand = false;
                        }
                        $scope.tenderCategories = data.results;
                        def.resolve($scope.tenderCategories);
                    });
                    return def;
                }
                else {
                    return $scope.tenderCategories;
                }
            });
        };

        $scope.maxEstimatedCostLoaded = false;
        $scope.maxEstimatedCost = 0;

        $scope.getCountries();
        $scope.getTenderCategories();
        $scope.search = {
            tender_categories: [],
            countries: [],
            total_cost_operator: '',
            total_cos_value: 0,
            publish_date: '',
            publish_date_from: '',
            publish_date_to: '',
            deadline: '',
            deadline1: '',
            deadline2: ''
        };

        $scope.searchResults = [];
        $scope.submitForm = function (form, page) {
            page = page-1;
            $scope.disableSubmit = true;
            $scope.search.deadline = $scope.search.deadline ? $scope.search.deadline.value : '';
            $scope.search.publish_date = $scope.search.publish_date ? $scope.search.publish_date.value : '';
            $scope.search.total_cost_operator = $scope.search.total_cost_operator ? $scope.search.total_cost_operator.value : '';
            $scope.search.page = page;
            $scope.search.locale = $localStorage.language;
            var $params = $scope.search;
            delete $localStorage.searchResult;
            $timeout(function () {
                $advancedSearchDataFactory.getResults($params).$promise.then(function (data) {
                    if(data.inlineCount > 0){
                        $scope.searchResults = data.results;
                        $scope.pageSize = 10;
                        $scope.total = data.inlineCount;
                        $scope.currentPage = page;
                        var  searchResult = {
                            tenders : $scope.searchResults,
                            pageSize : $scope.pageSize,
                            total:  $scope.total,
                            page:  $scope.currentPage
                        };
                        $localStorage.searchResult = searchResult;
                        $state.transitionTo('front.advanced_search', {}, {reload:false, notify:true});
                    }
                    else {
                        $rootScope.searchLoaded = true;
                        SweetAlert.swal($filter('translate')('content.form.messages.ADVANCEDRESEARCHNORESULTHEADER'), $filter('translate')('content.form.messages.ADVANCEDRESEARCHNORESULTTEXT'), "info");
                    }
                    $scope.disableSubmit = false;
                });
            });
        }

        $scope.genericSearchResults = [];
        $scope.submitSearch = function (searchText) {
            if(!angular.isDefined(searchText)){
                toaster.pop('error', "You must enter some word to search", 'search info');
                return false;
            }
            else {
                delete $localStorage.genericSearchResults;
                $timeout(function () {
                    //var def = $q.defer();
                    var $params = {};
                    $params.locale = $localStorage.language;
                    $params.searchText = searchText;
                    console.log($params);
                    $advancedSearchDataFactory.genericSearch($params).$promise.then(function (data) {
                        if (data.inlineCount > 0) {
                            $localStorage.genericSearchResults = data;
                            $state.transitionTo('front.generic_search', {}, {reload:true, notify:true});
                        } else {
                            toaster.pop('error', "no result for this search", 'search info');
                            return false;
                        }
                    });
                });
            }
        }

        $scope.dueDateIsShowen = false;
        $scope.publishDateIsShowen = false;

        $scope.toggleDueDate = function(){
            if($scope.search.deadline.value == 'customdate') {
                $scope.dueDateIsShowen = !$scope.dueDateIsShowen;
            }else{
                $scope.dueDateIsShowen = false;
            }
        }

        $scope.togglePublishDate = function () {
            if($scope.search.publish_date.value == 'customdate'){
                $scope.publishDateIsShowen = !$scope.publishDateIsShowen;
            }else{
                $scope.publishDateIsShowen = false;
            }
        }

        $scope.operators = [
            {
                label: $filter('translate')('front.MORETHAN'),
                value: '>'
            },
            {
                label: $filter('translate')('front.EQUALTO'),
                value: '='
            },
            {
                label: $filter('translate')('front.LESSTHAN'),
                value: '<'
            }
        ];

        $scope.dateRanges = [
            {
                label: $filter('translate')('front.TODAY'),
                value: 'today'
            },
            {
                label: $filter('translate')('front.YESTERDAY'),
                value: 'yesterday'
            },
            {
                label: $filter('translate')('front.LAST7DAYS'),
                value: 'last7days'
            },
            {
                label: $filter('translate')('front.LAST30DAYS'),
                value: 'last30days'
            },
            {
                label: $filter('translate')('front.THISMONTH'),
                value: 'thismonth'
            },
            {
                label: $filter('translate')('front.LASTMONTH'),
                value: 'lastmonth'
            },
            {
                label: $filter('translate')('front.CUSTOMDATE'),
                value: 'customdate'
            }
        ];

        $scope.changeParentStatus = function(tcid){
            var selectedVariable = tcid + '_checked';
            $scope[selectedVariable] = !$scope[selectedVariable];
        }

        $scope.parentChecked = function (tcid, tsc) {
                var selectedVariable = tcid + '_checked';
                if (angular.isUndefined($scope[selectedVariable])) {
                    $scope[selectedVariable] = false;
                    return $scope[selectedVariable];
                }
                if (tcid == tsc.parent_category.id) {
                    return $scope[selectedVariable];
                }
                return false;
            }

    }]);

'use strict';

/**
 * advanced search  Data Factory
 */
app.factory('$advancedSearchDataFactory', ['$resource', '$rootScope',
    function($resource, $rootScope) {
        var url = $rootScope.app.apiURL ;
        var urlGen = '/en' + url ;
        return $resource(url, {
            locale: '@locale'
        }, {
            getResults: { method: 'POST', url: '/:locale' + url + 'sr' , isArray: false},
            genericSearch: {method: 'POST', url: urlGen + 'genericSearch', isArray : false }
        });

    }]);

'use strict';

/**
 * File Manager Modal Controller
 */

app.controller('FileManagerCtrl', ['$scope', '$localStorage', '$timeout', '$uibModalInstance', 'field', 'value', 'instance', 'folder',
    function ($scope, $localStorage, $timeout, $uibModalInstance, field, value, instance, folder) {

        $scope.field = field;
        $scope.value = value;
        $scope.instance = instance;
        $scope.folder = folder;
        $scope.url = '';
        $scope.mode = '';
        $timeout(function(){
            var fileManager = $('#elfinder_'+$scope.field).elfinder({
                url : '/efconnect/'+$scope.instance+'/'+$scope.folder+'?mode='+$scope.mode,
                lang : (angular.isDefined($localStorage.language))?$localStorage.language:'en',
                useBrowserHistory: false,
                onlyMimes: ['image', 'video', 'audio', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'],
                customHeaders: {
                    'Authorization': 'Bearer ' + $localStorage.access_token,
                    'APP-Application': 'BackOffice'
                },
                getFileCallback : function(file) {
                    var parser = document.createElement('a');
                    parser.href = file.url;
                    $scope.url = parser.pathname;
                },
                handlers: {
                    select: function(event, elfinderInstance) {
                        var selected = event.data.selected;
                        if (selected.length > 0) {
                            var files = [];
                            for (var i in selected) {
                                var file = elfinderInstance.file(selected[i]);
                                var path = elfinderInstance.path(selected[i]);
                                if (file.mime == 'directory') {
                                    //opens a folder
                                    elfinderInstance.request({data:{cmd: 'open', target: selected[0]},notify:{type:'open',target:selected[0]}, syncOnFail:true});
                                } else {
                                    var parser = document.createElement('a');
                                    var href = '/uploads/';
                                    if ($scope.instance == 'data') {
                                        href += 'data/'+$scope.folder+'/../'+path;
                                    }
                                    parser.href = href;
                                    files.push(parser.pathname);
                                }
                            }
                            $scope.url = files.join();
                        }
                    }
                }
            });
        });

        $scope.ok = function () {
            $uibModalInstance.close($scope.url);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);

'use strict';

/**
 * Location Picker Modal Controller
 */

app.controller('LocationPickerCtrl', ['$scope', '$localStorage', '$timeout', '$uibModalInstance', 'field', 'value',
    function ($scope, $localStorage, $timeout, $uibModalInstance, field, value) {

        $scope.field = field;
        $scope.value = value;
        $scope.latitude = 35.86841427230919;
        $scope.longitude = 10.57455518203119;
        $scope.radius = 100;

        $timeout(function(){
            if ($scope.value != '' && typeof $scope.value != 'undefined') {
                var parts = $scope.value.split('|');
                $scope.latitude = parts[0];
                $scope.longitude = parts[1];
                $scope.radius = parts[2];
            }

            var locationPicker = $('#locationpicker_'+$scope.field).locationpicker({
                location: {
                    latitude: $scope.latitude,
                    longitude: $scope.longitude
                },
                radius: $scope.radius,
                inputBinding: {
                    latitudeInput: $('#latitude_'+$scope.field),
                    longitudeInput: $('#longitude_'+$scope.field),
                    radiusInput: $('#radius_'+$scope.field),
                    locationNameInput: $('#address_'+$scope.field)
                },
                enableAutocomplete: true,
                onchanged: function (currentLocation, radius, isMarkerDropped) {
                    //$scope.latitude = currentLocation.latitude;
                    //$scope.longitude = currentLocation.longitude;
                }
            });

        }, 500);

        $scope.ok = function () {
            $uibModalInstance.close($scope.latitude+'|'+$scope.longitude+'|'+$scope.radius);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

    }]);

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.4",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.4",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")&&(c.prop("checked")&&this.$element.hasClass("active")?a=!1:b.find(".active").removeClass("active")),a&&c.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));a&&this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.4",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){b&&3===b.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=c(d),f={relatedTarget:this};e.hasClass("open")&&(e.trigger(b=a.Event("hide.bs.dropdown",f)),b.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f)))}))}function c(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.4",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=c(e),g=f.hasClass("open");if(b(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click",b);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(b){if(/(38|40|27|32)/.test(b.which)&&!/input|textarea/i.test(b.target.tagName)){var d=a(this);if(b.preventDefault(),b.stopPropagation(),!d.is(".disabled, :disabled")){var e=c(d),g=e.hasClass("open");if(!g&&27!=b.which||g&&27==b.which)return 27==b.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find('[role="menu"]'+h+', [role="listbox"]'+h);if(i.length){var j=i.index(b.target);38==b.which&&j>0&&j--,40==b.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",b).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',g.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.4",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in").attr("aria-hidden",!1),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a('<div class="modal-backdrop '+e+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",a,b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c&&c.$tip&&c.$tip.is(":visible")?void(c.hoverState="in"):(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.options.container?a(this.options.container):this.$element.parent(),p=this.getPosition(o);h="bottom"==h&&k.bottom+m>p.bottom?"top":"top"==h&&k.top-m<p.top?"bottom":"right"==h&&k.right+l>p.width?"left":"left"==h&&k.left-l<p.left?"right":h,f.removeClass(n).addClass(h)}var q=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(q,h);var r=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",r).emulateTransitionEnd(c.TRANSITION_DURATION):r()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top=b.top+g,b.left=b.left+h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.width&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){return this.$tip=this.$tip||a(this.options.template)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type)})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.4",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.4",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.4",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){
var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.4",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=a(document.body).height();"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);