/**
 * Created by shaikp on 9/16/2014.
 */
var module=angular.module("paint.canvas");
   module.directive('paintCan', [
        'geoService',
        canvasDirective
    ]);

function canvasDirective(geoService){
    return {
        restrict: 'E',
        scope:{},
        replace:true,
        templateUrl:'scripts/canvas/views/canvas_directive.html',
        link: function ($scope, $elem, $atrrs) {
           var canvas=$elem[0];

            canvas.setAttribute('width', $elem.parent().width());
            canvas.setAttribute('height', $elem.parent().height());
            canvas.setAttribute('id', 'canvas');
            context = canvas.getContext("2d");
            $elem.mousedown(function(evt){
                evt.preventDefault();
                computeDrawing(this,evt,false,"MOUSE_DOWN");
                PAINT.SELECTION.IS_MOUSE_DOWN=true;
            });
            $elem.mousemove(function(evt){
                if(PAINT.SELECTION.IS_MOUSE_DOWN){
                    computeDrawing(this,evt,true,"MOUSE_MOVE")
                }

            });
            var tempRectPoint;
            function computeDrawing(self,evt,mdrag,from){
                var X = evt.pageX - self.offsetLeft;
                var point;

                Y = evt.pageY - self.offsetTop;
                console.log(X ,Y);
                switch (PAINT.SELECTION.CURRENT_SELECTION){
                    case "PEN_TOOL":
                           drawPath();
                        point=geoService.addPoint(X,Y,mdrag)
                           break;
                    case "RECTANGLE_TOOL":
                        if(from=="MOUSE_DOWN"){
                            geoService.clearRect();
                            point=geoService.addPoint(X,Y,mdrag)
                            tempRectPoint=point;
                        }else if(from=="MOUSE_MOVE"){
                            tempRectPoint.W=X-tempRectPoint.X;
                            tempRectPoint.H=Y-tempRectPoint.Y;
                            drawPath();
                        }
                        break;
                    case "ERASER_TOOL":
                        point=geoService.addPoint(X,Y,mdrag);
                        point.STROKE_COLOR = "rgba(0,0,0,1)";
                        drawPath();
                        break;
                    default:
                         drawPath();
                }

            }
            $elem.mouseleave(function(evt){
                PAINT.SELECTION.IS_MOUSE_DOWN=false;
            });
            $elem.mouseup(function(evt){
                PAINT.SELECTION.IS_MOUSE_DOWN=false;
            });
            debugger;
            function drawPath(){
                context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

//                context.strokeStyle = "#df4b26";
                context.lineJoin = "round";
                context.lineWidth = 5;
              var points=geoService.getAllPoints();
                for(var i=0; i < points.length; i++) {
                    context.beginPath();
                    var point=points[i];
                    var rect={};
                    if(point.SELECTION=="ERASER_TOOL"){
                        context.globalCompositeOperation='destination-out';
                    }else{
                        context.globalCompositeOperation='source-over';
                    }

                    if(point.SELECTION=="RECTANGLE_TOOL"){
                        drawRect(point);
                        continue;
                    }

                    console.log(context.globalCompositeOperation);

                    if(point.PAINT && i){
                        var prev=geoService.getPreviousPoint(point);
                        if(prev){
                            context.moveTo(prev.X,prev.Y);
                        }

                    }else{
                        context.moveTo(point.X-1, point.Y-1);
                    }

                    context.strokeStyle=point.STROKE_COLOR;
                    context.lineTo(point.X,point.Y);
                    context.closePath();
                    context.stroke();
                }
            }
            function drawRect(rect){
                context.beginPath();
                context.rect(rect.X, rect.Y, rect.W, rect.H);
                context.lineWidth = rect.LINE_WIDTH;
                context.strokeStyle = rect.STROKE_COLOR;
                context.stroke();
            }

        }
    }

    /*return {
        scope:{},
        retrict:'E',
        replace:true,
        templateUrl:'scripts/canvas/views/canvas_directive.html',
        link:function($scope,$elem,$attrs){
            debugger;
            var canvasDiv = $elem;
            *//*canvas = document.createElement('canvas');
            canvas.setAttribute('width', canvasWidth);
            canvas.setAttribute('height', canvasHeight);
            canvas.setAttribute('id', 'canvas');
            canvasDiv.appendChild(canvas);
            if(typeof G_vmlCanvasManager != 'undefined') {
                canvas = G_vmlCanvasManager.initElement(canvas);
            }
            context = canvas.getContext("2d");*//*
        }
    }*/
}