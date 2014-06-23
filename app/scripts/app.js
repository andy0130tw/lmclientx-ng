define(['routes', 'services/dependencyResolverFor', 'ngstorage'], function(config, dependencyResolverFor){
    
    var app = angular.module('app', ['ui.router', 'ngStorage']);
    
    app.config(
        function($urlRouterProvider, $stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide){
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            
            if(config.routes !== undefined){
                angular.forEach(config.routes, function(route, path){
                    $stateProvider.state(path, {
                        url: route.url,
                        templateUrl: route.templateUrl,
                        controller: route.controller,
                        resolve: dependencyResolverFor(['controllers/' + route.controller])
                    });
                });
            }
            
            if(config.defaultRoutePath !== undefined){
                $urlRouterProvider.otherwise(config.defaultRoutePath);   
            }
        }
    );
    
    return app;
    
});