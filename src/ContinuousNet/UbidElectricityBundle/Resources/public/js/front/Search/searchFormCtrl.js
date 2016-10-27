app.controller('searchFormCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout','toaster','$filter','$countriesDataFactory','$languagesDataFactory','$tendersFrontDataFactory','$q','$advancedSearchDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $timeout, toaster, $filter, $countriesDataFactory, $languagesDataFactory, $tendersFrontDataFactory, $q, $advancedSearchDataFactory) {

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

        $scope.getPresentMaxEstimatedCost = function () {
            $timeout(function () {
                $scope.maxEstimatedCostLoaded = true;
                if($scope.maxEstimatedCost == 0){
                    var def = $q.defer();
                    $advancedSearchDataFactory.getMaxEstimatedCost().$promise.then(function (data) {
                        $scope.maxEstimatedCost = parseInt(data.value);
                        def.resolve($scope.maxEstimatedCost);
                    });
                    return def;
                }
                else{
                    return $scope.maxEstimatedCost
                }
            });
        }

        $scope.getCountries();
        $scope.getTenderCategories();
        $scope.val = $scope.getPresentMaxEstimatedCost();

        $scope.price = {
            minValue: 0,
            maxValue: 1000,
            options: {
                floor: 0,
                ceil: 150000,
                step: 1,
                noSwitching: true
            }
        };
        
        $scope.search = {
            tender_categories: [],
            countries: []
        };

        $scope.addSelectedCountries = function(data){
            $scope.search.countries.push(data.marker);
        }

        $scope.selectedAllCategories = false;
        $scope.$watch('selectedAllCategories', function () {
            if($scope.selectedAllCategories){
                $scope.search.tender_categories = [];
                $scope.search.tender_categories = $scope.tenderCategories.map(function(cat){
                    return cat.id;
                });
            }
            else{
                $scope.search.tender_categories = [];
            }
        });

        $scope.searchResults = [];
        $scope.submitForm = function (form, page) {
            page = page-1;
            console.log($scope.countries);
            $scope.disableSubmit = true;
            if($scope.price.maxValue > 0){
                $scope.search.priceMinValue = $scope.price.minValue;
                $scope.search.priceMaxValue = $scope.price.maxValue;
            }else{
                $scope.search.priceMinValue = 0;
                $scope.search.priceMaxValue = 0;
            }
            $scope.search.page = page;
            $advancedSearchDataFactory.getResults($scope.search).$promise.then(function (data) {
               console.log(data);
                $scope.searchResults = data.results;
                $scope.pageSize = 10;
                $scope.total = data.inlineCount;
                $scope.currentPage = page;
                $scope.col = 4;

            });
            $scope.disableSubmit = false;
        }
    }]);