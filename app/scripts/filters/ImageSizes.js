angular.module('app.ImageSizes', [])

.directive('lmImage', function(){
    return function(scope, element, attr){
        attr.$observe('lmImage', function(actual_value){
            if(actual_value === '') return;
            $(element[0]).click(function(evt){
                evt.stopPropagation();
                $.magnificPopup.open({
                    items: {
                        src: 'https://apollo.omcompany.com:5443/image/' + actual_value + '?size=X'
                    },
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    mainClass: 'mfp-with-zoom mfp-img-mobile',
                    image: {
                        verticalFit: true,
                        titleSrc: function(item){
                            return '';
                        }
                    },
                    zoom: {
                        enabled: true,
                        duration: 300,
                        opener: function(el){
                            return $(element[0]);
                        }
                    }
                }, 0);
            });
            element[0].src = 'https://apollo.omcompany.com:5443/image/' + actual_value + '?size=m';
        });
    };
});