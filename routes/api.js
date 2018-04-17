var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.10.3',
    user     : 'root',
    password : 'root',
    database : 'mediabase'
});

var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

/* GET home page. */
router.get('/books', function(req, res, next) {
    var response = [];
    var sql = "SELECT * FROM books";
    connection.query(mysql.format(sql), function (err, rows, fields) {
        if (err) throw err;
        console.log(rows.length);
        for(var i = 0; i< rows.length;i++){
            console.log(rows[i].Title);
            response[i] = {
                "Artwork": rows[i].Artwork,
                "Title": rows[i].Title
            }
        }
        res.send(JSON.stringify(response));
    });
});
router.put('/book', function(req, res){
    console.log(req.body);
    var item = req.body;
    var isbn = item.volumeInfo.industryIdentifiers[0].identifier;
    var title = item.volumeInfo.title;
    var artwork_url = item.volumeInfo.imageLinks.smallThumbnail;
    console.log(artwork_url);
    download(artwork_url, 'artwork.jpeg', function(){
        console.log('done');
        var artwork = base64_encode('artwork.jpeg');
        var values = [isbn,title,artwork];
        console.log(values);
        var sql = "INSERT INTO books (isbn,title,artwork) VALUES (?,?,?)";
        connection.query(mysql.format(sql,values), function (err, rows, fields) {
            if (err) throw err;
        });
    });
});
router.put('/album', function(req, res){
    console.log(req.body);
    /*
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err

        console.log('The solution is: ', rows[0].solution)
    });*/
});


module.exports = router;
