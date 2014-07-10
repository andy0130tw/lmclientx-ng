angular.module('app.PostNewController', ['app.PostService', 'ui.router', 'ui.bootstrap', 'app.Session', 'app.PageState'])

.controller('PostNewController', function($scope, Session, $http, PageState){
    $scope.post = function(share){
        console.log(share);
        console.log(document.getElementById('newpost-file').files[0]);
        var formData = new FormData();
        formData.append('message', share.content);
        formData.append('subject', 'Architecture');
        formData.append('category', 'share');
        formData.append('device', Session.mac);
        formData.append('application', 'com.htc.learnmode');
        if(document.getElementById('newpost-file').files && document.getElementById('newpost-file').files[0]) formData.append('image', document.getElementById('newpost-file').files[0]);
        $http.post('/api/post', formData, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function(resp){
            PageState.init();
            $state.go('post.list', { page: '0' });
        });
    };
});