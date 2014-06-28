angular.module('app.PageState', [])

.factory('PageState', function(){
    return {
        currentPage: 0,
        pageIds: [''],
        init: function(){
            this.pageIds = [''];
            this.currentPage = 0;
        },
        push: function(id){
            this.pageIds.push(id);
        },
        getId: function(){
            return this.pageIds[this.currentPage];
        },
        hasNextPage: function(){
            return this.pageIds.length > (this.currentPage + 1);
        }
    };
});