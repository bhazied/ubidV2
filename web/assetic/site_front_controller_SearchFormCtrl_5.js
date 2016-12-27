app.controller('searchFormCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout','toaster','$filter','$countriesDataFactory','$languagesDataFactory','$tendersFrontDataFactory','$q','$advancedSearchDataFactory','SweetAlert',
    function ($scope, $rootScope, $localStorage, $state, $timeout, toaster, $filter, $countriesDataFactory, $languagesDataFactory, $tendersFrontDataFactory, $q, $advancedSearchDataFactory, SweetAlert) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        }, 1000);

        if(angular.isDefined($localStorage.searchResult)){
            console.log($localStorage.searchResult);
                $scope.tensers = $localStorage.searchResult.tenders ? $localStorage.searchResult.tenders : [];
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
            nothingSelected : $filter('translate')("content.form.country_picker.nothingSelected")
        };

        $scope.fromPublishDateOpened = false;
        $scope.fromPublishDateToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.fromPublishDateOpened = !$scope.deadline1Opened;
        };

        $scope.toPublishDateOpened = false;
        $scope.toPublishDateToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.toPublishDateOpened = !$scope.deadline2Opened;
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

        $scope.tenderCAtegoriesLoaded = false;
        $scope.tenderCategories = [];

        $scope.getTenderCategories = function () {
            $timeout(function () {
                $scope.tenderCAtegoriesLoaded = true;
                if($scope.tenderCategories.length == 0){
                    var def = $q.defer();
                    $tendersFrontDataFactory.categoriesTenders({locale: $localStorage.language}).$promise.then(function (data) {
                        $scope.tenderCategories = data.results;
                        def.resolve($scope.tenderCategories);
                    });
                    return def;
                }
                else {
                    return $scope.tenderCategories;
                }
            });
        }

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
                        $state.transitionTo('front.advanced_search', {}, {reload:true, notify:true});
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
                    $scope.locale = angular.isDefined($localStorage.language) ? $localStorage.language : 'en';
                    var $params = {locale: $scope.locale, searchText: searchText};
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

    }]);
