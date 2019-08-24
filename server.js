const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-locals');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const router = require('./app/routes/index');
const db = require('./app/config/db.config');

// force: false will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
    console.log('Drop and Resync with { force: true }');
    // initial();
});


// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('public', path.join(__dirname, 'public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 600000
  }
}));


// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
  next(err);
  res.status(404).render('404', {title: "Sorry, page not found"});
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;