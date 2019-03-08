var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var movieDB = require('./movieDB');
var mongoose = require('mongoose');
var verifyToken = require('./verifyToken')

//var moviesschemas = require('./movieDB')
mongoose.connect('mongodb://localhost/moviedb1');
//var ObjectId = mongoose.Schema.Types.ObjectId;

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
var Movie = require('./movie')

//CREATE a new movie
router.post('/new',verifyToken, (req, res) => {
    var body = req.body;
    if (!body.id ||!body.title || !body.description || !body.year) {
        return res.status(400).send('Todo bad en new movie')
    }
    //var movie = new Movie(body.title, body.description, body.year);
    //TODO save to db

    this.movie = new movieDB({
        id: body.id,
        title: body.title,
        description: body.description,
        year: body.year
    });
    this.movie.save()
        .then(doc => console.log(doc))
        .catch(err => console.log("err"))

    res.status(201).send(this.movie);
})

router.get('/:id', verifyToken, (req, res) => {
    var query = movieDB.findOne({ "id": req.params.id });
    query.exec((err, movie) => {
        if (err || !movie) {
            return res.status(404).send('Movie not found:' +err);
        }
        var nmovie = new Movie(movie.title, movie.description, movie.year)
        res.status(200).send(nmovie)
    })
})

router.patch('/:id', verifyToken, (req, res) => {
    var body = req.body;
    var updates = {}
    if(body.title){
        updates.title = body.title
    }
    if(body.description){
        updates.description = body.description
    }
    if(body.year){
        updates.year = body.year
    }
    var query = movieDB.findOneAndUpdate({ "id": req.params.id }, updates);
    query.exec((err, movie) => {
        if (err || !movie) {
            return res.status(404).send('Movie not found:' +err);
        }
        res.status(200).send("Updated succesfully")
    })
})

router.delete('/:id', verifyToken, (req, res) => {
    var query = movieDB.findOneAndDelete({ "id": req.params.id });
    query.exec((err, movie) => {
        if (err || !movie) {
            return res.status(404).send('Movie not found:' +err);
        }
        res.status(200).send("Deleted succesfully")
    })
})

router.get('/', (req, res) => {

    var query = movieDB.find();
    query.exec((err, movie) => {
        if (err || !movie) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(movie)
    })
})
var movieSchema = new mongoose.Schema(Movie);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected in movies controller!");
    var movie = mongoose.model('movieData', movieSchema);
});
module.exports = router