/* jshint node: true */

const express = require('express');
const { readFile } = require('fs');
const favicon = require('serve-favicon');
const path = require('path');

const portno = 3000; // Port number to use

const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));

// serving a favicon
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

app.get('/', (req, res) => {
  res.redirect('/ipa-jfk.html');
});

app.get('/assets/:file_name', (req, res) => {
  const fileName = req.params.file_name;
  readFile(`./data/${fileName}`, 'utf8', (err, data) => {
    if (err) {
      console.error(`Failed to retrieve ${fileName} data`, err.message());
      res.status(404).send(`Failed to retrieve ${fileName} data`);
      return;
    }

    res.status(200).send(data);
  });
});

const server = app.listen(portno, () => {
  const port = server.address().port;
  console.log(`Listening at http://localhost:${port} exporting the directory ${__dirname}`);
});
