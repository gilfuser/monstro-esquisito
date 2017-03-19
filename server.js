var express = require('express');
var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My Socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
  console.log( 'new connection: ' + socket.id);

 socket.on('mouse', mouseMsg);

 function mouseMsg(data) {
   socket.broadcast.emit('mouse', data);
   // ato send the msg to everyone, include back to ithe client that is sending
   // io.sockets.emit('mouse, data');
   console.log(data);
 }

}
