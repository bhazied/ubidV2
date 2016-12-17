'use strict';

/**
 * Controller for Player Form
 */

app.controller('PlayerFormCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$uibModal', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', 'savable', '$countriesDataFactory', '$teamsDataFactory', '$usersDataFactory', '$playersDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $uibModal, $q, $interpolate, $localStorage, toaster, SweetAlert, savable, $countriesDataFactory, $teamsDataFactory, $usersDataFactory, $playersDataFactory) {

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

    $scope.positions = [{
        id: 'Forward',
        title: $filter('translate')('content.list.fields.positions.FORWARD'),
        css: 'primary'
    }, {
        id: 'Midfielder',
        title: $filter('translate')('content.list.fields.positions.MIDFIELDER'),
        css: 'success'
    }, {
        id: 'Defender',
        title: $filter('translate')('content.list.fields.positions.DEFENDER'),
        css: 'warning'
    }, {
        id: 'GoalKeeper',
        title: $filter('translate')('content.list.fields.positions.GOALKEEPER'),
        css: 'danger'
    }];

    $scope.birthDateOpened = false;
    $scope.birthDateToggle = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.birthDateOpened = !$scope.birthDateOpened;
    };
    $scope.writingHands = [{
        id: 'Right',
        title: $filter('translate')('content.list.fields.writinghands.RIGHT'),
        css: 'primary'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.writinghands.LEFT'),
        css: 'success'
    }];
    $scope.strongerFoots = [{
        id: 'Right',
        title: $filter('translate')('content.list.fields.strongerfoots.RIGHT'),
        css: 'primary'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.strongerfoots.LEFT'),
        css: 'success'
    }];
    $scope.maritalStatuses = [{
        id: 'Single',
        title: $filter('translate')('content.list.fields.maritalstatuses.SINGLE'),
        css: 'primary'
    }, {
        id: 'Married',
        title: $filter('translate')('content.list.fields.maritalstatuses.MARRIED'),
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
    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $timeout(function(){
            $scope.countriesLoaded = true;
            if ($scope.countries.length == 0) {
                $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTBIRTHCOUNTRY')});
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

    $scope.teams = [];
    $scope.teamsLoaded = false;

    $scope.getTeams = function() {
        $timeout(function(){
            $scope.teamsLoaded = true;
            if ($scope.teams.length == 0) {
                $scope.teams.push({id: '', title: $filter('translate')('content.form.messages.SELECTTEAMCLUB')});
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
            if ($scope.player.id > 0) {
                $scope.disableSubmit = true;
                $playersDataFactory.update($scope.player).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PLAYERUPDATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PLAYERNOTUPDATED'));
                    console.warn(error);
                });
            } else {
                $scope.disableSubmit = true;
                $playersDataFactory.create($scope.player).$promise.then(function(data) {
                    $scope.disableSubmit = false;
                    toaster.pop('success', $filter('translate')('content.common.NOTIFICATION'), $filter('translate')('content.list.PLAYERCREATED'));
                    $scope.list();
                }, function(error) {
                    $scope.disableSubmit = false;
                    toaster.pop('error', $filter('translate')('content.common.ERROR'), $filter('translate')('content.list.PLAYERNOTCREATED'));
                    console.warn(error);
                });
            }
            return false;
        }
    };

    $scope.list = function() {
        $state.go('app.events.players');
    };
    
    $scope.player_birth_country_readonly = false;
    $scope.player_nationality_country_readonly = false;
    $scope.player_team_club_readonly = false;
    $scope.player_team_national_readonly = false;
    if (angular.isDefined($stateParams.id)) {
        $playersDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $timeout(function(){
                $scope.player = savable(data);
                if ($scope.player.birth_date != null) {
                    $scope.player.birth_date = new Date($scope.player.birth_date);
                }
            });
        });
    } else {
        $scope.player = {id: 0, position: 'Forward', writing_hand: 'Right', stronger_foot: 'Right', marital_status: 'Single', status: 'Draft'};

        if (angular.isDefined($stateParams.player_birth_country) && JSON.parse($stateParams.player_birth_country) != null) {
            $scope.player.birth_country = $stateParams.player_birth_country;
            $scope.player_birth_country_readonly = true;
        }
        if (angular.isDefined($stateParams.player_nationality_country) && JSON.parse($stateParams.player_nationality_country) != null) {
            $scope.player.nationality_country = $stateParams.player_nationality_country;
            $scope.player_nationality_country_readonly = true;
        }
        if (angular.isDefined($stateParams.player_team_club) && JSON.parse($stateParams.player_team_club) != null) {
            $scope.player.team_club = $stateParams.player_team_club;
            $scope.player_team_club_readonly = true;
        }
        if (angular.isDefined($stateParams.player_team_national) && JSON.parse($stateParams.player_team_national) != null) {
            $scope.player.team_national = $stateParams.player_team_national;
            $scope.player_team_national_readonly = true;
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
                    return $scope.player[field];
                },
                instance: function() {
                    return 'default';
                },
                folder: function() {
                    return 'players';
                }
            }
        });

        modalInstance.result.then(function (url) {
            $scope.player[field] = url;
        }, function () {
            
        });
    
    };

}]);

