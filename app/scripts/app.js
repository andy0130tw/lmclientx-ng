define(['routes', 'services/dependencyResolverFor', 'ngstorage'], function(config, dependencyResolverFor){
    
    var app = angular.module('app', ['ngRoute', 'ngStorage']);
    
    app.config([
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        '$httpProvider',
        
        function($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider){
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.pushHttpInterceptor = $httpProvider.interceptors.push;
            
            $locationProvider.html5Mode(true);
            
            if(config.routes !== undefined){
                angular.forEach(config.routes, function(route, path){
                    $routeProvider.when(path, {
                        templateUrl: route.templateUrl,
                        controller: route.controller,
                        resolve: dependencyResolverFor(['controllers/' + route.controller])
                    });
                });
            }
            
            if(config.defaultRoutePath !== undefined){
                $routeProvider.otherwise({
                    redirectTo: config.defaultRoutePath
                });   
            }
        }
    ]);
    
    return app;
    
});