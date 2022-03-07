let router = require('express').Router();

// Homepage
router.get('/', function(req,res) {
    res.render ('index', {pageTitle: "Spieleprofis!"});
});

// Games
router.get('/games/*', function (req, res) {
    res.render(`games/${req.params[0]}`, {pageTitle: req.params[0]});
});

// Other pages
router.get('/impressum', function (req,res) {
    console.log(req.params)
    res.render('impressum')
})

module.exports = router;