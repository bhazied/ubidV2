'use strict';

/**
 * Controller for Match Form
 */

app.controller('MatchFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$galleriesDataFactory', '$showsDataFactory', '$daysDataFactory', '$teamsDataFactory', '$countriesDataFactory', '$citiesDataFactory', '$stadiaDataFactory', '$usersDataFactory', '$matchesDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $galleriesDataFactory, $showsDataFactory, $daysDataFactory, $teamsDataFactory, $countriesDataFactory, $citiesDataFactory, $stadiaDataFactory, $usersDataFactory, $matchesDataFactory) {

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


    $scope.dateTimeOpened = false;
    $scope.dateTimeToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.dateTimeOpened = !$scope.dateTimeOpened;
    };
    $scope.statuses = [{
        id: 'Draft',
        title: $filter('translate')('content.list.fields.statuses.DRAFT'),
        css: 'primary'
    }, {
        id: 'Online',
        title: $filter('translate')('content.list.fields.statuses.ONLINE'),
        css: 'success'
    }, {
        id: 'Deactivated',
        title: $filter('translate')('content.list.fields.statuses.DEACTIVATED'),
        css: 'warning'
    }, {
        id: 'Offline',
        title: $filter('translate')('content.list.fields.statuses.OFFLINE'),
        css: 'danger'
    }, {
        id: 'Deleted',
        title: $filter('translate')('content.list.fields.statuses.DELETED'),
        css: 'default'
    }, {
        id: 'Archived',
        title: $filter('translate')('content.list.fields.statuses.ARCHIVED'),
        css: 'info'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.dateTimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');
    $scope.minDate = new Date(1900, 0, 1);
    $scope.maxDate = new Date(2050, 11, 31);
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === -1));
    };
    $scope.galleries = [];
    $scope.galleriesLoaded = false;

    $scope.getGalleries = function() {
        $timeout(function(){
            $scope.galleriesLoaded = true;
            if ($scope.galleries.length == 0) {
                $scope.galleries.push({id: '', title: $filter('translate')('content.form.messages.SELECTGALLERY')});
                var def = $q.defer();
                $galleriesDataFactory.query({offset: 0, limit: 10000, 'order_by[gallery.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.galleries = data.results;
                    def.resolve($scope.galleries);
                });
                return def;
            } else {
                return $scope.galleries;
            }
        });
    };

    $scope.getGalleries();

    $scope.shows = [];
    $scope.showsLoaded = false;

    $scope.getShows = function() {
        $timeout(function(){
            $scope.showsLoaded = true;
            if ($scope.shows.length == 0) {
                $scope.shows.push({id: '', title: $filter('translate')('content.form.messages.SELECTSHOW')});
                var def = $q.defer();
                $showsDataFactory.query({offset: 0, limit: 10000, 'order_by[show.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.shows = data.results;
                    def.resolve($scope.shows);
                });
                return def;
            } else {
                return $scope.shows;
            }
        });
    };

    $scope.getShows();

    $scope.days = [];
    $scope.daysLoaded = false;

    $scope.getDays = function() {
        $timeout(function(){
            $scope.daysLoaded = true;
            if ($scope.days.length == 0) {
                $scope.days.push({id: '', title: $filter('translate')('content.form.messages.SELECTDAY')});
                var def = $q.defer();
                $daysDataFactory.query({offset: 0, limit: 10000, 'order_by[day.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.days = data.results;
                    def.resolve($scope.days);
                });
                return def;
            } else {
                return $scope.days;
            }
        });
    };

    $scope.getDays();

    $scope.teams = [];
    $scope.teamsLoaded = false;

    $scope.getTeams = function() {
        $timeout(function(){
            $scope.teamsLoaded = true;
            if ($scope.teams.length == 0) {
                $scope.teams.push({id: '', title: $filter('translate')('content.form.messages.SELECTTEAMHOME')});
                var def = $q.defer();
                $teamsDataFactory.query({offset: 0, limit: 10000, 'order_by[team.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.teams = data.results;
                    def.resolve($scope.teams);
                });
                return def;
            } else {
                return $scope.teams;
            }
        });
    };

    $scope.getTeams();

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

    $scope.changeCountry = function() {
        for (var i=0;i<$scope.cities.length;i++) {
            for (var j=0;j<$scope.countries.length;j++) {
                if ($scope.countries[j].id == $scope.match.country) {
                    if (($scope.cities[i].country != null && $scope.cities[i].country.id == $scope.countries[j].id)) {
                        $scope.cities[i].hidden = false;
                    } else {
                        $scope.cities[i].hidden = true;
                    }
                }
            }
        }
    };
    
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

    $scope.stadia = [];
    $scope.stadiaLoaded = false;

    $scope.getStadia = function() {
        $timeout(function(){
            $scope.stadiaLoaded = true;
            if ($scope.stadia.length == 0) {
                $scope.stadia.push({id: '', title: $filter('translate')('content.form.messages.SELECTSTADIUM')});
                var def = $q.defer();
                $stadiaDataFactory.query({offset: 0, limit: 10000, 'order_by[stadium.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.stadia = data.results;
                    def.resolve($scope.stadia);
                });
                return def;
            } else {
                return $scope.stadia;
            }
        });
    };

    $scope.getStadia();

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
            if ($scope.match.id > 0) {
                $scope.disableSubmit = true;
                $matchesDataFactory.update($scope.match).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MATCHUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MATCHNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $matchesDataFactory.create($scope.match).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.MATCHCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.MATCHNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.matchday.matches');
    };
    
    $scope.match_gallery_readonly = false;
    $scope.match_show_readonly = false;
    $scope.match_day_readonly = false;
    $scope.match_team_home_readonly = false;
    $scope.match_team_away_readonly = false;
    $scope.match_country_readonly = false;
    $scope.match_city_readonly = false;
    $scope.match_stadium_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $matchesDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.match = savable(data);
                if ($scope.match.date_time != null) {
                    $scope.match.date_time = new Date($scope.match.date_time);
                }
            });
        });
    } else {
        $scope.match = {id: 0, date_time: new Date(), status: 'Draft'};

        if (angular.isDefined($stateParams.match_gallery) && JSON.parse($stateParams.match_gallery) != null) {
            $scope.match.gallery = $stateParams.match_gallery;
            $scope.match_gallery_readonly = true;
        }
        if (angular.isDefined($stateParams.match_show) && JSON.parse($stateParams.match_show) != null) {
            $scope.match.show = $stateParams.match_show;
            $scope.match_show_readonly = true;
        }
        if (angular.isDefined($stateParams.match_day) && JSON.parse($stateParams.match_day) != null) {
            $scope.match.day = $stateParams.match_day;
            $scope.match_day_readonly = true;
        }
        if (angular.isDefined($stateParams.match_team_home) && JSON.parse($stateParams.match_team_home) != null) {
            $scope.match.team_home = $stateParams.match_team_home;
            $scope.match_team_home_readonly = true;
        }
        if (angular.isDefined($stateParams.match_team_away) && JSON.parse($stateParams.match_team_away) != null) {
            $scope.match.team_away = $stateParams.match_team_away;
            $scope.match_team_away_readonly = true;
        }
        if (angular.isDefined($stateParams.match_country) && JSON.parse($stateParams.match_country) != null) {
            $scope.match.country = $stateParams.match_country;
            $scope.match_country_readonly = true;
        }
        if (angular.isDefined($stateParams.match_city) && JSON.parse($stateParams.match_city) != null) {
            $scope.match.city = $stateParams.match_city;
            $scope.match_city_readonly = true;
        }
        if (angular.isDefined($stateParams.match_stadium) && JSON.parse($stateParams.match_stadium) != null) {
            $scope.match.stadium = $stateParams.match_stadium;
            $scope.match_stadium_readonly = true;
        }
    }

}]);

