const logger     = require('morgan');
const bodyParser = require('body-parser');
const express    = require('express');
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

// https://github.com/expressjs/session
app.use(session({
  saveUnitiliazed: true,
  resave: true,
  secret: 'superSecretCodez',
  cookie: {maxAge: 12000000}
}))

app.use('/api', apiRoute)

app.listen(port, () => {
  console.log('Server is listening on port', port);
})
