angular.module('app.HomeController', ['app.PostService', 'app.HomePostStorage', 'ui.router', 'app.MarkupArea', 'app.ImageSizes'])
.config(function($stateProvider){
    $stateProvider.state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'app/views/home.html'
    });
})

.controller('HomeController', function($scope, $state){
    $scope.init = function(){
        $state.go('post.list');
    }
});