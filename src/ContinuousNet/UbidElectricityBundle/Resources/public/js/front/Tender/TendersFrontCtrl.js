'use strict';
app.controller('tendersFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$HomeDataFactory','$filter','$tendersFrontDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $HomeDataFactory, $filter, $tendersFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 8;
            $rootScope.contentOffset = 0;
        }, 500);

        $scope.sortingOptions = [{
            sortField: 'title',
            sortDirection: 'ASC',
            label: $filter('translate')('front.TITLEASC')
        }, {
            sortField: 'title',
            sortDirection: 'DESC',
            label: $filter('translate')('front.TITLEDESC')
        }, {
            sortField: 'views',
            sortDirection: 'DESC',
            label: $filter('translate')('front.VIEWSDESC')
        }, {
            sortField: 'name',
            sortDirection: 'ASC',
            label: $filter('translate')('front.VIEWSASC')
        }];
        $scope.pageCounts = [5, 10, 20, 50, 100];

        $scope.sortingOption = $scope.sortingOptions[0];
        $scope.total = 0;
        $scope.pages = [1];
        $scope.page = 1;
        $scope.maxPage = 1;
        $scope.showNextPage = false;
        $scope.showPrevPage = false;
        $scope.pageCount = 10;

        $scope.category_name = $filter('translate')('content.text.ALLCATEGORIES');
        $scope.dateFormat = $filter('translate')('formats.DATE');
        $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
        $scope.timeFormat = $filter('translate')('formats.TIME');
        $scope.tendersLoaded = false;
        $scope.tendersList = [];

        $scope.section = angular.isDefined($stateParams.section) ? $stateParams.section : "Tender";
        $scope.getTenders = function () {
            var $params = {};
            $params.locale = $localStorage.language;
            $params.page = $scope.page;
            $params.pageCount = $scope.pageCount;
            $params.sortField = $scope.sortingOption.sortField;
            $params.sortDirection = $scope.sortingOption.sortDirection;
            $params.section = $scope.section;
            $scope.tendersList = [];
            $timeout(function () {
                $scope.tendersLoaded = true;
                var def = $q.defer();
                $tendersFrontDataFactory.homeTenders($params).$promise.then(function(data){
                            $scope.tendersList = data.results;
                            $scope.total = data.inlineCount;
                            $scope.maxPage = Math.ceil($scope.total/$scope.pageCount);
                            if ($scope.page > $scope.maxPage) {
                                $scope.page = $scope.maxPage;
                            }
                            $scope.pages = [];
                            for (var i = 1; i <= $scope.maxPage; i += 1) {
                                $scope.pages.push(i);
                            }
                            if ($scope.maxPage > 1) {
                                if ($scope.page < $scope.maxPage) {
                                    $scope.showNextPage = true;
                                } else {
                                    $scope.showNextPage = false;
                                }
                                if ($scope.page > 1) {
                                    $scope.showPrevPage = true;
                                } else {
                                    $scope.showPrevPage = false;
                                }
                            } else {
                                $scope.showNextPage = false;
                                $scope.showPrevPage = false;
                            }
                    });
                    def.resolve($scope.tendersList);
                return def;
            });

        }

        $scope.getTenders();

        $scope.setPage = function() {
            $scope.page = page;
            $scope.getTenders();
        };

        $scope.nextPage = function() {
            $scope.page++;
            $scope.getTenders();
        };

        $scope.prevPage = function() {
            $scope.page--;
            $scope.getTenders();
        };

        $scope.setPageCount = function(pageCount) {
            $scope.pageCount = pageCount;
            $scope.getTenders();
        };

        /*$scope.categoriesLoaded = false;
        $scope.categoriesList = [];
        $scope.getcategories = function () {
            $scope.categoriesLoaded = true;
            var def = $q.defer();
            $tendersFrontDataFactory.categoriesTenders({locale: $localStorage.language}).$promise.then(function (data) {
                $timeout(function (){
                    if(data.results.length > 0){
                        for(var i in data.results){
                            $scope.categoriesList.push({
                                id: data.results[i].id,
                                tender_count: data.results[i].tenders.length,
                                name: eval("data.results[i].name_"+$localStorage.language)
                                //id: $scope.results[i].id,
                            });
                        }
                    }
                });
            });
            def.resolve($scope.categoriesList);
            return def;
        }

        $scope.getcategories();*/
        
}]);