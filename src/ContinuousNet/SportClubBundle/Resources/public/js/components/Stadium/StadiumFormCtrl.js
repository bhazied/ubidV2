'use strict';

/**
 * Controller for Stadium Form
 */

app.controller('StadiumFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$sportEventsDataFactory', '$countriesDataFactory', '$citiesDataFactory', '$usersDataFactory', '$stadiaDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $sportEventsDataFactory, $countriesDataFactory, $citiesDataFactory, $usersDataFactory, $stadiaDataFactory) {

    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';

    $scope.disableSubmit = false;

    // Editor options.
    $scope.editorOptions = {
        language: $scope.locale,
        allowedContent: true,
        entities: false
    };

    // Called when the editor is completely ready.
    $scope.onReadyEditor = function () {
        
    };


    $scope.sportEvents = [];
    $scope.sportEventsLoaded = false;

    $scope.getSportEvents = function() {
        $timeout(function(){
            $scope.sportEventsLoaded = true;
            if ($scope.sportEvents.length == 0) {
                $scope.sportEvents.push({id: '', title: $filter('translate')('content.form.messages.SELECTSPORTEVENT')});
                var def = $q.defer();
                $sportEventsDataFactory.query({offset: 0, limit: 10000, 'order_by[sportEvent.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.sportEvents = data.results;
                    def.resolve($scope.sportEvents);
                });
                return def;
            } else {
                return $scope.sportEvents;
            }
        });
    };

    $scope.getSportEvents();

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $timeout(function(){
            $scope.countriesLoaded = true;
            if ($scope.countries.length == 0) {
                $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTCOUNTRY')});
                var def = $q.defer();
                $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
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

    $scope.getCountries();

    $scope.cities = [];
    $scope.citiesLoaded = false;

    $scope.getCities = function() {
        $timeout(function(){
            $scope.citiesLoaded = true;
            if ($scope.cities.length == 0) {
                $scope.cities.push({id: '', title: $filter('translate')('content.form.messages.SELECTCITY')});
                var def = $q.defer();
                $citiesDataFactory.query({offset: 0, limit: 10000, 'order_by[city.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.cities = data.results;
                    def.resolve($scope.cities);
                });
                return def;
            } else {
                return $scope.cities;
            }
        });
    };

    $scope.getCities();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $timeout(function(){
            $scope.usersLoaded = true;
            if ($scope.users.length == 0) {
                $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
                var def = $q.defer();
                $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.username]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.users = data.results;
                    def.resolve($scope.users);
                });
                return def;
            } else {
                return $scope.users;
            }
        });
    };

    $scope.getUsers();


    $scope.submitForm = function(form) {
        var firstError = null;
        if (form.$invalid) {
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            SweetAlert.swal($filter('translate')('content.form.messages.FORMCANNOTBESUBMITTED'), $filter('translate')('content.form.messages.ERRORSAREMARKED'), "error");
            return false;
        } else {
            if ($scope.stadium.id > 0) {
                $scope.disableSubmit = true;
                $stadiaDataFactory.update($scope.stadium).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.STADIUMUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.STADIUMNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $stadiaDataFactory.create($scope.stadium).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.STADIUMCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.STADIUMNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.events.stadia');
    };
    
    $scope.stadium_sport_event_readonly = false;
    $scope.stadium_country_readonly = false;
    $scope.stadium_city_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $stadiaDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.stadium = savable(data);
            });
        });
    } else {
        $scope.stadium = {id: 0};

        if (angular.isDefined($stateParams.stadium_sport_event) && JSON.parse($stateParams.stadium_sport_event) != null) {
            $scope.stadium.sport_event = $stateParams.stadium_sport_event;
            $scope.stadium_sport_event_readonly = true;
        }
        if (angular.isDefined($stateParams.stadium_country) && JSON.parse($stateParams.stadium_country) != null) {
            $scope.stadium.country = $stateParams.stadium_country;
            $scope.stadium_country_readonly = true;
        }
        if (angular.isDefined($stateParams.stadium_city) && JSON.parse($stateParams.stadium_city) != null) {
            $scope.stadium.city = $stateParams.stadium_city;
            $scope.stadium_city_readonly = true;
        }
    }

    $scope.showFileManager = function(field) {
    
        var modalInstance = $uibModal.open({
            templateUrl: '/bundles/sportclub/js/common/FileManager/modal_content.html',
            controller: 'FileManagerCtrl',
            size: 'lg',
            resolve: {
                field: function() {
                    return field;
                },
                value: function() {
                    return $scope.stadium[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'stadia';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.stadium[field] = url;
        }, function () {
            
        });
    
    };

}]);

