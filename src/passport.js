const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('./models/user');

// set up passport configs
passport.use(new GoogleStrategy({
  clientID: '802188459296-h1gska49bie30n68mti8d07tosc5rc7d.apps.googleusercontent.com', //change this 
  clientSecret: 'h7n4UrnZk18vLKjBH6uzPn0u',//change this 
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
        color: 'blue'
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



// ALL PASSPORT STUFF VVV // 

// hook up passport
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/signin' }
  ),
  function(req, res) {
    res.redirect('/');
  }
);