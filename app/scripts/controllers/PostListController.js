angular.module('app.PostListController', ['app.PostService', 'app.HomePostStorage', 'ui.router', 'app.MarkupArea', 'app.ImageSizes', 'app.UserService', 'app.PageState'])

.controller('PostListController', function($scope, PostService, HomePostStorage, $state, $stateParams, UserService, PageState){
    $scope.posts = [];
    $scope.users = {};
    $scope.related = {};
    $scope.oldest = '';
    $scope.newest = '';
    $scope.moreToLoad = false;
    $scope.hasPrevious = false;
    $scope.init = function(){
        var config = { count: 15 };
        
        if($stateParams.page !== '') PageState.currentPage = $stateParams.page;
        else PageState.currentPage = '0';
        
        if(PageState.getId() !== '') config.before = PageState.getId();
        if(PageState.currentPage !== '0'){
            $scope.hasPrevious = true;
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
                oldest = resp.data.info.oldest,
                newest = resp.data.info.newest;

            $scope.users = UserService.procUserImage(user);
            $scope.related = related;
            $scope.posts = PostService.procPosterName(list, related, user);
            $scope.oldest = oldest;
            $scope.newest = newest;
            $scope.moreToLoad = more;
        });
    };
    
    $scope.onScroll = function(){
        console.log('hey!');
    }
    
    $scope.previous = function(){
        if(PageState.currentPage === 0) return;
        PageState.currentPage--;
        $state.go('post.list', { page: PageState.currentPage });
    };

    $scope.more = function(){
        if(!PageState.hasNextPage()) PageState.push($scope.oldest);
        PageState.currentPage++;
        $state.go('post.list', { page: PageState.currentPage });
    };

    $scope.read = function(id){
        $state.go('post.read', { postId: id });
    };
});