# Node.js Application Scalability

Experiments in scalable architectures with Node.js modules.

I'm using [seige](https://github.com/JoeDog/siege) as my benchmark testing tool.

Run the node server:

``` $ node app.js ```

In another Terminal window, slam this server endpoint with 200 concurrent connections for 10 seconds:

``` siege -c200 -t10S http://localhost:8090/ ```

You can see the benchmarks about how the connections were handled with a single app.js instance after
siege is done running.

Now run the clustered version. This will spawn up a cluster of app.js instances, one per CPU on your machine.

``` $ node clustered_app.js ```

Run siege again. You should see some performance improvements in response times.
