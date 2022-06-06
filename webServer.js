/* jshint node: true */

const express = require('express');
const { readFile } = require('fs');
const favicon = require('serve-favicon');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const portno = 3000; // Port number to use

const app = express();
const args = require('minimist')(process.argv.slice(2));
const config = require('./webpack.config.js')(undefined, args);
const compiler = webpack(config);

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));

// serving a favicon
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);

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
