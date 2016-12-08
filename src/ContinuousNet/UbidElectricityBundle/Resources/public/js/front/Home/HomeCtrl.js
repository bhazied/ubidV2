'use strict';
app.controller('HomeCtrl', ['$scope', '$rootScope', '$localStorage', '$state', '$timeout', '$q', '$HomeDataFactory','$filter',
    function ($scope, $rootScope, $localStorage, $state, $timeout, $q, $HomeDataFactory, $filter) {

        $scope.tendersLoaded = false;
        $scope.tendersList = [];
        $scope.sectorsLoaded = false;
        $scope.sectorsList = [];
        $scope.getTenders = function (page) {
            page = page -1;
            $timeout(function () {
                $scope.tendersLoaded = true;
                var def = $q.defer();
                if($scope.tendersList.length == 0){
                    $HomeDataFactory.homeTenders({locale: $localStorage.language, page: page}).$promise.then(function(data){
                       if(data.results.length > 0){
                           $scope.tendersList = data.results;
                       }
                    });
                    def.resolve($scope.bidsList);
                }
                return def;
            });

        }

        $scope.getTenders(1);


        $scope.getBidsBySector = function (page) {
            page = page -1;
            $scope.sectorsList = [];
               $scope.sectorsLoaded = true;
                var def = $q.defer();
                $HomeDataFactory.homeSectors({
                        locale: $localStorage.language,
                        page:page
                    }).$promise.then(function (data) {
                        $timeout(function () {
                            console.log(data);
                            if(data.results.length > 0){
                                for(var i in data.results){
                                    $scope.sectorsList.push({
                                        id : data.results[i].id,
                                        name : data.results[i].name,
                                        tenderCount : data.tender_count[i]
                                    });
                                }
                                $scope.pageSize = 10;
                                $scope.total = data.inlineCount;
                                $scope.currentPage = page+1;
                                // $scope.sectorsList = data.results;
                            }
                            def.resolve($scope.sectorsList);
                        });
                    return def;
                    });

        }

        $scope.getBidsBySector(1);
}]);