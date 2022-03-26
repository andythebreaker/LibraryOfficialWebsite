var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var RateLimit = require('express-rate-limit');
var session = require('express-session');
var randomstring = require("randomstring");
const { body, validationResult } = require('express-validator');
const SocketServer = require('ws').Server;
const robots = require('express-robots-txt');
var minifyHTML = require('express-minify-html-2');

/********************* */
var Grid = require('gridfs-stream'),
    upload = require('jquery-file-upload-gridfs-middleware');
    var    Db = require('mongodb').Db;
    var   Server = require('mongodb').Server;
    var   MongoClient = require('mongodb').MongoClient;
    /////////////////////////////////////////////////

//add new module
var flash = require('connect-flash');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var debug = require('debug')('libraryofficialwebsite:app');


var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60 * 1000 * 1000 //1000*1000/1sec max
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var toolRouter = require('./routes/tool');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: 10485760 }));//rest-payload-10mb-max
app.use(express.urlencoded({ extended: false, limit: 10485760 }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// Handle Sessions
app.use(session({
  secret: randomstring.generate(100),
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(limiter);
require('express-file-logger')(app, {
  showOnConsole: false,
  bodyDetails: false
})//express log to file
app.use(minifyHTML({
  override: true,
  exception_url: false,
  htmlMinifier: {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    minifyJS: true
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', mainRouter);
app.use('/tool', toolRouter);
app.use('/upload', uploadRouter);

/**********************copy from models users.js************************** */
const mongoDBuserName = "linjsing";
const mongoDBpsw = process.env.linjsing;
const mongoDBdataBaseName = "maindb";
const uri = process.env.DBurl || `mongodb+srv://${mongoDBuserName}:${mongoDBpsw}@cluster0.iupxg.mongodb.net/${mongoDBdataBaseName}?retryWrites=true&w=majority`;
/**********************copy from models users.js************************** */var b = uri.split('/');
var c = ''; b.forEach((o, i) => { if (i !== b.length - 1) { c += o; } if (i === 1) { c += '//'; } }); console.log(c);
var gfs =null;
MongoClient.connect( uri, function (err, client) {
    console.log(err);
    // Select the database by name
    const db = client.db(c[c.length - 1]);console.log("1");
 gfs = Grid(db, mongo);
    console.log("2");

});
upload.configure({
  uploadDir: '/public/uploads',
  mongoGfs: gfs,
  imageVersions: {
      thumbnail: {
          width: 80,
          height: 80
      }
  }
});
app.use('/upload', 
      upload.fileHandler());
      var bodyParser = require('body-parser')
      app.use(bodyParser);

app.use(robots({
  UserAgent: '*',
  Disallow: ['/users/login', '/main'],//allow every things
  CrawlDelay: '5',
  Sitemap: 'https://library.math.ncku.edu.tw/sitemap.xml',
}))

//get/post
app.get('*', function (req, res, next) {
  //console.log((!req.user) ? "[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[nouser]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]" : req.user);
  res.locals.user = req.user || null;
  next();
});

app.post(
  '/user',
  body('username').isEmail(),
  body('password').isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      username: req.body.username,
      password: req.body.password,
    }).then(user => res.json(user));
  },
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

debug('started app');

module.exports = app;

/*TODO
package json sort按字母排序
*/