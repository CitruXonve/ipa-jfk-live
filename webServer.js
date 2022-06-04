'use strict';

/* jshint node: true */

var express = require('express');

var portno = 3000;   // Port number to use

var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
