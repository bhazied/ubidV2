'use strict';
app.controller('tendersFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$HomeDataFactory','$filter','$tendersFrontDataFactory', '$postsDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $HomeDataFactory, $filter, $tendersFrontDataFactory, $postsDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 9;
            $rootScope.contentOffset = 0;
        }, 1500);

        $scope.sortingOptions = [{
            sortField: 'deadline',
            sortDirection: 'ASC',
            label: $filter('translate')('front.DUEDATEASC')
        },{
            sortField: 'deadline',
            sortDirection: 'DESC',
            label: $filter('translate')('front.DUEDATEDESC')
        },{
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
            sortField: 'views',
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

        $scope.section = angular.isDefined($stateParams.section) ? $stateParams.section : 'Tender';

        $scope.slug = $scope.section.toLowerCase() + 's';

        $postsDataFactory.getBySlug({slug: $scope.slug, locale: $localStorage.language}).$promise.then(function(data) {
            $scope.postLoaded = true;
            $scope.post = data;
            $rootScope.seo.meta_description = data.meta_description;
            $rootScope.seo.meta_keywords = data.meta_keywords;
            $rootScope.seo.meta_title = data.meta_title;
            console.log( $rootScope.seo);
        });

        $scope.getTenders = function () {
            $(window).scrollTop(0);
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

    }
]);