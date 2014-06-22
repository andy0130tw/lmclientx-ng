require.config({
    baseUrl: '/scripts',
    paths: {
        'angular': '/bower_components/angular/angular',
        'angular-route': '/bower_components/angular-route/angular-route.min',
        'ngstorage': '/bower_components/ngstorage/ngStorage',
        'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min',
        'jquery': '/bower_components/jquery/dist/jquery.min'
    },
    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'bootstrap']
        },
        'angular-route': {
            deps: ['angular']
        },
        'ngstorage': {
            deps: ['angular']
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

require(['app', 'services/UserService', 'controllers/ApplicationController'], function(app){
    angular.bootstrap(document, ['app']);
});