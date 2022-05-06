const {authenticate} = require('passport');
var strategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var authBody = {};
const passport = require('Passport');
const user = require('./models/user');
require('dotenv').config();

authBody.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
authBody.secretOrKey = process.env.SECRET;

passport.use('authToken', new strategy(authBody,async(jwtPayload,done)=>{
    return await user.findOne({where:{id:jwtPayload.sub}})
        .then(user=>{
            return done(null,jwtPayload);
        })
        .catch(err=>{
            return done(err);
        });
}))

module.exports = passport;