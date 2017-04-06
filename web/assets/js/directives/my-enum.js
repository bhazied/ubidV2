'use strict';
/**
 * Set label & css for enum values
 */
app.directive('myEnum', [
function ($rootScope, ToggleHelper) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            attrs.$observe('myEnum', function(value) {
                if (value != '') {
                    var list = angular.fromJson(attrs.myEnumList);
                    var title = value;
                    var css = 'btn btn-sm btn-';
                    var itemCss = '';
                    for (var i in list) {
                        if (list[i].id == value) {
                            title = list[i].title;
                            itemCss = list[i].css;
                        }
                    }
                    if (list.length >= 10) {
                        angular.element(elem).html('<span class="'+itemCss+'" title="'+title+'">'+title+'</span>');
                    } else {
                        angular.element(elem).text(title);
                        angular.element(elem).attr('class', css + itemCss);
                    }
                }
            });
        }
    };
}]);