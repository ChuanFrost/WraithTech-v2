export default angular.module('wraithTech')
.directive('fileOnChange', function() {
    return{
        scope:{
            fileOnChange:"&"
        },
        link:function($scope, $element, $attrs){
            $element.on("change",function(event){
                $scope.$apply(function(){
                    $scope.fileOnChange({$event: event})
                })
            })
            $scope.$on("$destroy",function(){
                $element.off();
            });
        }
    }
  });
