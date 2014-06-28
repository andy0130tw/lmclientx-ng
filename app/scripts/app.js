var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'angular-loading-bar',
    'ngAnimate',
    'angularMoment',
    'ngSanitize',
    'app.Session',
    'app.HomeController',
    'app.LoginController',
    'app.PostListController',
    'app.PostReadController'
]);

app.config(function($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
    .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'app/views/login.html'
    })
    
    .state('post', {
        url: '/post',
        abstract: true,
        templateUrl: 'app/views/post.html',
    })
    
    .state('post.list', {
        url: '?page',
        controller: 'PostListController',
        templateUrl: 'app/views/post.list.html'
    })
    
    .state('post.read', {
        url: '/:postId',
        controller: 'PostReadController',
        templateUrl: 'app/views/post.read.html'
    });
})

.run(function(){})

.controller('ApplicationController', function($scope, $location, Session, $state, amMoment){
    $scope.currentUser = null;

    $scope.$on('AUTH_STATE_CHANGED', function(event, args){
        $scope.currentUser = Session.user;
    });

    $scope.init = function(){
        if(!Session.checkStorage()) $state.go('login', {reload: true});
        else Session.restoreSession();
        amMoment.changeLanguage('zh-tw');
    };

    $scope.logout = function(){
        Session.destroySession();
        $state.go('login', {reload: true});
    };
});