angular.module('app.PostReadController', ['app.PostService', 'ui.router', 'app.MarkupArea', 'app.ImageSizes', 'app.UserService', 'app.Session'])

.controller('PostReadController', function($scope, PostService, $stateParams, UserService, Session, $http){
    $scope.post = {};
    $scope.users = {};
    $scope.replies = [];

    $scope.oldest = '';
    $scope.moreToLoad = false;
    
    $scope.formCollapsed = true;

    $scope.init = function(){
        $scope.post = {};
        $scope.users = {};
        $scope.replies = [];
        $scope.oldest = '';
        $scope.moreToLoad = false;
        $scope.formCollapsed = true;
        
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
    
    $scope.comment = function(reply){
        var formData = new FormData();
        formData.append('message', reply.content);
        formData.append('subject', 'Architecture');
        formData.append('category', 'comment');
        formData.append('device', Session.mac);
        formData.append('application', 'reading');
        formData.append('related', $scope.post.id);
        if(document.getElementById('reply-file').files && document.getElementById('reply-file').files[0]) formData.append('image', document.getElementById('reply-file').files[0]);
        $http.post('/api/post', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function(resp){
            $scope.init();
        });
        
    };
    
});