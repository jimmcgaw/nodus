var http = require("http");

function handleHTTP(request, response){
  if (request.method === 'GET'){
    console.log('GET /');
  }
  if (request.method === 'POST'){
    console.log('POST /');
  }
  response.writeHead(200, { "Content-type": "text/plain"});
  response.end("hello world");
}

var port = 9090;
var host = "localhost";

var httpServer = http
  .createServer(handleHTTP)
  .listen(port, host);
