var http = require("http");

var NodeStatic = require('node-static');

var fileServer = new NodeStatic.Server(__dirname);

function handleHTTP(request, response){
  console.log(request.method, request.url);

  if (request.method === 'GET'){
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
  } else {
    response.writeHead(403);
    response.end("Unsupported request");
  }
}

var port = 9090;
var host = "localhost";

var httpServer = http
  .createServer(handleHTTP);

var io = require('socket.io')(httpServer);

var disconnect = function(){
  console.log('client has disconnected');
}

var eventHandler = function(data){
  console.log(data);
}

var handleIO = function(socket){
  socket.on('event', eventHandler);
  socket.on('disconnect', disconnect);

  setInterval(function(){
    socket.emit('random', Math.random());
  }, 1000);
}

io.on('connection', handleIO);

httpServer.listen(port, host);
