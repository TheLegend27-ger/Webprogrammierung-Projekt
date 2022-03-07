const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');
var session = require('express-session');

// Requires
const routes = require('./routes');

// Constants
const port = 8080;
const app = express();

//Variables



// Set and configure view engine mustache
app.set('view engine', 'mustache')
app.set('view cache', false)
app.set('views', path.join(__dirname, '/views')); // Sets the path where the templates are found
app.engine('mustache', mustacheExpress(path.join(__dirname, '/views/partials'), '.mustache')); // Sets the path for partials

// Create session
// All copied from https://github.com/expressjs/express/blob/master/examples/auth/index.js
app.use(express.urlencoded({ extended: false })); // I don't understand why I need this...
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'shhhh, very secret'
}));




// Serve views via routes
app.use ('/', routes);
app.use(express.static('src'))

app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});


app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});





//region CommentHandling


  let comments = [];

  function addComment(){
    let commentText = document.getElementById("CommentTextField").textContent
    let userName = "HIER USERNAME AUS COOKIE LESEN"
    let site = "Seite die vom Comment betroffen ist speichern"
    this.comments.push({commentText, userID, userName, site})
    console.log(this.comments)
  }
  function commentBuilder(comment){

    let frag = document.createDocumentFragment()

  }
  function displayComments(){
    this.comments.forEach(this.commentBuilder(comment))
  }


//endregion










