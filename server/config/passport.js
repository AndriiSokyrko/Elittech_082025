const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const {User} = require('../models/User');
const jwt = require("jsonwebtoken");


const secretKey = process.env.SECRET_KEY;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};


passport.use('jwt',new Strategy(opts, async (token, done) => {
    try {
        const user = await User.findOne({where:{id:token.id}});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (e) {
        return done(e, false);
    }
}));
const optsForRole = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
    passReqToCallback: true,  // <- добавляем!
};
passport.use('role',new Strategy(optsForRole, async (req, token, done) => {
    if (req.method === 'OPTIONS') {
        done(null, true)
    }
    try {
        if (token.role ==='USER' ) {
            return done(null, false, { message: "Access for USER isn't allowed" });
        }
        done(null, token)
    } catch (e) {
        return done(e, false);
    }
}));