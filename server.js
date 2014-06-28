var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var httpProxy = require('http-proxy');
var domain = require('domain');
var http = require('http');

var app = express();
var api = httpProxy.createProxyServer();

app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'build')));
//app.use('/bower_components', express.static(path.join(__dirname, 'build', 'bower_components')));

app.get('/api/*', function(req, res){
    api.web(req, res, { target: 'https://apollo.omcompany.com:5443' });
});

app.get('/*', function(req, res){
    res.sendfile(path.join(__dirname, 'app', 'index.html'));
});

app.use(function (error, req, res, next) {
    if(!error){
        next();
    } else {
        console.error(error.stack);
        res.send(500);
    }
});

var serverDomain = domain.create();

serverDomain.run(function(){
    http.createServer(function(req, res){
        var reqd = domain.create();
        reqd.add(req);
        reqd.add(res);

        reqd.on('error', function(error){ reqd.dispose(); });

        app(req, res);
    }).listen(8000);
});
