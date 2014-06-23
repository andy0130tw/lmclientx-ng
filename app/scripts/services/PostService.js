define(['app', 'services/Session'], function(app){
    app.service('PostService', function($http, Session){
        return {
            
            listPost: function(options){
                return $http.get('/api/list', {params: Session.appendDevice(options)});
            },
            
            getStrongName: function(a, b){
                return (a === b) ? '他自己' : b;
            }
            
        };
    });
});