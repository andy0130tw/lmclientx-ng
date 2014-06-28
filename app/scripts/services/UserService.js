angular.module('app.UserService', [])

.service('UserService', function($http){
    return {

        tryLogin: function(mac){
            var promise = $http.get('/api/profile/read?device=' + mac).then(function(resp){
                if(resp.data.status === 'ok') return true;
                else return false;
            });

            return promise;
        },
        
        procUserImage: function(users){
            for(var key in users){
                users[key].avatar = 'https://apollo.omcompany.com:5443/image/' + users[key].image;
            }
            return users;
        }

    };
});