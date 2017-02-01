'use strict';

/**
 * Controller for User Settings List
 */

app.controller('MyAlertSettingsCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$usersDataFactory', '$userSettingsDataFactory','$controller',
    function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $usersDataFactory, $userSettingsDataFactory, $controller) {

        $timeout(function() {
            $rootScope.showSlogan = false;
            $rootScope.showLeftSide = false;
            $rootScope.showRightSide = false;
            $rootScope.showUserMenu = true;
            $rootScope.contentSize = 10;
            $rootScope.contentOffset = 0;
        });

        $scope.userAlertSettings = [];
        angular.extend(this, $controller('UserSettingsCtrl', {$scope:$scope}));

        $scope.initSettings = [
            {
                key: 'BEED_SHORLISTED',
                Label: $filter('translate')('front.settings.BEEDSHORLISTED'),
                value: false,
                id: 0
            },
            {
                key: 'RECEIVED_NEW_BID',
                Label: $filter('translate')('front.settings.RECEIVEDNEWBID'),
                value: false,
                id: 0
            },
            {
                key: 'RECEIVED_NEW_MESSAGE',
                Label: $filter('translate')('front.settings.RECEIVEDNEWMESSAGE'),
                value: false,
                id: 0
            },
            {
                key: 'CONSULT_YOUR_OPPORTUNITY',
                Label: $filter('translate')('front.settings.CONSULTYOUROPPOTUNITY'),
                value: false
            },{
                key: 'CONSULT_YOUR_PROFILE',
                Label: $filter('translate')('front.settings.CONSULTYOURPROFILE'),
                value: false,
                id: 0
            }

        ];

        $scope.settings = [];
        $scope.alertSettings = [];
        $scope.settingsLoaded = false;

        $scope.getSettings = function(){
            if($scope.alertSettings.length  == 0){
                $scope.settingsLoaded = true;
                var def = $q.defer();
                $userSettingsDataFactory.query({offset: 0, limit: 10000}).$promise.then(function(data) {
                    $timeout(function () {
                        if(data.results.length > 0){
                            $scope.alertSettings = data.results;
                        }
                        def.resolve($scope.alertSettings);
                    });
                });
                return def;
            }
            else{
                return $scope.alertSettings;
            }
        }

        $scope.getSettings();

        $scope.$watch('alertSettings', function () {
            $scope.settings = [];
            if($scope.alertSettings.length > 0){
                angular.forEach($scope.initSettings, function (value, key) {
                    var val = value.value;
                    var id = 0;
                    angular.forEach($scope.alertSettings, function (sValue, sKey) {
                        if(value.key == sValue.key){
                          id = sValue.id;
                            val =  (sValue.value == 'ON') ? true : false;
                        }
                    });
                    $scope['userAlertSettings'][value.key] = val;
                    $scope.settings.push({
                        key: value.key,
                        Label: value.Label,
                        id: id,
                        value: val
                    });
                });
            }
            else{
                $scope.settings = $scope.initSettings;
            }
            console.log($scope.settings);
        }, true);

        $scope.submitForm = function (form) {
            $scope.disableSubmit = true;
            console.log($scope.userAlertSettings);
            var setting = {};
            angular.forEach($scope.settings, function (value, key) {
                console.log(value);
                if( angular.isDefined($scope.userAlertSettings[value.key])){
                    var val = ($scope.userAlertSettings[value.key] == true) ? "ON" : "OFF";
                    if(value.id == 0){
                        setting = {
                            key : value.key,
                            value: val
                        };
                        console.log(setting);
                        $userSettingsDataFactory.create(setting).$promise.then(function(data) {
                            value.id = data.id;
                        });
                    }
                    else if(value.id >  0){
                        setting = {
                            key : value.key,
                            value: val,
                            id: value.id
                        };
                        console.log(setting);
                        $userSettingsDataFactory.update(setting).$promise.then(function(data) {
                            value.id = data.id;
                        });
                    }
                }
            });
            $scope.disableSubmit = false;
        }
    }]);

