/* jshint node: true */

let express = require('express');

let portno = 3000; // Port number to use

let app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.redirect('/ipa-jfk.html');
});

let server = app.listen(portno, function () {
  let port = server.address().port;
  console.log(`Listening at http://localhost:${port} exporting the directory ${__dirname}`);
});
