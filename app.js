require('./db/db.js');

var passport      = require('passport');
var flash         = require('connect-flash');
var morgan        = require('morgan');
var cookieParser  = require('cookie-parser');
var configDB      = require('./config/database.js');
var session       = require('express-session');
var express       = require('express');
var path          = require('path');
var bodyParser    = require('body-parser');

var app = express();

app.set("port",8080);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
// app.use(require('express-session')({
//   secret: 's3cr3t14d3m3ur3d314rc|-|3',
//   resave: false,
//   saveUnitialized: false,
//
// }));


//PASSPORT ===================================================================
// set up our express application


// Permet la co
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
require('./config/passport')(passport);
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persitent login session
app.use(flash()); // use connect-flash for flash message stored in session

// ROUTES =====================================================================================================
require('./routes')(app, passport); //load our routes ans pass in our app and fully configured passport


var server = app.listen(app.get("port"), function(){
    console.log("Le serveur tourne sur "+server.address().address+":"+server.address().port)
});
