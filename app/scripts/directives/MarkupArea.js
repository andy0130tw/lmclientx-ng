define(['app'], function(app){
    console.log('ab');
    app.directive('lmMarkup', function(){
        console.log('aaa');
        return {
            restrict: 'A',
            require: 'ngModel',
            replace: true,
            scope: { props: '=parseUrl', ngModel: '=ngModel' },
            link: function compile($scope, $element, $attrs, $controller){
                $scope.$watch('ngModel', function(value){
                    var src = value;

                    src = src.replace(/^(#{1,6})(?!#)(.+)$/mg, function(match, p1, p2){
                        var cnt = p1.length;
                        if(p2.length > cnt){
                            var end = p2.substr(p2.length-cnt);
                            if(end == p1){
                                p2 = p2.substr(0, p2.length-cnt);
                            }
                        }
                        return '<h'+cnt+'>' + p2 + '</h'+cnt+'>';
                    });

                    src = src.replace(/([^>])\n/g, '$1<br/>\n');
                    src = src.replace(/--\s*(.+?)\s*--/g, '<del>$1</del>');
                    src = src.replace(/__\s*(.+?)\s*__/g, '<u>$1</u>');

                    $element.html(src);
                });
            }
        };
    });
});