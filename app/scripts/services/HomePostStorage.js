define(['app'], function(app){
    app.factory('HomePostStorage', function($rootScope){
        return {
            
            post: [],
            related: {},
            user: {},
            
            appendPost: function(arr){
                this.post.push.apply(this.post, arr);
                $rootScope.$broadcast('HOME_POST_CHANGED');
            },
            
            appendRelated: function(obj){
                for(var key in obj){
                    this.related[key] = obj[key];
                }
                $rootScope.$broadcast('HOME_RELATED_CHANGED');
            },
            
            updateUser: function(obj){
                for(var key in obj){
                    this.user[key] = obj[key];
                }
                $rootScope.$broadcast('HOME_USER_CHANGED');
            }
            
        };
    });
});