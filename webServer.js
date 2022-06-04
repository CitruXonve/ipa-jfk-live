/* jshint node: true */

let express = require('express');
let { readFile } = require('fs');

let portno = 3000; // Port number to use

let app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.redirect('/ipa-jfk.html');
});

app.get('/data/cmudict.txt', (req, res) => {
  readFile('./data/cmudict.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Failed to retrieve cmudict data', err.message());
      res.status(404).send('Failed to retrieve cmudict data');
      return;
    }

    res.status(200).send(data);
  });
});

let server = app.listen(portno, () => {
  let port = server.address().port;
  console.log(`Listening at http://localhost:${port} exporting the directory ${__dirname}`);
});
