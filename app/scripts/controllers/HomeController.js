define(['app', 'services/PostService', 'services/HomePostStorage'], function(app){
    app.controller('HomeController', function($scope, PostService, HomePostStorage){
        $scope.posts = [];
        $scope.users = {};
        $scope.related = {};
        
        $scope.init = function(){
            if(HomePostStorage.post.length === 0){
                // No data exists, download latest posts
                PostService.listPost({ count: 25 }).then(function(resp){
                    var list = resp.data.list,
                        related = resp.data.related,
                        user = resp.data.users;

                    HomePostStorage.appendRelated(related);
                    HomePostStorage.updateUser(user);
                    HomePostStorage.appendPost(list);
                });
            } else {
                // Restore data from HomePostStorage
                $scope.posts = HomePostStorage.post;
                $scope.users = HomePostStorage.user;
                $scope.related = HomePostStorage.related;
            }
        }
        
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