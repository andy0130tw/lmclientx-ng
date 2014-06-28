angular.module('app.PostService', ['app.Session'])

.service('PostService', function($http, Session){
    return {

        listPost: function(options){
            return $http.get('/api/list', {params: Session.appendDevice(options)});
        },

        readPost: function(id){
            return $http.get('/api/read', {params: Session.appendDevice({ id: id })});
        },

        getStrongName: function(a, b){
            return (a === b) ? '他自己' : b;
        }

    };
});