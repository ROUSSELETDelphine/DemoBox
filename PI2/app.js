// APP
var http = require('http');
var fs = require('fs');
var x = 0;
var y = 0;
var z = 0;
var alpha = 0;
var beta = 0;
var gamma = 0;

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
    socket.emit('message', 'Connected to server');

    // Dès qu'on reçoit un "message", on le note dans la console
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log('Nouveau message: ' + message);
    });

    //Acc received
    socket.on('Acc', function (acc) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log('Acc: ' + acc);
        var accSplited = acc.split(";");
        x = accSplited[0];
        y = accSplited[1];
        z = accSplited[2];
        console.log('X: ' + x);
    });
});



phone.listen(8080); //Listen 8080

console.log('Server running.');




/*var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function (req, res) {
    fs.readFile('./index.html', 'utf-8', function (error, content) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    // Quand un client se connecte, on lui envoie un message
    socket.emit('message', 'Bonjour ' + this.pseudo);
    // On signale aux autres clients qu'il y a un nouveau venu
    socket.broadcast.emit('message', 'Un autre client vient de se connecter ! ');

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('petit_nouveau', function (pseudo) {
        socket.pseudo = pseudo;
        console.log(socket.pseudo + ' is connected');
    });

    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
    });
});


server.listen(8080);*/
