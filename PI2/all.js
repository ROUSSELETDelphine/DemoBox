// SERVER 
var express = require("express");
var app = express();
var path = require("path");

//Home 
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/homePage.html'));
    //__dirname : It will resolve to your project folder.
});

// Display
app.get('/Display', function (req, res) {
    res.sendFile(path.join(__dirname + '/Display/demoBase.html'));
});

// Phone
app.get('/Phone', function (req, res) {
    //res.sendFile(path.join(__dirname + '/Phone/infos.html'));
    res.sendFile('http://localhost:8081/Phone');
});




// APP
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var phone = http.createServer(function (req, res) {
    fs.readFile('./Phone/infos.html', 'utf-8', function (error, content) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(content);
    });
});

// Phone part
var io = require('socket.io').listen(phone);

io.sockets.on('connection', function (socket) {
    // Quand un client se connecte, on lui envoie un message
    socket.emit('message', 'Connected to sever');

    // Dès qu'on reçoit un "message", on le note dans la console
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log('Nouveau message: ' + message);
    });

    //Acc received
    socket.on('Acc', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log('Nouveau message: ' + message);
    });
});


phone.listen(8081); //Listen 8080

app.listen(8080);
console.log("Server running");

//Start Server
/*
var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})*/
