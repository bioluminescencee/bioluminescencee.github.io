// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
  });

  // Starts the server.
server.listen(5000, function() {
    console.log('Starting server on port 5000');
  });
setInterval(function() {

}, 2000);
  // Add the WebSocket handlers
  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
    socket.on('disconnect', function() {
      console.log('user disconnected');
      delete players[socket.id];
    });
  });

setInterval(function() {
    io.sockets.emit('message', "hi");
    
  }, 1000);

  var players = {};
  let randColours = ['red', 'tomato', 'orange', 'yellow', 'olive', 'lime', 'green', 'mediumseagreen', 'lightseagreen', 'aquamarine', 'cyan', 'darkcyan', 'deepskyblue', 'royalblue', 'lightskyblue', 'blue', 'navy', 'darkslateblue', 'orchid', 'blueviolet', 'magenta', 'purple', 'indigo', 'pink', 'deeppink', 'grey', 'saddlebrown', 'black'];
  let randColour = randColours[Math.floor(Math.random() * 28)];
io.on('connection', function(socket) {
  socket.on('new player', function() {
    randColour = randColours[Math.floor(Math.random() * 28)];
    console.log(randColour)
    players[socket.id] = {
      x: 300,
      y: 300,
      colour: randColour
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (player.x >= 801) {
      player.x = 1;
    }
    else if (player.x <= -1) {
      player.x = 800;
    }
    else if (player.y >= 601) {
      player.y = 1;
    }
    else if (player.y <= 0) {
      player.y = 600;
    }
    else {
      if (data.left) {
        player.x -= 5;
      }
      if (data.up) {
        player.y -= 5;
      }
      if (data.right) {
        player.x += 5;
      }
      if (data.down) {
        player.y += 5;
      }
    }
  });
});

setInterval(function() {
    io.sockets.emit('state', players);
  }, 1000 / 60);
  
