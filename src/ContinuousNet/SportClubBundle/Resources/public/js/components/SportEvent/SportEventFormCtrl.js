'use strict';

/**
 * Controller for Sport Event Form
 */

app.controller('SportEventFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$sportsDataFactory', '$seasonsDataFactory', '$postTypesDataFactory', '$postCategoriesDataFactory', '$countriesDataFactory', '$usersDataFactory', '$teamsDataFactory', '$sportEventsDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $sportsDataFactory, $seasonsDataFactory, $postTypesDataFactory, $postCategoriesDataFactory, $countriesDataFactory, $usersDataFactory, $teamsDataFactory, $sportEventsDataFactory) {

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

    $scope.teamTypes = [{
        id: 'Club',
        title: $filter('translate')('content.list.fields.teamtypes.CLUB'),
        css: 'primary'
    }, {
        id: 'National',
        title: $filter('translate')('content.list.fields.teamtypes.NATIONAL'),
        css: 'success'
    }];
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

    $scope.sports = [];
    $scope.sportsLoaded = false;

    $scope.getSports = function() {
        $timeout(function(){
            $scope.sportsLoaded = true;
            if ($scope.sports.length == 0) {
                $scope.sports.push({id: '', title: $filter('translate')('content.form.messages.SELECTSPORT')});
                var def = $q.defer();
                $sportsDataFactory.query({offset: 0, limit: 10000, 'order_by[sport.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.sports = data.results;
                    def.resolve($scope.sports);
                });
                return def;
            } else {
                return $scope.sports;
            }
        });
    };

    $scope.getSports();

    $scope.seasons = [];
    $scope.seasonsLoaded = false;

    $scope.getSeasons = function() {
        $timeout(function(){
            $scope.seasonsLoaded = true;
            if ($scope.seasons.length == 0) {
                $scope.seasons.push({id: '', title: $filter('translate')('content.form.messages.SELECTSEASON')});
                var def = $q.defer();
                $seasonsDataFactory.query({offset: 0, limit: 10000, 'order_by[season.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.seasons = data.results;
                    def.resolve($scope.seasons);
                });
                return def;
            } else {
                return $scope.seasons;
            }
        });
    };

    $scope.getSeasons();

    $scope.postTypes = [];
    $scope.postTypesLoaded = false;

    $scope.getPostTypes = function() {
        $timeout(function(){
            $scope.postTypesLoaded = true;
            if ($scope.postTypes.length == 0) {
                $scope.postTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTTYPE')});
                var def = $q.defer();
                $postTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[postType.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.postTypes = data.results;
                    def.resolve($scope.postTypes);
                });
                return def;
            } else {
                return $scope.postTypes;
            }
        });
    };

    $scope.getPostTypes();

    $scope.postCategories = [];
    $scope.postCategoriesLoaded = false;

    $scope.getPostCategories = function() {
        $timeout(function(){
            $scope.postCategoriesLoaded = true;
            if ($scope.postCategories.length == 0) {
                $scope.postCategories.push({id: '', title: $filter('translate')('content.form.messages.SELECTPOSTCATEGORY')});
                var def = $q.defer();
                $postCategoriesDataFactory.query({offset: 0, limit: 10000, 'order_by[postCategory.name]': 'asc'}).$promise.then(function(data) {
                    for (var i in data.results) {
                        data.results[i].hidden = false;
                    }
                    $scope.postCategories = data.results;
                    def.resolve($scope.postCategories);
                });
                return def;
            } else {
                return $scope.postCategories;
            }
        });
    };

    $scope.getPostCategories();

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

    $scope.teams = [];
    $scope.teamsLoaded = [];

    $scope.getTeams = function() {
        $timeout(function(){
            if ($scope.teams.length == 0) {
                $scope.teams.push({});
                var def = $q.defer();
                $teamsDataFactory.query({offset: 0, limit: 10000, 'order_by[team.name]': 'asc'}).$promise.then(function(data) {
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

    $scope.sportEventTeams = false;
    $scope.$watch('sportEventTeams', function() {
        if (angular.isDefined($scope.sportEvent)) {
            if ($scope.sportEventTeams) {
                $scope.sportEvent.teams = [];
                for (var i in $scope.teams) {
                    $scope.sportEvent.teams.push($scope.teams[i].id);
                }
            } else {
                $scope.sportEvent.teams = [];
            }
        }
    });

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
            if ($scope.sportEvent.id > 0) {
                $scope.disableSubmit = true;
                $sportEventsDataFactory.update($scope.sportEvent).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SPORTEVENTUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SPORTEVENTNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $sportEventsDataFactory.create($scope.sportEvent).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.SPORTEVENTCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.SPORTEVENTNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.events.sportevents');
    };
    
    $scope.sport_event_sport_readonly = false;
    $scope.sport_event_season_readonly = false;
    $scope.sport_event_post_type_readonly = false;
    $scope.sport_event_post_category_readonly = false;
    $scope.sport_event_country_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $sportEventsDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.sportEvent = savable(data);
            });
        });
    } else {
        $scope.sportEvent = {id: 0, team_type: 'Club', status: 'Draft', teams: []};

        if (angular.isDefined($stateParams.sport_event_sport) && JSON.parse($stateParams.sport_event_sport) != null) {
            $scope.sportEvent.sport = $stateParams.sport_event_sport;
            $scope.sport_event_sport_readonly = true;
        }
        if (angular.isDefined($stateParams.sport_event_season) && JSON.parse($stateParams.sport_event_season) != null) {
            $scope.sportEvent.season = $stateParams.sport_event_season;
            $scope.sport_event_season_readonly = true;
        }
        if (angular.isDefined($stateParams.sport_event_post_type) && JSON.parse($stateParams.sport_event_post_type) != null) {
            $scope.sportEvent.post_type = $stateParams.sport_event_post_type;
            $scope.sport_event_post_type_readonly = true;
        }
        if (angular.isDefined($stateParams.sport_event_post_category) && JSON.parse($stateParams.sport_event_post_category) != null) {
            $scope.sportEvent.post_category = $stateParams.sport_event_post_category;
            $scope.sport_event_post_category_readonly = true;
        }
        if (angular.isDefined($stateParams.sport_event_country) && JSON.parse($stateParams.sport_event_country) != null) {
            $scope.sportEvent.country = $stateParams.sport_event_country;
            $scope.sport_event_country_readonly = true;
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
                    return $scope.sportEvent[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'sportevents';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.sportEvent[field] = url;
        }, function () {
            
        });
    
    };

}]);

