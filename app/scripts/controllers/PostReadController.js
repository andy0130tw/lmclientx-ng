define(['app', 'services/PostService', 'filters/MarkupArea', 'services/HomePostStorage'], function(app){
    app.controller('PostReadController', function($scope, PostService, $stateParams, HomePostStorage){
        $scope.post = {};
        $scope.users = {};
        $scope.reply = [];
        
        $scope.init = function(){
            // Load the specified post
            var id = $stateParams.postId;
            PostService.readPost(id).then(function(resp){
                $scope.post = resp.data.list[0];
                HomePostStorage.updateUser(resp.data.users);
            });
        }
        
        $scope.$on('HOME_USER_CHANGED', function(){
            $scope.users = HomePostStorage.user;
        });
    });
});