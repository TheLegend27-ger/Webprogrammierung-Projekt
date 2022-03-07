let router = require('express').Router();
const { handleLogin, handleRegistration } = require('../auth');

// Homepage
router.get('/', function(req,res) {
    res.render ('index', {
        userName: req.session.user,
        pageTitle: "Spieleprofis!"
    });
});

// Games
router.get('/games/*', function (req, res) {
    res.render(`games/${req.params[0]}`, {
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

module.exports = router;