const logger     = require('morgan');
const express    = require('express');
const bodyParser = require('body-parser');
const session    = require('express-session');
const cookieParser = require('cookie-parser');
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
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser("sdd", {signed: true}))
// https://github.com/expressjs/session
app.use(session({
  secret: 'superSecretCodez',
  resave:true,
  saveUninitialized:true,
  cookie: { maxAge: 60000 }
}))

app.use('/api', apiRoute)

app.listen(port, () => {
  console.log('Server is listening on port', port);
})
