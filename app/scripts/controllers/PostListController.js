angular.module('app.PostListController', ['app.PostService', 'app.HomePostStorage', 'ui.router', 'app.MarkupArea', 'app.ImageSizes', 'app.UserService'])

.controller('PostListController', function($scope, PostService, HomePostStorage, $state, $stateParams, UserService){
    $scope.posts = [];
    $scope.users = {};
    $scope.related = {};
    $scope.oldest = '';
    $scope.moreToLoad = false;

    $scope.init = function(){
        var config = { count: 25 };
        if($stateParams.before !== null){
            config.before = $stateParams.before;
        }
        PostService.listPost(config).then(function(resp){
            if(resp.data.status !== 'ok'){
                $state.go('login');
                return;
            }
            var list = resp.data.list,
                related = resp.data.related,
                user = resp.data.users,
                more = resp.data.info.more;
                oldest = resp.data.info.oldest;

            $scope.users = UserService.procUserImage(user);
            $scope.related = related;
            $scope.posts = PostService.procPosterName(list, related, user);
            $scope.oldest = oldest;
            $scope.moreToLoad = more;
        });
    };

    $scope.more = function(){
        $state.go('post.list', { before: $scope.oldest });
    };

    $scope.read = function(id){
        $state.go('post.read', { postId: id });
    };
});