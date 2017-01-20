require('./db/db.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();

app.set("port",8080);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: 's3cr3t14d3m3ur3d314rc|-|3',
  resave: false,
  saveUnitialized: false,

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/home', routes);
app.use('/demeure', routes);
app.use('/sejours', routes);
app.use('/tourisme', routes);
app.use('/livre', routes);
app.use('/reservation', routes);
app.use('/contact', routes);


var server = app.listen(app.get("port"), function(){
    console.log("Le serveur tourne sur "+server.address().address+":"+server.address().port)
});
