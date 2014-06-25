define(['app'], function(app){
    app.factory('HomePostStorage', function($rootScope){
        return {
            
            post: [],
            related: {},
            user: {},
            reply: [],
            oldest: '',
            
            clearReply: function(){
                this.reply = [];
                $rootScope.$broadcast('HOME_REPLY_CHANGED');
            },
            
            appendPost: function(arr){
                // Process related user's name
                for(var p in arr){
                    if(arr[p].category === 'comment' || arr[p].category === 'answer'){
                        arr[p].reluser = this.user[this.related[arr[p].related].from].name;
                    }
                    this.related[arr[p].id] = arr[p];
                }
                this.post.push.apply(this.post, arr);
                $rootScope.$broadcast('HOME_POST_CHANGED');
                $rootScope.$broadcast('HOME_RELATED_CHANGED');
            },
            
            appendReply: function(arr){
                this.reply.push.apply(this.reply, arr);
                $rootScope.$broadcast('HOME_REPLY_CHANGED');
            },
            
            appendRelated: function(obj){
                for(var key in obj){
                    this.related[key] = obj[key];
                }
                $rootScope.$broadcast('HOME_RELATED_CHANGED');
            },
            
            updateUser: function(obj){
                for(var key in obj){
                    obj[key].avatar = 'https://apollo.omcompany.com:5443/image/' + obj[key].image;
                    this.user[key] = obj[key];
                }
                $rootScope.$broadcast('HOME_USER_CHANGED');
            }
            
        };
    });
});