var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var httpProxy = require('http-proxy');

var app = express();
var api = httpProxy.createProxyServer();

app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.get('/api/*', function(req, res){
    api.web(req, res, { target: 'https://apollo.omcompany.com:5443' });
});

app.get('/*', function(req, res){
    res.sendfile(path.join(__dirname, 'app', 'index.html'));
});

app.listen(8000);