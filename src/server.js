const path = require('path');
const express = require('express');
const mustacheExpress = require('mustache-express');

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

// Serve views via routes
app.use ('/', routes);
app.use(express.static('src'))

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});





//region CommentHandling


  let comments = [];

  function addComment(){
    let commentText = document.getElementById("CommentTextField").textContent
    let userID = "HIER USER ID AUS COOKIE LESEN"
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










