app.controller('SearchFormCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout','toaster','$filter','$countriesDataFactory','$languagesDataFactory','$tendersFrontDataFactory','$q','$advancedSearchDataFactory','SweetAlert',
    function ($scope, $rootScope, $localStorage, $state, $timeout, toaster, $filter, $countriesDataFactory, $languagesDataFactory, $tendersFrontDataFactory, $q, $advancedSearchDataFactory, SweetAlert) {

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

        if (angular.isDefined($localStorage.searchResult)) {
            $scope.tenders = $localStorage.searchResult.tenders ? $localStorage.searchResult.tenders : [];
            $scope.pageSize = $localStorage.searchResult.pageSize ?  $localStorage.searchResult.pageSize : 10;
            $scope.total = $localStorage.searchResult.total ? $localStorage.searchResult.total : 0;
            $scope.page = $localStorage.searchResult.page ? $localStorage.searchResult.page : 1;
        }

        if (angular.isDefined($localStorage.genericSearchResults)) {
            //$state.reload();
            $scope.totalCount = $localStorage.genericSearchResults.inlineCount ? $localStorage.genericSearchResults.inlineCount : 0;
            $scope.tenders = $localStorage.genericSearchResults.tenders.data ? $localStorage.genericSearchResults.tenders.data : [];
            $scope.tenderCount = $localStorage.genericSearchResults.tenders.inlineCount ? $localStorage.genericSearchResults.tenders.inlineCount : 0;
            $scope.consultations = $localStorage.genericSearchResults.tenders.data ? $localStorage.genericSearchResults.consultations.data : [];
            $scope.consultationCount = $localStorage.genericSearchResults.tenders.inlineCount ? $localStorage.genericSearchResults.consultations.inlineCount : 0;
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
                    title: $filter('translate')('front.CONSULTATIONS'),
                    template: '/bundles/ubidelectricity/js/front/Search/generic_search_tabs/consultations.html',
                    inlineCount: $scope.consultationCount
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
                }
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
            $scope.fromPublishDateOpened = !$scope.fromPublishDateOpened;
        };

        $scope.toPublishDateOpened = false;
        $scope.toPublishDateToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.toPublishDateOpened = !$scope.toPublishDateOpened;
        };

        $scope.fromDeadlineOpened = false;
        $scope.fromDeadlineToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.fromDeadlineOpened = !$scope.fromDeadlineOpened;
        };

        $scope.toDeadlineOpened = false;
        $scope.toDeadlineToggle = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.toDeadlineOpened = !$scope.toDeadlineOpened;
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

        $scope.getCountries = function() {
            $timeout(function() {
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
        };

        $scope.allCategoriesLoaded = false;
        $scope.allCategories = [];

        $scope.getCategoriesList = function () {
            $timeout(function () {
                $scope.allCategoriesLoaded = true;
                if ($scope.allCategories.length == 0) {
                    var def = $q.defer();
                    $tendersFrontDataFactory.categoriesList({locale: $localStorage.language}).$promise.then(function (data) {
                        for (var i in data.results) {
                            data.results[i].expand = false;
                        }
                        $scope.allCategories = data.results;
                        def.resolve($scope.allCategories);
                    });
                    return def;
                }
                else {
                    return $scope.allCategories;
                }
            });
        };

        $scope.maxEstimatedCostLoaded = false;
        $scope.maxEstimatedCost = 0;

        $scope.getCountries();
        $scope.getCategoriesList();

        $scope.search = {
            categories: [],
            countries: [],
            total_cost_operator: '',
            total_cost_value: 0,
            publish_date: '',
            publish_date_from: '',
            publish_date_to: '',
            deadline: '',
            deadline_from: '',
            deadline_to: ''
        };

        //$scope.searchResults = [];
        $scope.submitForm = function (form, page) {
            page = page-1;
            $scope.disableSubmit = true;
            $scope.search.deadline = $scope.search.deadline ? $scope.search.deadline.value : '';
            $scope.search.publish_date = $scope.search.publish_date ? $scope.search.publish_date.value : '';
            $scope.search.total_cost_operator = $scope.search.total_cost_operator ? $scope.search.total_cost_operator.value : '';
            //$scope.search.page = page;
            $scope.search.locale = $localStorage.language;
            var $params = $scope.search;
            delete $localStorage.searchResult;
            $timeout(function () {
                $advancedSearchDataFactory.getResults($params).$promise.then(function (data) {
                    if (data.inlineCount > 0) {
                        /*
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
                        */
                        $localStorage.genericSearchResults = data;
                        $state.transitionTo('front.generic_search', {}, {reload:true, notify:true});
                    } else {
                        $rootScope.searchLoaded = true;
                        SweetAlert.swal($filter('translate')('content.form.messages.ADVANCEDRESEARCHNORESULTHEADER'), $filter('translate')('content.form.messages.ADVANCEDRESEARCHNORESULTTEXT'), "info");
                    }
                    $scope.disableSubmit = false;
                });
            });
        };

        $scope.genericSearchResults = [];
        $scope.submitSearch = function (searchText) {
            if (!angular.isDefined(searchText)) {
                toaster.pop('warning', $filter('translate')('content.common.WARNING'), $filter('translate')('front.EMPTYSEARCHALERT'));
                return false;
            } else {
                delete $localStorage.genericSearchResults;
                $timeout(function () {
                    //var def = $q.defer();
                    var $params = {};
                    $params.locale = $localStorage.language;
                    $params.searchText = searchText;
                    $advancedSearchDataFactory.getResults($params).$promise.then(function (data) {
                        if (data.inlineCount > 0) {
                            $localStorage.genericSearchResults = data;
                            $state.transitionTo('front.generic_search', {}, {reload:true, notify:true});
                        } else {
                            toaster.pop('info', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.form.messages.ADVANCEDRESEARCHNORESULTTEXT'));
                            return false;
                        }
                    });
                });
            }
        };

        $scope.dueDateIsShowen = false;
        $scope.publishDateIsShowen = false;

        $scope.toggleDueDate = function() {
            if ($scope.search.deadline.value == 'customdate') {
                $scope.dueDateIsShowen = !$scope.dueDateIsShowen;
            } else {
                $scope.dueDateIsShowen = false;
            }
        };

        $scope.togglePublishDate = function () {
            if ($scope.search.publish_date.value == 'customdate') {
                $scope.publishDateIsShowen = !$scope.publishDateIsShowen;
            } else {
                $scope.publishDateIsShowen = false;
            }
        };

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

        $scope.changeParentStatus = function(tcid) {
            var selectedVariable = tcid + '_checked';
            $scope[selectedVariable] = !$scope[selectedVariable];
        };

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
        };

    }
]);
