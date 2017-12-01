var express    = require('express')
var app        = express()
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var path       = require('path')
var flash      = require('connect-flash')
var env        = require('dotenv').load()

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// FOR FLASH MESSAGES
app.use(flash());

// For Passport
app.use(session({ secret: process.env.PASSPORT_SECRET, resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//For EJS
app.set('views', './app/views')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/app/public')));

// Models
var models = require("./app/models");

// Load passport strategies
require('./app/config/passport/passport.js')(passport, models.User);

// Sync Database
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});

// Current User Local
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//Routes
var authRoute = require('./app/routes/auth.js')(app,passport);
var indexRoute = require('./app/routes/index');
var foodRoute = require('./app/routes/food');

app.use('/', indexRoute);
app.use('/food', foodRoute);

app.listen(5000, function(err){
    if(!err)
    console.log("Site is live"); else console.log(err)
});