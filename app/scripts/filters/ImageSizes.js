angular.module('app.ImageSizes', [])

.directive('lmImage', function(){
    return function(scope, element, attr){
        attr.$observe('lmImage', function(actual_value){
            console.log(actual_value);
            element[0].src = 'https://apollo.omcompany.com:5443/image/' + actual_value + '?size=m';
        });
    };
});