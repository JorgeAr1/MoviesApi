var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var userschemas = require('./userDB')
router.use(bodyParser.urlencoded({extended: true}))
router.use(bodyParser.json())

var verifyToken = require('./verifyToken')
var jwt = require('jsonwebtoken')
var User = require('./user')

var secret = "SuperSecretKey"

router.post('/', (req, res) => {
    var body = req.body;

    var query = userschemas.findOne({ "email": body.email, "password":body.password });
    query.exec((err, user) => {
        if (err || !user) {
            return res.status(404).send('User not found');
        }
        var nuser = new User(user.name,user.mail,user.password)
        var token = jwt.sign(nuser.toJson(), secret, {
            expiresIn: 86400 // 24 horas
        });
        res.status(200).send({auth: true, token: token})
    })
});

router.get('/me', verifyToken,  (req, res) => {
    res.status(200).send(req.user)
})
router.post('/logout', (req, res) =>{
    res.status(200).send({auth: true, token: "disabled"})
});

module.exports = router