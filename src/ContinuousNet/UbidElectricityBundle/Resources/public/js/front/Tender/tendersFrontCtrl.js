'use strict';
app.controller('tendersFrontCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$stateParams', '$timeout', '$q', '$HomeDataFactory','$filter','$tendersFrontDataFactory',
    function ($scope, $rootScope, $localStorage, $state, $stateParams, $timeout, $q, $HomeDataFactory, $filter, $tendersFrontDataFactory) {

        $scope.dateFormat = $filter('translate')('formats.DATE');
        $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
        $scope.timeFormat = $filter('translate')('formats.TIME');
        $scope.tendersLoaded = false;
        $scope.tendersList = [];
        $scope.getTenders = function (page) {
            page = page -1;
            $scope.tendersList = [];
            $timeout(function () {
                $scope.tendersLoaded = true;
                var def = $q.defer();
                var $params = {locale: $localStorage.language, page: page};
                if(angular.isDefined($stateParams.id)){
                    $params.category_id = $stateParams.id;
                }
                    $HomeDataFactory.homeTenders($params).$promise.then(function(data){
                        if(data.results.length > 0){
                            $scope.tendersList = data.results;
                            $scope.pageSize = 10;
                            $scope.total = data.inlineCount;
                            $scope.currentPage = page+1;
                        }
                    });
                    def.resolve($scope.bidsList);
                return def;
            });

        }

        $scope.getTenders(1);


        $scope.categoriesLoaded = false;
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

        $scope.getcategories();
        
}]);