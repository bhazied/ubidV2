'use strict';

app.directive('recompile', function($compile, $parse) {
    return {
        scope: true, // required to be able to clear watchers safely
        compile: function(el) {
            var template = getElementAsHtml(el);
            return function link(scope, $el, attrs) {
                console.warn('recompiling')
                var stopWatching = scope.$parent.$watch(attrs.recompile, function(_new, _old) {
                    var useBoolean = attrs.hasOwnProperty('useBoolean');
                    if ((useBoolean && (!_new || _new === 'false')) || (!useBoolean && (!_new || _new === _old))) {
                        return;
                    }
                    // reset recompile to false if we're using a boolean
                    if (useBoolean) {
                        $parse(attrs.recompile).assign(scope.$parent, false);
                    }
                    // recompile
                    var newEl = $compile(template)(scope.$parent);
                    $el.replaceWith(newEl);
                    // Destroy old scope, reassign new scope.
                    stopWatching();
                    scope.$destroy();
                });
            };
        }
    };

    function getElementAsHtml(el) {
        return angular.element('<a></a>').append(el.clone()).html();
    }

});
