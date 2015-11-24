var mongoose = require('mongoose');
var express = require('express');
var app = express();
var fs = require('fs');
var unicornsRouter = require(__dirname + '/routes/unicorns_routes')

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/unicorn_stream_dev');

// app.use('/api', unicornsRouter);

app.get('/:filename', function(req, res) {
  fs.start(__dirname + '/build/' + req.params.filename, function(err, stats) {
    if(err) {
      console.log(err);
      return next();
    }

    if (!stats.isFile()) return next();

    var file = fs.createReadStream(__dirname + '/build/' + req.params.filename);
    file.pipe(res);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
