angular.module('app.PostService', ['app.Session'])

.service('PostService', function($http, Session){
    return {

        listPost: function(options){
            return $http.get('/api/list', {params: Session.appendDevice(options)});
        },

        readPost: function(id){
            return $http.get('/api/read', {params: Session.appendDevice({ id: id })});
        },

        getStrongName: function(a, b){
            return (a === b) ? '他自己' : b;
        },
        
        procPosterName: function(posts, related, users){
            // Process related user's name
            for(var p in posts){
                if(posts[p].category === 'comment' || posts[p].category === 'answer')
                    posts[p].reluser = users[related[posts[p].related].from].name;
                
            }
            return posts;
        }

    };
});