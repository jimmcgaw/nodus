var fs = require('fs');

var stream = fs.createReadStream('./arabic_wordlist.csv');

var writeStream = fs.createWriteStream("./arabic_wordlist.backup.csv");

stream.pipe(writeStream);

stream.on('data', function(chunk){
  console.log(chunk.toString());
});

stream.on('end', function(){
  console.log('Done reading file.');
});
