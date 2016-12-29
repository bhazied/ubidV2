'use strict';
app.controller('tendersFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$HomeDataFactory','$filter','$tendersFrontDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $HomeDataFactory, $filter, $tendersFrontDataFactory) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = true;
            $rootScope.showRightSide = true;
            $rootScope.showUserMenu = false;
            $rootScope.contentSize = 6;
            $rootScope.contentOffset = 0;
        }, 500);

        $scope.category_name = $filter('translate')('content.text.ALLCATEGORIES');
        $scope.dateFormat = $filter('translate')('formats.DATE');
        $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
        $scope.timeFormat = $filter('translate')('formats.TIME');
        $scope.tendersLoaded = false;
        $scope.tendersList = [];
        $scope.getTenders = function (page, categoryId) {
            page = page -1;
            var $params = {};
            if(angular.isDefined(categoryId)){
                $params.category = categoryId;
            }
            $params.locale = $localStorage.language;
            $params.page = page;
            $scope.tendersList = [];
            console.warn('params '+ $params);
            $timeout(function () {
                $scope.tendersLoaded = true;
                var def = $q.defer();
                $tendersFrontDataFactory.homeTenders($params).$promise.then(function(data){
                        if(data.results.length > 0){
                            $scope.tendersList = data.results;
                            $scope.pageSize = 10;
                            $scope.total = data.inlineCount;
                            $scope.currentPage = page+1;
                        }
                    });
                    def.resolve($scope.tendersList);
                return def;
            });

        }

        $scope.getTenders(1);


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