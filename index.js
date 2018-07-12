const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const config = require('./config');

const passport = require('passport');

const signup = require('./routes/signup');
const signin = require('./routes/auth');
const test = require('./routes/test-auth');

const app = express();

mongoose.Promise = bluebird;
// mongoose.set('debug', true);
mongoose.connect(config.database, err => {
    if (err) {
        throw err
    }

    console.log('Connect to database');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./midlewares/passport')(passport);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(signup);
app.use(signin);
app.use(test);
// app.use(errorHandler);

// app.get('/test', passport.authenticate('jwt', {session: false}), function (req, res) {
//     console.log(res);
//     res.send('hello');
// });

// require('./midlewares/passport')(passport);
// require('./routes/auth')(app, passport);

app.listen(config.port, () => console.log(`Server start ${config.port} port`));
