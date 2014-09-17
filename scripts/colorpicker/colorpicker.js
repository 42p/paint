/**
 * Created by shaikp on 9/16/2014.
 */
angular.module('paint.colorpicker', [])
    .directive('colorPicker', [
        '$timeout',
        '$http',
        colorPickerDirective
    ]);

function colorPickerDirective($timeout,$http) {
    var hasClass=/(^|\s)color-picker(\s|$)/
    return {
        restrict: 'E',
        scope:{},
        template:'<div class="color-selector">' +
            '<input type="color" ng-model="color" ng-change="changeColor()" class="picker"/>' +
            '</div>',
        link: function ($scope, $elem, $atrrs) {

              $scope.color=PAINT.SELECTION.CURRENT_STROKE;
            $elem.on('click',function(evt){
               if(evt.target.className.match(hasClass)){
                   $elem.find('.picker').click();
               }
            });
            $scope.changeColor=function(){
                PAINT.SELECTION.CURRENT_STROKE=$scope.color;
            }



        }
    }
}