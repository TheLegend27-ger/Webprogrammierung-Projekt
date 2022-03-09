let router = require('express').Router();
const { handleLogin, handleRegistration } = require('../auth');
var myRoute, myFullRoute

// Homepage
router.get('/', function(req,res) {
    res.render ('index', {
        userName: req.session.user,
        pageTitle: "Spieleprofis!"
    });
});

// Games
router.get('/games/*', function (req, res) {
    myFullRoute = `games/${req.params[0]}`
    myRoute = `${req.params[0]}`
    var myComments = setSiteComments(req.session.user)
    

    res.render(`games/${req.params[0]}`, {
        comments: myComments,
        userName: req.session.user,
        pageTitle: `${req.params[0].charAt(0).toUpperCase() + req.params[0].slice(1)} - Spieleprofis!`
    });
});

// Authentication
// Just for testing from the example at https://github.com/expressjs/express/blob/master/examples/auth/index.js
// router.use('/restricted', restrict);
// router.get('/restricted', function(req, res){
//     res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
// });

router.get('/login', function (req, res) {
    res.render('login', {
        userName: req.session.user,
        pageTitle: 'Login - Spieleprofis!'
    })
});

router.post('/login', handleLogin);

router.get('/register', function (req, res) {
    res.render('register', {
        userName: req.session.user,
        pageTitle: 'Registrieren - Spieleprofis!'
    })
})

router.post('/register', handleRegistration);

router.use('/logout', function(req, res){
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(function(){
        res.redirect('/');
    });
});

// Other pages
router.get('/impressum', function (req,res) {
    res.render('impressum', {
        userName: req.session.user,
        pageTitle: 'Impressum - Spieleprofis!'
    })
})

// Comments

router.post('/comments', function (req,res) {
    //console.log(req.session.user)
    
    let tempComment = {
      "date": dateBuilder(),
      "commentText":req.body.commentText,
      "userName":req.session.user.name,
      "site":myRoute,
      "likeList":[]
    }
    addComment(tempComment)
    res.redirect(myFullRoute)
})

router.use('/like', function(req,res) {
    if (req.session.user){
        switchlike(req.query.id,req.session.user.name )
    }else {
        res.redirect("/login")
    }
    
    res.redirect(myFullRoute)
});



var comments = [
    {
        "commentID":1,
        "date":"1923/09/12",
        "commentText":"TEXTHALLLOOOO",
        "userName":"Otto Biss ins Mark",
        "site":"kniffel",
        "likeList":["Otto Biss ins Mark","Trevor","Julius Caesar", "Longus Dickus", "Purche zu Poden Werfen"]
        },
        {
            "commentID":2,
            "date":"19244/029/132",
            "commentText":"TEXTHALLLOOOO",
            "userName":"Ernsthaft Thälmann",
            "site":"kniffel",
            "likeList":["Otto Biss ins Mark","Trevor","Julius Caesar", "Longus Dickus", "Purche zu Poden Werfen","t"]
            },
];



//region CommentHandling
  function setSiteComments(user){
    if (user){
        return getSiteComments(myRoute,req.session.user.name);
    }else {
        return getSiteComments(myRoute,"")
    }
  }
  function dateBuilder(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today = dd + '.' + mm + '.' + yyyy;
    return today
  }
  function switchlike(id, name){
    let myIndex = comments.findIndex(x=> x.commentID == id)
    console.log(comments[myIndex].likeList + "VORHER")
    let myInnerIndex = comments[myIndex].likeList.findIndex(x=> x == name)
    console.log(myInnerIndex + "  inner index")
    if (myInnerIndex > -1){
        comments[myIndex].likeList.splice(myInnerIndex,1)
    }else{
        comments[myIndex].likeList.push(name)
    }
    console.log(comments[myIndex].likeList + "NACHHER")
  }
  function getSiteComments(route, name){
    let tempComments =[]
    comments.forEach(element=>{
          if (element.site == route){
              //console.log(element.likeList)
            if (element.userName == name ){
                element.isMyComment = true
            }else {
                element.isMyComment = false
            }
            if (element.likeList.includes(name)){
                element.liked = true
                
            }else{
                element.liked = false
            }
            tempComments.push(element)
          }
      })
    //console.log(tempComments)
    return tempComments
  }
  function addComment(tempComment){
    tempComment.commentID = comments[comments.length-1].commentID + 1
    comments.push(tempComment)
    //console.log(comments)
  }

//endregion








module.exports = router;