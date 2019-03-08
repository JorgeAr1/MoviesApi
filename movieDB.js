let mongoose = require('mongoose')

let movieSchema = new mongoose.Schema({
  id:{type:String,unique:true},
  title: String,
  description: String,
  year: String
})

module.exports = mongoose.model('MoviesSchema', movieSchema)