var express = require('express')
var app = express()
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/test');

app.get('/api', (req, res)=> {
    res.status(200).send('Api works');
})

var userController = require('./userController')
var authController = require('./authController')
var movieController = require('./movieController')
app.use('/users', userController);
app.use('/login', authController);
app.use('/movies', movieController);

var port = 3000;
app.listen(port, () => {
    console.log('Express server is listening on port ' + port)
})