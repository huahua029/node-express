let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  username: String,
  password: String,
  uid: Number
})

let User = mongoose.model('User', UserSchema)

module.exports = User
