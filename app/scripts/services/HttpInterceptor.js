define(['app'], function(app){
    
    app.factory('HttpInterceptor', function($q){
        
        return {
            
            response: function(response){
                console.log(response);
                if(response.data.status === 'error'){
                    console.log('[httpInterceptor] ' + response.data.message);
                }
                return response;
            }
            
        };
        
    });
    
});