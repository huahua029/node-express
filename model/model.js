let mongoose = require('mongoose')
let Schema = mongoose.Schema

let NoteSchema = new Schema({
  createdAt: {type: Date, default: Date.now},
  text: String,
  value: Number,
  finish: {type: Boolean, default: false},
  uid: Number
})

// mongoose.model('User',UserSchema)
let Note = mongoose.model('Note', NoteSchema)

module.exports = Note
