var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/books', function(req, res, next) {
    res.render('library/books', { title: 'Books Library' });
});
router.get('/albums', function(req, res, next) {
    res.render('library/albums', { title: 'Album Library' });
});

module.exports = router;
