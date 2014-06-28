angular.module('app.HomeController', ['app.PostService', 'app.HomePostStorage', 'ui.router', 'app.MarkupArea', 'app.ImageSizes', 'app.PageState'])
.config(function($stateProvider){
    $stateProvider.state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'app/views/home.html'
    });
})

.controller('HomeController', function($scope, $state, PageState){
    $scope.init = function(){
        PageState.init();
        $state.go('post.list');
    }
});