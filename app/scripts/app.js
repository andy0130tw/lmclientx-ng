var app = angular.module('app', [
    'ui.router',
    'ngStorage',
    'angular-loading-bar',
    'ngAnimate',
    'angularMoment',
    'ngSanitize',
    'app.Session',
    'app.HomeController',
    'app.LoginController',
    'app.PostReadController'
]);

app.config(function($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise('/home');
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