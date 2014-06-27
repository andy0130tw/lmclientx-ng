define(['app', 'services/PostService', 'filters/MarkupArea', 'services/HomePostStorage'], function(app){
    app.controller('PostReadController', function($scope, PostService, $stateParams, HomePostStorage){
        $scope.post = {};
        $scope.users = {};
        $scope.replies = [];
        
        $scope.oldest = '';
        $scope.more = false;
        
        $scope.init = function(){
            // Clear storage
            HomePostStorage.clearReply();
            
            // Load the specified post
            var id = $stateParams.postId;
            PostService.readPost(id).then(function(resp){
                $scope.post = resp.data.list[0];
                HomePostStorage.updateUser(resp.data.users);
            });
            PostService.listPost({ count: 25, related: id, sort: 'date' }).then(function(resp){
                console.log(resp.data);
                $scope.more = resp.data.info.more;
                if($scope.more === true) $scope.oldest = resp.data.info.oldest;
                HomePostStorage.appendReply(resp.data.list);
                HomePostStorage.updateUser(resp.data.users);
            });
        }
        
        $scope.$on('HOME_USER_CHANGED', function(){
            $scope.users = HomePostStorage.user;
        });
        
        $scope.$on('HOME_REPLY_CHANGED', function(){
            $scope.replies = HomePostStorage.reply;
        });
    });
});