const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/index');

module.exports = (passport) => {

    const parameters = {}
    parameters.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
    parameters.secretOrKey = config.secretkey

    passport.use(new JwtStrategy(parameters, (jwt_playload, done) => {
        User.findOne({id: jwt_playload.id}, (err, user) => {
            if(err) return done(err, false);
            if(user) done(null, user);
            else done(null, false);
        });
    }));

};