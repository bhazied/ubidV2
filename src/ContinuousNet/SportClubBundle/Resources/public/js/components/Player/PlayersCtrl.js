'use strict';

/**
 * Controller for Players List
 */

app.controller('PlayersCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$countriesDataFactory', '$teamsDataFactory', '$usersDataFactory', '$playersDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $countriesDataFactory, $teamsDataFactory, $usersDataFactory, $playersDataFactory) {

    $scope.positionsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
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
    $scope.writingHandsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Right',
        title: $filter('translate')('content.list.fields.writinghands.RIGHT'),
        css: 'primary'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.writinghands.LEFT'),
        css: 'success'
    }];
    $scope.strongerFootsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Right',
        title: $filter('translate')('content.list.fields.strongerfoots.RIGHT'),
        css: 'primary'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.strongerfoots.LEFT'),
        css: 'success'
    }];
    $scope.maritalStatusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'Single',
        title: $filter('translate')('content.list.fields.maritalstatuses.SINGLE'),
        css: 'primary'
    }, {
        id: 'Married',
        title: $filter('translate')('content.list.fields.maritalstatuses.MARRIED'),
        css: 'success'
    }];
    $scope.statusesOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
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

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.countries = [];
    $scope.countriesLoaded = false;

    $scope.getCountries = function() {
        $scope.countriesLoaded = true;
        if ($scope.countries.length == 0) {
            $scope.countries.push({id: '', title: $filter('translate')('content.form.messages.SELECTBIRTHCOUNTRY')});
            var def = $q.defer();
            $countriesDataFactory.query({offset: 0, limit: 10000, 'order_by[country.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.countries.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.countries);
                    }
                });
            });
            return def;
        } else {
            return $scope.countries;
        }
    };

    $scope.getCountries();

    $scope.teams = [];
    $scope.teamsLoaded = false;

    $scope.getTeams = function() {
        $scope.teamsLoaded = true;
        if ($scope.teams.length == 0) {
            $scope.teams.push({id: '', title: $filter('translate')('content.form.messages.SELECTTEAMCLUB')});
            var def = $q.defer();
            $teamsDataFactory.query({offset: 0, limit: 10000, 'order_by[team.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.teams.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.teams);
                    }
                });
            });
            return def;
        } else {
            return $scope.teams;
        }
    };

    $scope.getTeams();

    $scope.users = [];
    $scope.usersLoaded = false;

    $scope.getUsers = function() {
        $scope.usersLoaded = true;
        if ($scope.users.length == 0) {
            $scope.users.push({id: '', title: $filter('translate')('content.form.messages.SELECTCREATORUSER')});
            var def = $q.defer();
            $usersDataFactory.query({offset: 0, limit: 10000, 'filters[user.type]': 'Administrator', 'order_by[user.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.users.push({
                                id: data.results[i].id,
                                title: data.results[i].username
                            });
                        }
                        def.resolve($scope.users);
                    }
                });
            });
            return def;
        } else {
            return $scope.users;
        }
    };

    $scope.getUsers();


    $scope.textValue = function($scope, row) {
        return $scope.$eval('row.' + this.field);
    };

    $scope.trusted = {};

    $scope.linkValue = function($scope, row) {
        var value = row[this.field];
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var html = '<a ui-sref="'+this.state+'({id: ' + value.id + '})">';
        var displayFields = this.displayField.split(' ');
        for (var i in displayFields) {
            html += value[displayFields[i]] + ' ';
        }
        html += '</a>';
        return $scope.trusted[html] || ($scope.trusted[html] = $sce.trustAsHtml(html));
    };

    $scope.evaluatedValue = function($scope, row) {
        var value = $scope.$eval('row.' + this.field, {row: row});
        if (value == null || typeof value == 'undefined') {
            return '';
        }
        var evaluatedValue = $scope.$eval('\'' + value + '\' | ' + this.valueFormatter);
        if (this.field == 'birth_date') {
            evaluatedValue += ' ('+$scope.$eval('\'' + value + '\' | age')+')';
        }
        return evaluatedValue;
    };

    $scope.interpolatedValue = function($scope, row) {
        return this.interpolateExpr({
            row: row,
            positions: $scope.positionsOptions,
            writingHands: $scope.writingHandsOptions,
            strongerFoots: $scope.strongerFootsOptions,
            maritalStatuses: $scope.maritalStatusesOptions,
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.playersParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.playersParams)) {
           $localStorage.playersParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.playersParams[param]) && $localStorage.playersParams[param] != null) {
            return $localStorage.playersParams[param];
        } else {
            $localStorage.playersParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'player.id', filter: { 'player.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'player.ordering', filter: { 'player.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', true), getValue: $scope.textValue },
            { field: 'position', title: $filter('translate')('content.list.fields.POSITION'), sortable: 'player.position', filter: { 'player.position': 'select' }, show: $scope.getParamValue('position_show_filed', true), getValue: $scope.interpolatedValue, filterData : $scope.positionsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.position ]]" my-enum-list=\'[[ positions ]]\'></span>') },
            { field: 'name', title: $filter('translate')('content.list.fields.NAME'), sortable: 'player.name', filter: { 'player.name': 'text' }, show: $scope.getParamValue('name_show_filed', true), getValue: $scope.textValue },
            { field: 'name_ar', title: $filter('translate')('content.list.fields.NAMEAR'), sortable: 'player.nameAr', filter: { 'player.nameAr': 'text' }, show: $scope.getParamValue('name_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'name_fr', title: $filter('translate')('content.list.fields.NAMEFR'), sortable: 'player.nameFr', filter: { 'player.nameFr': 'text' }, show: $scope.getParamValue('name_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'player.picture', filter: { 'player.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', true), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'first_name', title: $filter('translate')('content.list.fields.FIRSTNAME'), sortable: 'player.firstName', filter: { 'player.firstName': 'text' }, show: $scope.getParamValue('first_name_show_filed', false), getValue: $scope.textValue },
            { field: 'first_name_ar', title: $filter('translate')('content.list.fields.FIRSTNAMEAR'), sortable: 'player.firstNameAr', filter: { 'player.firstNameAr': 'text' }, show: $scope.getParamValue('first_name_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'first_name_fr', title: $filter('translate')('content.list.fields.FIRSTNAMEFR'), sortable: 'player.firstNameFr', filter: { 'player.firstNameFr': 'text' }, show: $scope.getParamValue('first_name_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'last_name', title: $filter('translate')('content.list.fields.LASTNAME'), sortable: 'player.lastName', filter: { 'player.lastName': 'text' }, show: $scope.getParamValue('last_name_show_filed', false), getValue: $scope.textValue },
            { field: 'last_name_ar', title: $filter('translate')('content.list.fields.LASTNAMEAR'), sortable: 'player.lastNameAr', filter: { 'player.lastNameAr': 'text' }, show: $scope.getParamValue('last_name_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'last_name_fr', title: $filter('translate')('content.list.fields.LASTNAMEFR'), sortable: 'player.lastNameFr', filter: { 'player.lastNameFr': 'text' }, show: $scope.getParamValue('last_name_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'birth_date', title: $filter('translate')('content.list.fields.BIRTHDATE'), sortable: 'player.birthDate', filter: { 'player.birthDate': 'text' }, show: $scope.getParamValue('birth_date_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'birth_place', title: $filter('translate')('content.list.fields.BIRTHPLACE'), sortable: 'player.birthPlace', filter: { 'player.birthPlace': 'text' }, show: $scope.getParamValue('birth_place_show_filed', false), getValue: $scope.textValue },
            { field: 'birth_place_ar', title: $filter('translate')('content.list.fields.BIRTHPLACEAR'), sortable: 'player.birthPlaceAr', filter: { 'player.birthPlaceAr': 'text' }, show: $scope.getParamValue('birth_place_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'birth_place_fr', title: $filter('translate')('content.list.fields.BIRTHPLACEFR'), sortable: 'player.birthPlaceFr', filter: { 'player.birthPlaceFr': 'text' }, show: $scope.getParamValue('birth_place_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'birth_country', title: $filter('translate')('content.list.fields.BIRTHCOUNTRY'), sortable: 'birth_country.name', filter: { 'player.birthCountry': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('birth_country_id_show_filed', false), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'nationality_country', title: $filter('translate')('content.list.fields.NATIONALITYCOUNTRY'), sortable: 'nationality_country.name', filter: { 'player.nationalityCountry': 'select' }, getValue: $scope.linkValue, filterData: $scope.getCountries(), show: $scope.getParamValue('nationality_country_id_show_filed', false), displayField: 'name', state: 'app.settings.countriesdetails' },
            { field: 'height', title: $filter('translate')('content.list.fields.HEIGHT'), sortable: 'player.height', filter: { 'player.height': 'number' }, show: $scope.getParamValue('height_show_filed', false), getValue: $scope.textValue },
            { field: 'weight', title: $filter('translate')('content.list.fields.WEIGHT'), sortable: 'player.weight', filter: { 'player.weight': 'number' }, show: $scope.getParamValue('weight_show_filed', false), getValue: $scope.textValue },
            { field: 'shoe_size', title: $filter('translate')('content.list.fields.SHOESIZE'), sortable: 'player.shoeSize', filter: { 'player.shoeSize': 'number' }, show: $scope.getParamValue('shoe_size_show_filed', false), getValue: $scope.textValue },
            { field: 'writing_hand', title: $filter('translate')('content.list.fields.WRITINGHAND'), sortable: 'player.writingHand', filter: { 'player.writingHand': 'select' }, show: $scope.getParamValue('writing_hand_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.writingHandsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.writing_hand ]]" my-enum-list=\'[[ writingHands ]]\'></span>') },
            { field: 'stronger_foot', title: $filter('translate')('content.list.fields.STRONGERFOOT'), sortable: 'player.strongerFoot', filter: { 'player.strongerFoot': 'select' }, show: $scope.getParamValue('stronger_foot_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.strongerFootsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.stronger_foot ]]" my-enum-list=\'[[ strongerFoots ]]\'></span>') },
            { field: 'marital_status', title: $filter('translate')('content.list.fields.MARITALSTATUS'), sortable: 'player.maritalStatus', filter: { 'player.maritalStatus': 'select' }, show: $scope.getParamValue('marital_status_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.maritalStatusesOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.marital_status ]]" my-enum-list=\'[[ maritalStatuses ]]\'></span>') },
            { field: 'wives_names', title: $filter('translate')('content.list.fields.WIVESNAMES'), sortable: 'player.wivesNames', filter: { 'player.wivesNames': 'text' }, show: $scope.getParamValue('wives_names_show_filed', false), getValue: $scope.textValue },
            { field: 'sons_names', title: $filter('translate')('content.list.fields.SONSNAMES'), sortable: 'player.sonsNames', filter: { 'player.sonsNames': 'text' }, show: $scope.getParamValue('sons_names_show_filed', false), getValue: $scope.textValue },
            { field: 'daughters_names', title: $filter('translate')('content.list.fields.DAUGHTERSNAMES'), sortable: 'player.daughtersNames', filter: { 'player.daughtersNames': 'text' }, show: $scope.getParamValue('daughters_names_show_filed', false), getValue: $scope.textValue },
            { field: 'father_name', title: $filter('translate')('content.list.fields.FATHERNAME'), sortable: 'player.fatherName', filter: { 'player.fatherName': 'text' }, show: $scope.getParamValue('father_name_show_filed', false), getValue: $scope.textValue },
            { field: 'mother_name', title: $filter('translate')('content.list.fields.MOTHERNAME'), sortable: 'player.motherName', filter: { 'player.motherName': 'text' }, show: $scope.getParamValue('mother_name_show_filed', false), getValue: $scope.textValue },
            { field: 'brothers_names', title: $filter('translate')('content.list.fields.BROTHERSNAMES'), sortable: 'player.brothersNames', filter: { 'player.brothersNames': 'text' }, show: $scope.getParamValue('brothers_names_show_filed', false), getValue: $scope.textValue },
            { field: 'sisters_names', title: $filter('translate')('content.list.fields.SISTERSNAMES'), sortable: 'player.sistersNames', filter: { 'player.sistersNames': 'text' }, show: $scope.getParamValue('sisters_names_show_filed', false), getValue: $scope.textValue },
            { field: 'education', title: $filter('translate')('content.list.fields.EDUCATION'), sortable: 'player.education', filter: { 'player.education': 'text' }, show: $scope.getParamValue('education_show_filed', false), getValue: $scope.textValue },
            { field: 'personal_attributes', title: $filter('translate')('content.list.fields.PERSONALATTRIBUTES'), sortable: 'player.personalAttributes', filter: { 'player.personalAttributes': 'text' }, show: $scope.getParamValue('personal_attributes_show_filed', false), getValue: $scope.textValue },
            { field: 'hobbies', title: $filter('translate')('content.list.fields.HOBBIES'), sortable: 'player.hobbies', filter: { 'player.hobbies': 'text' }, show: $scope.getParamValue('hobbies_show_filed', false), getValue: $scope.textValue },
            { field: 'favourite_food', title: $filter('translate')('content.list.fields.FAVOURITEFOOD'), sortable: 'player.favouriteFood', filter: { 'player.favouriteFood': 'text' }, show: $scope.getParamValue('favourite_food_show_filed', false), getValue: $scope.textValue },
            { field: 'favourite_drink', title: $filter('translate')('content.list.fields.FAVOURITEDRINK'), sortable: 'player.favouriteDrink', filter: { 'player.favouriteDrink': 'text' }, show: $scope.getParamValue('favourite_drink_show_filed', false), getValue: $scope.textValue },
            { field: 'first_replica_kit', title: $filter('translate')('content.list.fields.FIRSTREPLICAKIT'), sortable: 'player.firstReplicaKit', filter: { 'player.firstReplicaKit': 'text' }, show: $scope.getParamValue('first_replica_kit_show_filed', false), getValue: $scope.textValue },
            { field: 'tv_show_rarely_miss', title: $filter('translate')('content.list.fields.TVSHOWRARELYMISS'), sortable: 'player.tvShowRarelyMiss', filter: { 'player.tvShowRarelyMiss': 'text' }, show: $scope.getParamValue('tv_show_rarely_miss_show_filed', false), getValue: $scope.textValue },
            { field: 'team_club', title: $filter('translate')('content.list.fields.TEAMCLUB'), sortable: 'team_club.name', filter: { 'player.teamClub': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_club_show_filed', false), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'team_club_number', title: $filter('translate')('content.list.fields.TEAMCLUBNUMBER'), sortable: 'player.teamClubNumber', filter: { 'player.teamClubNumber': 'number' }, show: $scope.getParamValue('team_club_number_show_filed', false), getValue: $scope.textValue },
            { field: 'team_national', title: $filter('translate')('content.list.fields.TEAMNATIONAL'), sortable: 'team_national.name', filter: { 'player.teamNational': 'select' }, getValue: $scope.linkValue, filterData: $scope.getTeams(), show: $scope.getParamValue('team_id_national_show_filed', false), displayField: 'name', state: 'app.events.teamsdetails' },
            { field: 'team_national_number', title: $filter('translate')('content.list.fields.TEAMNATIONALNUMBER'), sortable: 'player.teamNationalNumber', filter: { 'player.teamNationalNumber': 'number' }, show: $scope.getParamValue('team_national_number_show_filed', false), getValue: $scope.textValue },
            { field: 'personal_biography', title: $filter('translate')('content.list.fields.PERSONALBIOGRAPHY'), sortable: 'player.personalBiography', filter: { 'player.personalBiography': 'text' }, show: $scope.getParamValue('personal_biography_show_filed', false), getValue: $scope.textValue },
            { field: 'technical_profile', title: $filter('translate')('content.list.fields.TECHNICALPROFILE'), sortable: 'player.technicalProfile', filter: { 'player.technicalProfile': 'text' }, show: $scope.getParamValue('technical_profile_show_filed', false), getValue: $scope.textValue },
            { field: 'facebook', title: $filter('translate')('content.list.fields.FACEBOOK'), sortable: 'player.facebook', filter: { 'player.facebook': 'text' }, show: $scope.getParamValue('facebook_show_filed', false), getValue: $scope.textValue },
            { field: 'twitter', title: $filter('translate')('content.list.fields.TWITTER'), sortable: 'player.twitter', filter: { 'player.twitter': 'text' }, show: $scope.getParamValue('twitter_show_filed', false), getValue: $scope.textValue },
            { field: 'website', title: $filter('translate')('content.list.fields.WEBSITE'), sortable: 'player.website', filter: { 'player.website': 'text' }, show: $scope.getParamValue('website_show_filed', false), getValue: $scope.textValue },
            { field: 'eurosport', title: $filter('translate')('content.list.fields.EUROSPORT'), sortable: 'player.eurosport', filter: { 'player.eurosport': 'text' }, show: $scope.getParamValue('eurosport_show_filed', false), getValue: $scope.textValue },
            { field: 'lequipe', title: $filter('translate')('content.list.fields.LEQUIPE'), sortable: 'player.lequipe', filter: { 'player.lequipe': 'text' }, show: $scope.getParamValue('lequipe_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'player.createdAt', filter: { 'player.createdAt': 'text' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'player.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'player.modifiedAt', filter: { 'player.modifiedAt': 'text' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'player.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { title: $filter('translate')('content.common.ACTIONS'), show: true, getValue: $scope.interpolatedValue, interpolateExpr: $interpolate(''
            +'<div class="btn-group pull-right">'
            +'<button type="button" class="btn btn-success" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.EDIT')+'" ng-click="edit(row)"><i class="ti-pencil-alt"></i></button>'
            +'<button type="button" class="btn btn-warning" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.SHOWDETAILS')+'" ng-click="details(row)"><i class="ti-clipboard"></i></button>'
            +'<button type="button" class="btn btn-danger" tooltip-placement="top" uib-tooltip="'+$filter('translate')('content.common.REMOVE')+'" ng-click="delete(row)"><i class="ti-trash"></i></button>'
            +'</div>') }
        ];
    };

    $scope.setCols();

    $scope.$on('languageChange', function(event, locale) {
        $timeout(function(){;
            $scope.setCols();
        }, 500);
    });

    $scope.isFiltersVisible = $scope.getParamValue('playersIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('playersIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('playersPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('playersCount', $scope.count);
    $scope.sorting = {'player.name': 'asc'};
    $scope.sorting = $scope.getParamValue('playersSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('playersFilter', $scope.filter);
    $scope.setParamValue('playersPage', $scope.page);
    $scope.setParamValue('playersCount', $scope.count);
    $scope.setParamValue('playersSorting', $scope.sorting);
    $scope.setParamValue('playersFilter', $scope.filter);
    $scope.tableParams = {
        page: $scope.page,
        count: $scope.count,
        sorting: $scope.sorting,
        filter: $scope.filter
    };
    $scope.tableParams = new ngTableParams($scope.tableParams, {
        getData: function ($defer, params) {
            var current = params.page();
            var offset = (current - 1) * params.count();
            var limit = params.count();
            var order_by = params.sorting();
            var filters = params.filter();
            $scope.setParamValue('playersIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('playersPage', current);
            $scope.setParamValue('playersCount', limit);
            $scope.setParamValue('playersSorting', order_by);
            $scope.setParamValue('playersFilter', filters);
            var http_params = {
                offset: offset,
                limit: limit
            };
            for (var field in order_by) {
                http_params['order_by['+field+']'] = order_by[field];
            }
            if (filters.length > 0) {
                http_params.offset = 0;
            }
            for (var field in filters) {
                if (filters[field] != null || filters[field] != '') {
                    http_params['filters['+field+']'] = filters[field];
                }
            }
            $scope.isLoading = true;
            return $playersDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERPLAYER'),
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: $filter('translate')('content.common.YESDELETE'),
            cancelButtonText: $filter('translate')('content.common.NOCANCEL'),
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
            if (isConfirm) {
                $playersDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.PLAYERDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.PLAYERNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.PLAYERNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.events.playersnew');
    };

    $scope.edit = function(row) {
        $state.go('app.events.playersedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.events.playersdetails', {id: row.id});
    };
}]);

