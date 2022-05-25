const {authenticate} = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var authBody = {}
const passport = require('passport')
const user = require('./models/user')
require('dotenv').config();

authBody.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
authBody.secretOrKey = "secret";

passport.use('token',new JWTStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey :"secret"
},async (jwtPayload,done)=>{
    return await user.findOne({where:{id:jwtPayload.sub}})
                .then(user=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))
passport.use('refresh',new JWTStrategy({
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "secret"
},async (jwtPayload,done)=>{
    return await user.findOne({where:{id:jwtPayload.sub}})
                .then(user=>{
                    return done(null,jwtPayload);
                })
                .catch(err=>{
                    return done(err);
                });
    }
))

module.exports = passport