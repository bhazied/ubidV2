app.controller('searchFormCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout','toaster','$filter','$countriesDataFactory','$languagesDataFactory','$tendersFrontDataFactory','$q','$advancedSearchDataFactory','SweetAlert','$stateParams',
    function ($scope, $rootScope, $localStorage, $state, $timeout, toaster, $filter, $countriesDataFactory, $languagesDataFactory, $tendersFrontDataFactory, $q, $advancedSearchDataFactory, SweetAlert, $stateParams) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = true;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 6;
            $rootScope.contentOffset = 0;
        }, 1000);

        if(angular.isDefined($stateParams.tenders)){
                $scope.tensers = tenders;
                $scope.pageSize = pageSize;
                $scope.total = total;
                $scope.page = page;
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
            $timeout(function () {
                $advancedSearchDataFactory.getResults($scope.search).$promise.then(function (data) {
                    if(data.inlineCount > 0){
                        $scope.searchResults = data.results;
                        $scope.pageSize = 10;
                        $scope.total = data.inlineCount;
                        $scope.currentPage = page;
                        $state.go('front.advanced_search', {
                            tenders : $scope.searchResults,
                            pageSize : $scope.pageSize,
                            total:  $scope.total,
                            page:  $scope.currentPage
                        });
                    }
                    else {
                        $rootScope.searchLoaded = true;
                        SweetAlert.swal($filter('translate')('content.form.messages.ADVANCEDRESEARCHNORESULTHEADER'), $filter('translate')('content.form.messages.ADVANCEDRESEARCHNORESULTTEXT'), "info");
                    }
                    $scope.disableSubmit = false;
                });
            });
        }
    }]);