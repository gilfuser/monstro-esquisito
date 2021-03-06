// Based off of Shawn Van Every's Live Web
// http://itp.nyu.edu/~sve204/liveweb_fall2013/week3.html

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();
var server = require('http').Server(app);

var PORT = process.env.PORT || 5000;
app.use(express.static('public'));


// Set up the server
// process.env.PORT is related to deploying on heroku
server.listen(PORT);

console.log('Server started on port ' + PORT);

app.get('/', function (req, res) {
    res.sendFile('/public/index.html');
});
/*
// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}
*/
// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(server);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {

    console.log("We have a new client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('mouse',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("Received: 'mouse' " + data.x + " " + data.y);
        // Send it to all other clients
        socket.broadcast.emit('mouse', data);
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );
    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on('background',
      function(data) {
        // Data comes in as whatever was sent, including objects
        console.log("bg has changed: " + data.color[0] );
        // Send it to all other clients
        socket.broadcast.emit('background', data);
        // This is a way to send to everyone including sender
        // io.sockets.emit('message', "this goes to everyone");

      }
    );


    socket.on('disconnect', function() {
      console.log("Client has disconnected");
    });
  }
);
