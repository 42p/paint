/**
 * Created by shaikp on 9/16/2014.
 */
angular.module('paint.toolbar', [])
    .directive('paintToolbar', [
        '$timeout',
        '$http',
        paintToolbarDirective
    ]);

function paintToolbarDirective($timeout,$http) {
    return {
        restrict: 'E',
        scope:{},
        templateUrl:'scripts/toolbar/toolbar_directive.html',
        link: function ($scope, $elem, $atrrs) {
           $scope.components;
           $http.get('components.json').then(function(resp){
                  $scope.components=resp.data;
           });
            $scope.updateSelection=function(ob){
                PAINT.SELECTION.CURRENT_SELECTION=eval(ob);
            }


        }
    }
}