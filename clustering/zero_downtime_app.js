var cluster = require('cluster');
var os = require('os');

if (cluster.isMaster){
  var cpus = os.cpus().length;
  for (var i = 0; i < cpus; i++){
    cluster.fork();
  }

  cluster.on('exit', function(worker, code){
    if (code !== 0 && !worker.suicide) {
      console.log('Worker has crashed. Starting a new worker.');
      cluster.fork();
    }
  });

  // if we kill the parent process of the cluster is kill -SIGUSR2 [pid],
  // this kicks off, and shouldn't result in any downtime with performance tester.
  process.on('SIGUSR2', function(){
    console.log('Restarting workers...');
    workers = Object.keys(cluster.workers);

    var index = 0;
    var restartWorker = function(worker){
      worker = cluster.workers[worker];
      console.log('Stopping worker: ' + worker.process.pid);
      worker.disconnect();

      worker.on('exit', function(){
        if (!worker.suicide){
          return;
        }

        var spawnedWorker = cluster.fork();
        spawnedWorker.on('listening', function(){
          index++;
          if (index < workers.length){
            restartWorker(workers[index]);
          }
        });
      });
    }

    restartWorker(workers[index]);
  });

} else {
  require('./app');
}
