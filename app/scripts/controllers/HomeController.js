define(['app', 'services/PostService', 'services/HomePostStorage', 'filters/MarkupArea'], function(app){
    app.controller('HomeController', function($scope, PostService, HomePostStorage, $state){
        $scope.posts = [];
        $scope.users = {};
        $scope.related = {};
        $scope.oldest = '';
        
        $scope.init = function(){
            if(HomePostStorage.post.length === 0){
                // No data exists, download latest posts
                PostService.listPost({ count: 25 }).then(function(resp){
                    if(resp.data.status !== 'ok'){
                        $state.go('login');
                        return;
                    }
                    var list = resp.data.list,
                        related = resp.data.related,
                        user = resp.data.users,
                        oldest = resp.data.info.oldest;

                    HomePostStorage.oldest = oldest;
                    HomePostStorage.appendRelated(related);
                    HomePostStorage.updateUser(user);
                    HomePostStorage.appendPost(list);
                    
                    $scope.oldest = oldest;
                });
            } else {
                // Restore data from HomePostStorage
                $scope.oldest = HomePostStorage.oldest;
                $scope.posts = HomePostStorage.post;
                $scope.users = HomePostStorage.user;
                $scope.related = HomePostStorage.related;
            }
        };
        
        $scope.more = function(){
            PostService.listPost({ count: 25, before: $scope.oldest }).then(function(resp){
                var list = resp.data.list,
                    related = resp.data.related,
                    user = resp.data.users,
                    oldest = resp.data.info.oldest;
                    
                HomePostStorage.oldest = oldest;
                HomePostStorage.appendRelated(related);
                HomePostStorage.updateUser(user);
                HomePostStorage.appendPost(list);

                $scope.oldest = oldest;
            });
        };
        
        $scope.read = function(id){
            var post = $scope.related[id];
            if(post.category === 'scrapbook' || post.category === 'question' || post.category === 'answer') $state.go('post', { postId: id });
            else if(post.category === 'comment' || post.category === 'answer') $state.go('post', { postId: post.related });
        };
        
        $scope.$on('HOME_POST_CHANGED', function(){
            $scope.posts = HomePostStorage.post;
        });
        
        $scope.$on('HOME_USER_CHANGED', function(){
            $scope.users = HomePostStorage.user;
        });
        
        $scope.$on('HOME_RELATED_CHANGED', function(){
            $scope.related = HomePostStorage.related;
        });
    });
});