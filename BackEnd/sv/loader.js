const app = require('./server');
//const router = require('../routes/main.route');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const models = require("../models/");
const expressValidator = require('express-validator'); 

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
  secret: 'webbookfca',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 60000,
    httpOnly: true,
  }
}));
app.use(expressValidator());
app.use(function(req, res, next) {
  // check if session exists
  if (global.sessData === undefined) {
    global.sessData = req.session;
    global.sessData.ID = req.sessionID;
  }
  else { // yes, cookie was already present
    console.log('session exists', global.sessData.ID);
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('../routes/auth.route.js')(app, passport);
require('../config/passport/passport.js')(passport, models.user);
//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});
//app.use('/', router);


//Forçar a utilização do router e a exportação da app

const suspectRouter = require("../routes/suspects.route");
app.use("/suspects", suspectRouter);

const participantsRouter = require("../routes/participants.route");
app.use ("/participants",participantsRouter);

const participationsRouter = require("../routes/participations.route");
app.use("/participations",participationsRouter);

const occurrencesRouter = require("../routes/occurrences.route");
app.use("/occurrences", occurrencesRouter);

const operationalRouter = require("../routes/operational.route");
app.use("/operationals",operationalRouter);

const materialsRouter = require("../routes/materials.route");
app.use("/materials",materialsRouter);

const evaluationsRouter = require("../routes/evaluations.route");
app.use("/evaluations",evaluationsRouter);

const usersRouter = require("../routes/auth.route");
app.use("/users",usersRouter);

module.exports = app;
