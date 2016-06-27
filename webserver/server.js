var http = require("http");
var NodeStatic = require('node-static');

var staticFiles = new NodeStatic.Server(__dirname);

function handleHTTP(request, response){
  console.log(request.method, request.url);

  if (request.method === 'GET'){
    request.addListener('end', function(){
      request.url = 'hello.txt';
      staticFiles.serve(response, request);
    });
    request.resume();
  } else {
    response.writeHead(403);
    response.end("Unsupported request");
  }
}

var port = 9090;
var host = "localhost";

var httpServer = http
  .createServer(handleHTTP)
  .listen(port, host);
