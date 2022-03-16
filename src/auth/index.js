var hash = require('pbkdf2-password')();

// Replace with register page later
function getUsers(){return users}
function getUserKey(user) { return Object.keys(users).find(item => users[item].name === user.name); }
function setUsers(newUsers){this.users = newUsers}
var users = {
  test: 
  { 
    name: 'Test',
  }
};

hash({ password: 'test' }, function (err, pass, salt, hash) {
  if (err) throw err;
  // store the salt & hash in the "db"
  users.test.salt = salt;
  users.test.hash = hash;
});

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  var user = users[name];
  // query the db for the given username
  if (!user) return fn(null, null)
  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
    if (err) return fn(err);
    if (hash === user.hash) return fn(null, user)
    fn(null, null)
  });
}

function handleLogin(req, res, next) {
  authenticate(req.body.username, req.body.password, function(err, user){
    if (err) return next(err)
    if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function(){
            // Store the user's primary key
            // in the session store to be retrieved,
            // or in this case the entire user object
            req.session.user = user;
            req.session.success = 'Authenticated as ' + user.name
            + ' click to <a href="/logout">logout</a>. '
            + ' You may now access <a href="/restricted">/restricted</a>.';
            res.redirect('/');
        });
    } else {
        req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
        res.redirect('/login');
    }
  });
}

function handleRegistration(req, res, next) {
  hash({ password: req.body.password }, function (err, pass, salt, hash) {
    if (err) throw err;
    // store the salt & hash in the "db"
    users[req.body.username] = {
      name: req.body.name,
      salt,
      hash
    }
    res.redirect('/login');
  });
}



module.exports = { handleLogin, handleRegistration, setUsers, getUsers, getUserKey };