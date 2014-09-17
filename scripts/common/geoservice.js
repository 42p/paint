(function (){

    var geoProvider = function(){

        this.point=PAINT.SELECTION.POINT,
        this.selection=PAINT.SELECTION.SELECTION_MODEL,
        this.index=0;
        this.rect={};

        /**
         * Initialize and configure UserModel
         * @return UserModel
         */
        this.$get=['$http',function($http){
            var self=this;
            var addPoint=function(X,Y,paint){
                var point=pointClone();
                    point.X=X;
                    point.Y=Y;
                    point.index=self.index++;
                    point.PAINT=paint;
                    self.selection.POINTS.push(point);
                    point.SELECTION=PAINT.SELECTION.CURRENT_SELECTION;
                    point.STROKE_COLOR=PAINT.SELECTION.CURRENT_STROKE;
                    point.LINE_WIDTH=PAINT.SELECTION.CURRENT_LINE_WIDTH;
                    return point;
            },
            removePoint=function(point){

            },
            undo=function(){

            },
            redo=function(){

            },
            getPoint=function(){

            },
            getPreviousPoint=function(point){
                 return point.index-1>0?self.selection.POINTS[point.index-1]:null;
            }
            pointClone=function(){
                return Object.create(self.point)
            },
            getAllPoints=function(){
                return self.selection.POINTS;
            },
            clearRect=function(){
                self.rect={};
            }
            return {
                addPoint:addPoint,
                removePoint:removePoint,
                undo:undo,
                getPoint:getPoint,
                getPreviousPoint:getPreviousPoint,
                getAllPoints:getAllPoints,
                rect:self.rect,
                clearRect:clearRect
            }
        }]
    }

    angular.module('canvas.geo',[])
        .provider('geoService',geoProvider);
}());