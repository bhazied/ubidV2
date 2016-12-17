'use strict';

/**
 * Controller for Menu Details
 */

app.controller('MenuCtrl', ['$scope', '$state', '$stateParams', '$sce', '$timeout', '$filter', '$q', '$interpolate', '$localStorage', '$menusDataFactory',
function($scope, $state, $stateParams, $sce, $timeout, $filter, $q, $interpolate, $localStorage, $menusDataFactory) {

    $scope.modes = [{
        id: 'Link',
        title: $filter('translate')('content.list.fields.modes.LINK'),
        css: 'primary'
    }, {
        id: 'ImageCategory',
        title: $filter('translate')('content.list.fields.modes.IMAGECATEGORY'),
        css: 'success'
    }, {
        id: 'PostCategory',
        title: $filter('translate')('content.list.fields.modes.POSTCATEGORY'),
        css: 'warning'
    }, {
        id: 'VideoCategory',
        title: $filter('translate')('content.list.fields.modes.VIDEOCATEGORY'),
        css: 'danger'
    }, {
        id: 'Album',
        title: $filter('translate')('content.list.fields.modes.ALBUM'),
        css: 'default'
    }, {
        id: 'Show',
        title: $filter('translate')('content.list.fields.modes.SHOW'),
        css: 'info'
    }, {
        id: 'Sport',
        title: $filter('translate')('content.list.fields.modes.SPORT'),
        css: 'primary'
    }, {
        id: 'SportEvent',
        title: $filter('translate')('content.list.fields.modes.SPORTEVENT'),
        css: 'success'
    }, {
        id: 'Team',
        title: $filter('translate')('content.list.fields.modes.TEAM'),
        css: 'warning'
    }, {
        id: 'Stadium',
        title: $filter('translate')('content.list.fields.modes.STADIUM'),
        css: 'danger'
    }, {
        id: 'Player',
        title: $filter('translate')('content.list.fields.modes.PLAYER'),
        css: 'default'
    }, {
        id: 'Day',
        title: $filter('translate')('content.list.fields.modes.DAY'),
        css: 'info'
    }, {
        id: 'Package',
        title: $filter('translate')('content.list.fields.modes.PACKAGE'),
        css: 'primary'
    }];
    $scope.displayModes = [{
        id: 'ImageWithText',
        title: $filter('translate')('content.list.fields.displaymodes.IMAGEWITHTEXT'),
        css: 'primary'
    }, {
        id: 'ImageOnly',
        title: $filter('translate')('content.list.fields.displaymodes.IMAGEONLY'),
        css: 'success'
    }, {
        id: 'TextOnly',
        title: $filter('translate')('content.list.fields.displaymodes.TEXTONLY'),
        css: 'warning'
    }];
    $scope.textPositions = [{
        id: 'None',
        title: $filter('translate')('content.list.fields.textpositions.NONE'),
        css: 'primary'
    }, {
        id: 'Top',
        title: $filter('translate')('content.list.fields.textpositions.TOP'),
        css: 'success'
    }, {
        id: 'Bottom',
        title: $filter('translate')('content.list.fields.textpositions.BOTTOM'),
        css: 'warning'
    }, {
        id: 'Left',
        title: $filter('translate')('content.list.fields.textpositions.LEFT'),
        css: 'danger'
    }, {
        id: 'Right',
        title: $filter('translate')('content.list.fields.textpositions.RIGHT'),
        css: 'default'
    }];

    $scope.dateFormat = $filter('translate')('formats.DATE');
    $scope.datetimeFormat = $filter('translate')('formats.DATETIME');
    $scope.timeFormat = $filter('translate')('formats.TIME');

    $scope.list = function() {
        $state.go('app.settings.menus');
    };

    $scope.add = function() {
        $state.go('app.settings.menusnew');
    };

    $scope.edit = function(row) {
        $state.go('app.settings.menusedit', {id: row.id});
    };

    if (angular.isDefined($stateParams.id)) {
        $menusDataFactory.get({id: $stateParams.id}).$promise.then(function(data) {
            $scope.menu = data;
        });
    }

}]);

