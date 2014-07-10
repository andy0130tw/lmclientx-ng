var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ui.event',
    'ngStorage',
    'angular-loading-bar',
    'ngAnimate',
    'angularMoment',
    'ngSanitize',
    'app.Session',
    'app.HomeController',
    'app.LoginController',
    'app.PostListController',
    'app.PostReadController',
    'app.PostNewController'
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
        url: '/page/:page',
        controller: 'PostListController',
        templateUrl: 'app/views/post.list.html'
    })
    
    .state('post.read', {
        url: '/read/:postId',
        controller: 'PostReadController',
        templateUrl: 'app/views/post.read.html'
    })
    
    .state('post.new', {
        url: '/new',
        controller: 'PostNewController',
        templateUrl: 'app/views/post.new.html'
    });
})

.run(function(){})

.controller('ApplicationController', function($scope, $location, Session, $state, amMoment, $timeout){
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
    
    // Scroll Retain
    $scope.scrollPos = {};
    
    $scope.scrollClear = function(path){
        $scope.scrollPos[path] = 0;
    };
    
    $(window).on('scroll', function(){
        if($scope.okSaveScroll){
            $scope.scrollPos[window.location.hash] = $(window).scrollTop();
        }
    });
    
    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
        $scope.okSaveScroll = false;
    });
    
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $timeout(function(){
            $(window).scrollTop($scope.scrollPos[window.location.hash] ? $scope.scrollPos[window.location.hash] : 0);
            $scope.okSaveScroll = true;
        }, 750);
    });
});