const logger     = require('morgan');
const express    = require('express');
const bodyParser = require('body-parser');
const session    = require('express-session');
const path       = require('path');
const apiRoute   = require('./routes/api');
const webpack    = require('webpack');
const config     = require('./webpack.config');

const app        = express();
const compiler   = webpack(config);
const port       = process.env.PORT || 3000



app.use(express.static(path.join(__dirname, 'dist')));
app.use(logger('dev'))
// app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// https://github.com/expressjs/session
app.use(session({
  saveUnitiliazed: true,
  resave: true,
  secret: 'superSecretCodez',
  cookie: {maxAge: 12000000}
}))

app.use('/api', apiRoute)

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.dev.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true
  }))
}

app.listen(port, () => {
  console.log('Server is listening on port', port);
})
