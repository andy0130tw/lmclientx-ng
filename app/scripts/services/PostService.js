angular.module('app.PostService', ['app.Session'])

.service('PostService', function($http, Session){
    return {
        
        emotions: [
            '(清除表情)', '熱愛', '喜歡', '無評論', '討厭', '憤怒'
        ],

        listPost: function(options){
            return $http.get('/api/list', {params: Session.appendDevice(options)});
        },

        readPost: function(id){
            return $http.get('/api/read', {params: Session.appendDevice({ id: id })});
        },

        getStrongName: function(a, b){
            return (a === b) ? '他自己' : b;
        },
        
        procPostList: function(posts, related, users){
            // Process related user's name and emotions
            for(var p in posts){
                if(posts[p].category === 'comment' || posts[p].category === 'answer')
                    posts[p].reluser = users[related[posts[p].related].from].name;
                
                if(posts[p].category === '!emotion')
                    posts[p].message = this.emotions[posts[p].message];
                
            }
            return posts;
        }

    };
});