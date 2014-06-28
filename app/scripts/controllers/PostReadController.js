angular.module('app.PostReadController', ['app.PostService', 'ui.router', 'app.MarkupArea', 'app.ImageSizes', 'app.UserService'])

.controller('PostReadController', function($scope, PostService, $stateParams, UserService){
    $scope.post = {};
    $scope.users = {};
    $scope.replies = [];

    $scope.oldest = '';
    $scope.moreToLoad = false;

    $scope.init = function(){
        // Load the specified post
        var id = $stateParams.postId;
        PostService.readPost(id).then(function(resp){
            $scope.post = resp.data.list[0];
            var users = UserService.procUserImage(resp.data.users);
            for(var id in resp.data.users) $scope.users[id] = users[id]; // Merge
        });
        
        // Load replies
        PostService.listPost({ count: 25, related: id, sort: 'date' }).then(function(resp){
            $scope.moreToLoad = resp.data.info.more;
            if($scope.moreToLoad === true) $scope.oldest = resp.data.info.oldest;
            $scope.replies.push.apply($scope.replies, resp.data.list);
            var users = UserService.procUserImage(resp.data.users);
            for(var id in resp.data.users) $scope.users[id] = users[id]; // Merge
        });
    };
    
    $scope.more = function(){
        PostService.listPost({ count: 25, related: $stateParams.postId, sort: 'date', before: $scope.oldest }).then(function(resp){
            $scope.moreToLoad = resp.data.info.more;
            if($scope.more === true) $scope.oldest = resp.data.info.oldest;
            $scope.replies.push.apply($scope.replies, resp.data.list);
            var users = UserService.procUserImage(resp.data.users);
            for(var id in resp.data.users) $scope.users[id] = users[id]; // Merge
        });
    };
    
});