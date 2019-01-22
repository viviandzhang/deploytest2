var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,//'547066553751-eg70ltf1pi9mhqcs7porv6qkv7g1aqv7.apps.googleusercontent.com', //i hope i did this right
  clientSecret: process.env.GOOGLE_CLIENT_SECRET, //'iuHIWS_WDHwFO907tnBDTI5v',//changed to our project secret- hope i did it right?
  callbackURL: '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
    //look up the user in database- if no user exists, create them and save to database
  User.findOne({
    'googleid': profile.id
  }, function (err, user) {
    if (err) return done(err);

    if (!user) { //redirect user to generate random llama page!!!
      user = new User({
        name: profile.displayName,//should change to llama name-- get element by ID? 
        googleid: profile.id,
        adjective: null,
        color: null
      });

      user.save(function (err) {
        if (err) console.log(err);

        return done(err, user);
      });
    } else {
      return done(err, user);
    }
  });
}));


//saves user info so you don't have to keep logging in again - cookies
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

module.exports = passport;



