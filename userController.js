var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var userDB = require('./userDB');
var mongoose = require('mongoose');
var verifyToken = require('./verifyToken')

mongoose.connect('mongodb://localhost/moviedb1');


router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
var User = require('./user')

//CREATE a new user
router.post('/new', (req, res) => {
    var body = req.body;
    if (!body.name || !body.email || !body.password) {
        return res.status(400).send('Todo bad en new user')
    }
    var user = new User(body.name, body.email, body.password);
    //console.log(user)
    //TODO save to db

    this.user = new userDB({
        name: body.name,
        email: body.email,
        password: body.password
    });
    this.user.save()
        .then(doc => console.log(doc))
        .catch(err => console.log("err"))

    res.status(201).send('Todo Good');
})

router.get('/', verifyToken, (req, res) => {
    var query = userDB.find()
    query.exec((err, user) => {
        if (err || !user) {
            return res.status(404).send('User not found');
        }
        res.status(200).send(user)
    })
})

var userSchema = new mongoose.Schema(User);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected in user controller!");
    var user = mongoose.model('movieUser', userSchema);
});
module.exports = router