'use strict';

/**
 * Controller for Quizzes List
 */

app.controller('QuizzesCtrl', ['$scope', '$rootScope', '$stateParams', '$location', '$sce', '$timeout', '$filter', 'ngTableParams', '$state', '$q', '$interpolate', '$localStorage', 'toaster', 'SweetAlert', '$quizTypesDataFactory', '$usersDataFactory', '$quizzesDataFactory',
function($scope, $rootScope, $stateParams, $location, $sce, $timeout, $filter, ngTableParams, $state, $q, $interpolate, $localStorage, toaster, SweetAlert, $quizTypesDataFactory, $usersDataFactory, $quizzesDataFactory) {

    $scope.kindsOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
    }, {
        id: 'SingleChoice',
        title: $filter('translate')('content.list.fields.kinds.SINGLECHOICE'),
        css: 'primary'
    }, {
        id: 'MultipleChoice',
        title: $filter('translate')('content.list.fields.kinds.MULTIPLECHOICE'),
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

    $scope.booleanOptions = [{
        id: '',
        title: $filter('translate')('content.common.ALL'),
        css: ''
     }, {
        id: '1',
        title: $filter('translate')('content.common.YES'),
        css: 'success'
     }, {
        id: '0',
        title: $filter('translate')('content.common.NO'),
        css: 'danger'
    }];

    $scope.isLoading = false;
    $scope.locale = (angular.isDefined($localStorage.language))?$localStorage.language:'en';
    $scope.showFieldsMenu = false;

    $scope.quizTypes = [];
    $scope.quizTypesLoaded = false;

    $scope.getQuizTypes = function() {
        $scope.quizTypesLoaded = true;
        if ($scope.quizTypes.length == 0) {
            $scope.quizTypes.push({id: '', title: $filter('translate')('content.form.messages.SELECTQUIZTYPE')});
            var def = $q.defer();
            $quizTypesDataFactory.query({offset: 0, limit: 10000, 'order_by[quizType.id]': 'desc'}).$promise.then(function(data) {
                $timeout(function(){
                    if (data.results.length > 0) {
                        for (var i in data.results) {
                            $scope.quizTypes.push({
                                id: data.results[i].id,
                                title: data.results[i].name
                            });
                        }
                        def.resolve($scope.quizTypes);
                    }
                });
            });
            return def;
        } else {
            return $scope.quizTypes;
        }
    };

    $scope.getQuizTypes();

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
            kinds: $scope.kindsOptions,
            statuses: $scope.statusesOptions,
            field: this.field,
            title: this.title,
            sortable: this.sortable,
            filter: this.filter,
            show: this.show
        });
    };

    $scope.setParamValue = function(param, newValue) {
        $localStorage.quizzesParams[param] = newValue;
        $stateParams[param] = newValue;
        $location.search(param, JSON.stringify(newValue));
    };

    $scope.getParamValue = function(param, defaultValue) {
        if (!angular.isDefined($localStorage.quizzesParams)) {
           $localStorage.quizzesParams = {};
        }
        if (angular.isDefined($stateParams[param]) && JSON.parse($stateParams[param]) != null) {
            return JSON.parse($stateParams[param]);
        } else if (angular.isDefined($location.search()[param]) && JSON.parse($location.search()[param]) != null) {
            return JSON.parse($location.search()[param]);
        } else if (angular.isDefined($localStorage.quizzesParams[param]) && $localStorage.quizzesParams[param] != null) {
            return $localStorage.quizzesParams[param];
        } else {
            $localStorage.quizzesParams[param] = defaultValue;
            return defaultValue;
        }
    };

    $scope.setCols = function() {
        $scope.cols = [
            { field: 'id', title: $filter('translate')('content.list.fields.ID'), sortable: 'quiz.id', filter: { 'quiz.id': 'number' }, show: $scope.getParamValue('id_show_filed', true), getValue: $scope.textValue },
            { field: 'quiz_type', title: $filter('translate')('content.list.fields.QUIZTYPE'), sortable: 'quiz_type.name', filter: { 'quiz.quizType': 'select' }, getValue: $scope.linkValue, filterData: $scope.getQuizTypes(), show: $scope.getParamValue('quiz_type_id_show_filed', true), displayField: 'name', state: 'app.quizzesmanager.quiztypesdetails' },
            { field: 'title', title: $filter('translate')('content.list.fields.TITLE'), sortable: 'quiz.title', filter: { 'quiz.title': 'text' }, show: $scope.getParamValue('title_show_filed', true), getValue: $scope.textValue },
            { field: 'title_ar', title: $filter('translate')('content.list.fields.TITLEAR'), sortable: 'quiz.titleAr', filter: { 'quiz.titleAr': 'text' }, show: $scope.getParamValue('title_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'title_fr', title: $filter('translate')('content.list.fields.TITLEFR'), sortable: 'quiz.titleFr', filter: { 'quiz.titleFr': 'text' }, show: $scope.getParamValue('title_fr_show_filed', true), getValue: $scope.textValue },
            { field: 'slug', title: $filter('translate')('content.list.fields.SLUG'), sortable: 'quiz.slug', filter: { 'quiz.slug': 'text' }, show: $scope.getParamValue('slug_show_filed', false), getValue: $scope.textValue },
            { field: 'slug_ar', title: $filter('translate')('content.list.fields.SLUGAR'), sortable: 'quiz.slugAr', filter: { 'quiz.slugAr': 'text' }, show: $scope.getParamValue('slug_ar_show_filed', true), getValue: $scope.textValue },
            { field: 'slug_fr', title: $filter('translate')('content.list.fields.SLUGFR'), sortable: 'quiz.slugFr', filter: { 'quiz.slugFr': 'text' }, show: $scope.getParamValue('slug_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'picture', title: $filter('translate')('content.list.fields.PICTURE'), sortable: 'quiz.picture', filter: { 'quiz.picture': 'text' }, show: $scope.getParamValue('picture_show_filed', false), getValue: $scope.interpolatedValue, interpolateExpr: $interpolate('<img ng-src="'+$rootScope.app.thumbURL+'[[ (row.picture)?row.picture:\'/assets/images/picturenotavailable.'+$scope.locale+'.png\' ]]" alt="" class="img-thumbnail" />') },
            { field: 'description', title: $filter('translate')('content.list.fields.DESCRIPTION'), sortable: 'quiz.description', filter: { 'quiz.description': 'text' }, show: $scope.getParamValue('description_show_filed', false), getValue: $scope.textValue },
            { field: 'description_ar', title: $filter('translate')('content.list.fields.DESCRIPTIONAR'), sortable: 'quiz.descriptionAr', filter: { 'quiz.descriptionAr': 'text' }, show: $scope.getParamValue('description_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'description_fr', title: $filter('translate')('content.list.fields.DESCRIPTIONFR'), sortable: 'quiz.descriptionFr', filter: { 'quiz.descriptionFr': 'text' }, show: $scope.getParamValue('description_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'kind', title: $filter('translate')('content.list.fields.KIND'), sortable: 'quiz.kind', filter: { 'quiz.kind': 'select' }, show: $scope.getParamValue('kind_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.kindsOptions, interpolateExpr: $interpolate('<span my-enum="[[ row.kind ]]" my-enum-list=\'[[ kinds ]]\'></span>') },
            { field: 'question', title: $filter('translate')('content.list.fields.QUESTION'), sortable: 'quiz.question', filter: { 'quiz.question': 'text' }, show: $scope.getParamValue('question_show_filed', false), getValue: $scope.textValue },
            { field: 'question_ar', title: $filter('translate')('content.list.fields.QUESTIONAR'), sortable: 'quiz.questionAr', filter: { 'quiz.questionAr': 'text' }, show: $scope.getParamValue('question_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'question_fr', title: $filter('translate')('content.list.fields.QUESTIONFR'), sortable: 'quiz.questionFr', filter: { 'quiz.questionFr': 'text' }, show: $scope.getParamValue('question_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice1', title: $filter('translate')('content.list.fields.CHOICE1'), sortable: 'quiz.choice1', filter: { 'quiz.choice1': 'text' }, show: $scope.getParamValue('choice1_show_filed', false), getValue: $scope.textValue },
            { field: 'choice1_ar', title: $filter('translate')('content.list.fields.CHOICE1AR'), sortable: 'quiz.choice1Ar', filter: { 'quiz.choice1Ar': 'text' }, show: $scope.getParamValue('choice1_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice1_fr', title: $filter('translate')('content.list.fields.CHOICE1FR'), sortable: 'quiz.choice1Fr', filter: { 'quiz.choice1Fr': 'text' }, show: $scope.getParamValue('choice1_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice1_is_correct', title: $filter('translate')('content.list.fields.CHOICE1ISCORRECT'), sortable: 'quiz.choice1IsCorrect', filter: { 'quiz.choice1IsCorrect': 'select' }, show: $scope.getParamValue('choice1_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice1_is_correct ]]"></span>') },
            { field: 'choice2', title: $filter('translate')('content.list.fields.CHOICE2'), sortable: 'quiz.choice2', filter: { 'quiz.choice2': 'text' }, show: $scope.getParamValue('choice2_show_filed', false), getValue: $scope.textValue },
            { field: 'choice2_ar', title: $filter('translate')('content.list.fields.CHOICE2AR'), sortable: 'quiz.choice2Ar', filter: { 'quiz.choice2Ar': 'text' }, show: $scope.getParamValue('choice2_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice2_fr', title: $filter('translate')('content.list.fields.CHOICE2FR'), sortable: 'quiz.choice2Fr', filter: { 'quiz.choice2Fr': 'text' }, show: $scope.getParamValue('choice2_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice2_is_correct', title: $filter('translate')('content.list.fields.CHOICE2ISCORRECT'), sortable: 'quiz.choice2IsCorrect', filter: { 'quiz.choice2IsCorrect': 'select' }, show: $scope.getParamValue('choice2_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice2_is_correct ]]"></span>') },
            { field: 'choice3', title: $filter('translate')('content.list.fields.CHOICE3'), sortable: 'quiz.choice3', filter: { 'quiz.choice3': 'text' }, show: $scope.getParamValue('choice3_show_filed', false), getValue: $scope.textValue },
            { field: 'choice3_ar', title: $filter('translate')('content.list.fields.CHOICE3AR'), sortable: 'quiz.choice3Ar', filter: { 'quiz.choice3Ar': 'text' }, show: $scope.getParamValue('choice3_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice3_fr', title: $filter('translate')('content.list.fields.CHOICE3FR'), sortable: 'quiz.choice3Fr', filter: { 'quiz.choice3Fr': 'text' }, show: $scope.getParamValue('choice3_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice3_is_correct', title: $filter('translate')('content.list.fields.CHOICE3ISCORRECT'), sortable: 'quiz.choice3IsCorrect', filter: { 'quiz.choice3IsCorrect': 'select' }, show: $scope.getParamValue('choice3_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice3_is_correct ]]"></span>') },
            { field: 'choice4', title: $filter('translate')('content.list.fields.CHOICE4'), sortable: 'quiz.choice4', filter: { 'quiz.choice4': 'text' }, show: $scope.getParamValue('choice4_show_filed', false), getValue: $scope.textValue },
            { field: 'choice4_ar', title: $filter('translate')('content.list.fields.CHOICE4AR'), sortable: 'quiz.choice4Ar', filter: { 'quiz.choice4Ar': 'text' }, show: $scope.getParamValue('choice4_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice4_fr', title: $filter('translate')('content.list.fields.CHOICE4FR'), sortable: 'quiz.choice4Fr', filter: { 'quiz.choice4Fr': 'text' }, show: $scope.getParamValue('choice4_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice4_is_correct', title: $filter('translate')('content.list.fields.CHOICE4ISCORRECT'), sortable: 'quiz.choice4IsCorrect', filter: { 'quiz.choice4IsCorrect': 'select' }, show: $scope.getParamValue('choice4_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice4_is_correct ]]"></span>') },
            { field: 'choice5', title: $filter('translate')('content.list.fields.CHOICE5'), sortable: 'quiz.choice5', filter: { 'quiz.choice5': 'text' }, show: $scope.getParamValue('choice5_show_filed', false), getValue: $scope.textValue },
            { field: 'choice5_ar', title: $filter('translate')('content.list.fields.CHOICE5AR'), sortable: 'quiz.choice5Ar', filter: { 'quiz.choice5Ar': 'text' }, show: $scope.getParamValue('choice5_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice5_fr', title: $filter('translate')('content.list.fields.CHOICE5FR'), sortable: 'quiz.choice5Fr', filter: { 'quiz.choice5Fr': 'text' }, show: $scope.getParamValue('choice5_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice5_is_correct', title: $filter('translate')('content.list.fields.CHOICE5ISCORRECT'), sortable: 'quiz.choice5IsCorrect', filter: { 'quiz.choice5IsCorrect': 'select' }, show: $scope.getParamValue('choice5_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice5_is_correct ]]"></span>') },
            { field: 'choice6', title: $filter('translate')('content.list.fields.CHOICE6'), sortable: 'quiz.choice6', filter: { 'quiz.choice6': 'text' }, show: $scope.getParamValue('choice6_show_filed', false), getValue: $scope.textValue },
            { field: 'choice6_ar', title: $filter('translate')('content.list.fields.CHOICE6AR'), sortable: 'quiz.choice6Ar', filter: { 'quiz.choice6Ar': 'text' }, show: $scope.getParamValue('choice6_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice6_fr', title: $filter('translate')('content.list.fields.CHOICE6FR'), sortable: 'quiz.choice6Fr', filter: { 'quiz.choice6Fr': 'text' }, show: $scope.getParamValue('choice6_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice6_is_correct', title: $filter('translate')('content.list.fields.CHOICE6ISCORRECT'), sortable: 'quiz.choice6IsCorrect', filter: { 'quiz.choice6IsCorrect': 'select' }, show: $scope.getParamValue('choice6_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice6_is_correct ]]"></span>') },
            { field: 'choice7', title: $filter('translate')('content.list.fields.CHOICE7'), sortable: 'quiz.choice7', filter: { 'quiz.choice7': 'text' }, show: $scope.getParamValue('choice7_show_filed', false), getValue: $scope.textValue },
            { field: 'choice7_ar', title: $filter('translate')('content.list.fields.CHOICE7AR'), sortable: 'quiz.choice7Ar', filter: { 'quiz.choice7Ar': 'text' }, show: $scope.getParamValue('choice7_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice7_fr', title: $filter('translate')('content.list.fields.CHOICE7FR'), sortable: 'quiz.choice7Fr', filter: { 'quiz.choice7Fr': 'text' }, show: $scope.getParamValue('choice7_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice7_is_correct', title: $filter('translate')('content.list.fields.CHOICE7ISCORRECT'), sortable: 'quiz.choice7IsCorrect', filter: { 'quiz.choice7IsCorrect': 'select' }, show: $scope.getParamValue('choice7_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice7_is_correct ]]"></span>') },
            { field: 'choice8', title: $filter('translate')('content.list.fields.CHOICE8'), sortable: 'quiz.choice8', filter: { 'quiz.choice8': 'text' }, show: $scope.getParamValue('choice8_show_filed', false), getValue: $scope.textValue },
            { field: 'choice8_ar', title: $filter('translate')('content.list.fields.CHOICE8AR'), sortable: 'quiz.choice8Ar', filter: { 'quiz.choice8Ar': 'text' }, show: $scope.getParamValue('choice8_ar_show_filed', false), getValue: $scope.textValue },
            { field: 'choice8_fr', title: $filter('translate')('content.list.fields.CHOICE8FR'), sortable: 'quiz.choice8Fr', filter: { 'quiz.choice8Fr': 'text' }, show: $scope.getParamValue('choice8_fr_show_filed', false), getValue: $scope.textValue },
            { field: 'choice8_is_correct', title: $filter('translate')('content.list.fields.CHOICE8ISCORRECT'), sortable: 'quiz.choice8IsCorrect', filter: { 'quiz.choice8IsCorrect': 'select' }, show: $scope.getParamValue('choice8_is_correct_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.choice8_is_correct ]]"></span>') },
            { field: 'auto_publishing', title: $filter('translate')('content.list.fields.AUTOPUBLISHING'), sortable: 'quiz.autoPublishing', filter: { 'quiz.autoPublishing': 'select' }, show: $scope.getParamValue('auto_publishing_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.auto_publishing ]]"></span>') },
            { field: 'start_publishing', title: $filter('translate')('content.list.fields.STARTPUBLISHING'), sortable: 'quiz.startPublishing', filter: { 'quiz.startPublishing': 'text' }, show: $scope.getParamValue('start_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'end_publishing', title: $filter('translate')('content.list.fields.ENDPUBLISHING'), sortable: 'quiz.endPublishing', filter: { 'quiz.endPublishing': 'text' }, show: $scope.getParamValue('end_publishing_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'publish_date', title: $filter('translate')('content.list.fields.PUBLISHDATE'), sortable: 'quiz.publishDate', filter: { 'quiz.publishDate': 'text' }, show: $scope.getParamValue('publish_date_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATE')+'\''},
            { field: 'count_answers', title: $filter('translate')('content.list.fields.COUNTANSWERS'), sortable: 'quiz.countAnswers', filter: { 'quiz.countAnswers': 'number' }, show: $scope.getParamValue('count_answers_show_filed', false), getValue: $scope.textValue },
            { field: 'count_winners', title: $filter('translate')('content.list.fields.COUNTWINNERS'), sortable: 'quiz.countWinners', filter: { 'quiz.countWinners': 'number' }, show: $scope.getParamValue('count_winners_show_filed', false), getValue: $scope.textValue },
            { field: 'is_finished', title: $filter('translate')('content.list.fields.ISFINISHED'), sortable: 'quiz.isFinished', filter: { 'quiz.isFinished': 'select' }, show: $scope.getParamValue('is_finished_show_filed', false), getValue: $scope.interpolatedValue, filterData : $scope.booleanOptions, interpolateExpr: $interpolate('<span my-boolean="[[ row.is_finished ]]"></span>') },
            { field: 'ordering', title: $filter('translate')('content.list.fields.ORDERING'), sortable: 'quiz.ordering', filter: { 'quiz.ordering': 'number' }, show: $scope.getParamValue('ordering_show_filed', false), getValue: $scope.textValue },
            { field: 'created_at', title: $filter('translate')('content.list.fields.CREATEDAT'), sortable: 'quiz.createdAt', filter: { 'quiz.createdAt': 'number' }, show: $scope.getParamValue('created_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'creator_user', title: $filter('translate')('content.list.fields.CREATORUSER'), sortable: 'creator_user.username', filter: { 'quiz.creatorUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('creator_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
            { field: 'modified_at', title: $filter('translate')('content.list.fields.MODIFIEDAT'), sortable: 'quiz.modifiedAt', filter: { 'quiz.modifiedAt': 'number' }, show: $scope.getParamValue('modified_at_show_filed', false), getValue: $scope.evaluatedValue, valueFormatter: 'date:\''+$filter('translate')('formats.DATETIME')+'\''},
            { field: 'modifier_user', title: $filter('translate')('content.list.fields.MODIFIERUSER'), sortable: 'modifier_user.username', filter: { 'quiz.modifierUser': 'select' }, getValue: $scope.linkValue, filterData: $scope.getUsers(), show: $scope.getParamValue('modifier_user_id_show_filed', false), displayField: 'username', state: 'app.access.usersdetails' },
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

    $scope.isFiltersVisible = $scope.getParamValue('quizzesIsFiltersVisible', false);
    $scope.$watch('isFiltersVisible', function() {
        $scope.setParamValue('quizzesIsFiltersVisible', $scope.isFiltersVisible);
    });

    $scope.page = 1; // show first page
    $scope.page = $scope.getParamValue('quizzesPage', $scope.page);
    $scope.count = 50; // count per page
    $scope.count = $scope.getParamValue('quizzesCount', $scope.count);
    $scope.sorting = {'quiz.createdAt': 'desc'};
    $scope.sorting = $scope.getParamValue('quizzesSorting', $scope.sorting);
    $scope.filter = {
    };
    $scope.filter = $scope.getParamValue('quizzesFilter', $scope.filter);
    $scope.setParamValue('quizzesPage', $scope.page);
    $scope.setParamValue('quizzesCount', $scope.count);
    $scope.setParamValue('quizzesSorting', $scope.sorting);
    $scope.setParamValue('quizzesFilter', $scope.filter);
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
            $scope.setParamValue('quizzesIsFiltersVisible', $scope.isFiltersVisible);
            $scope.setParamValue('quizzesPage', current);
            $scope.setParamValue('quizzesCount', limit);
            $scope.setParamValue('quizzesSorting', order_by);
            $scope.setParamValue('quizzesFilter', filters);
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
            return $quizzesDataFactory.query(http_params).$promise.then(function(data) {
                $scope.isLoading = false;
                params.total(data.inlineCount);
                return data.results;
            });
        }
    });

    $scope.delete = function(row) {
        SweetAlert.swal({
            title: $filter('translate')('content.common.AREYOUSURE'),
            text: $filter('translate')('content.list.YOUWILLNOTBEABLETORECOVERQUIZ'),
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
                $quizzesDataFactory.remove({id: row.id}).$promise.then(function(data) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.DELETED'), 
                        text: $filter('translate')('content.list.QUIZDELETED'), 
                        type: 'success',
                        confirmButtonColor: '#007AFF'
                    });
                    $scope.tableParams.reload();
                }, function(error) {
                    SweetAlert.swal({
                        title: $filter('translate')('content.common.ERROR'), 
                        text: $filter('translate')('content.list.QUIZNOTDELETED'), 
                        type: 'warning',
                        confirmButtonColor: '#007AFF'
                    });
                });
            } else {
                SweetAlert.swal({
                    title: $filter('translate')('content.common.CANCELLED'), 
                    text: $filter('translate')('content.list.QUIZNOTDELETED'), 
                    type: 'error',
                    confirmButtonColor: '#007AFF'
                });
            }
        });
    };

    $scope.add = function() {
        $state.go('app.quizzesmanager.quizzesnew');
    };

    $scope.edit = function(row) {
        $state.go('app.quizzesmanager.quizzesedit', {id: row.id});
    };

    $scope.details = function(row) {
        $state.go('app.quizzesmanager.quizzesdetails', {id: row.id});
    };
}]);

