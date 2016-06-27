var http = require('http');
var pid = process.pid;

http.createServer(function(request, response){
  for (var i = 1e7; i > 0; i--){}
  console.log('Handling request from ' + pid);
  response.end('Hello from ' + pid + '\n');
}).listen(8080, function(){
  console.log('Started ' + pid);
});

setTimeout(function(){
  throw new Error("Simulated error")
}, Math.ceil(Math.random() * 3) * 1000);
