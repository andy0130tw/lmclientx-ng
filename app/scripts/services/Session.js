angular.module('app.Session', [])
    
.factory('Session', function($localStorage, $http, $rootScope){
    console.log('session init');
    return {

        mac: null,
        user: null,

        checkStorage: function(){
            return ($localStorage.mac !== undefined);
        },

        restoreSession: function(){
            if($localStorage.mac === undefined) return;
            var Session = this;
            this.mac = $localStorage.mac;
            console.log('restoring ' + this.mac);
            this.readOwnProfile().then(function(resp){
                Session.user = resp.data.profile;
                $rootScope.$broadcast('AUTH_STATE_CHANGED');
            }, function(err){
                console.log(err);
            });
        },

        createSession: function(mac){
            var Session = this;
            this.mac = mac;
            $localStorage.mac = mac;
            this.readOwnProfile().then(function(resp){
                Session.user = resp.data.profile;
                $rootScope.$broadcast('AUTH_STATE_CHANGED');
            }, function(err){
                console.log(err);
            });
        },

        destroySession: function(){
            this.mac = null;
            this.user = null;
            delete $localStorage.mac;
            $rootScope.$broadcast('AUTH_STATE_CHANGED');
        },

        readOwnProfile: function(){
            return $http.get('/api/profile/read?device=' + this.mac);
        },

        appendDevice: function(options){
            var output = {device: this.mac};
            for(var key in options){
                output[key] = options[key];
            }
            return output;
        }

    };
});