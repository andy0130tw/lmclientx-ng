define(['app'], function(app){
    app.service('UserService', function($http){
        return {
            
            tryLogin: function(mac){
                var promise = $http.get('/api/profile/read?device=' + mac).then(function(resp){
                    if(resp.data.status === 'ok') return true;
                    else return false;
                });
                
                return promise;
            }
            
        };
    });
});