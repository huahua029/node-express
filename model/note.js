const Sequelize = require('sequelize');
let path = require('path')

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname,'../database/database.sqlite')
});


const Note = sequelize.define('user', {
  text: {
    type: Sequelize.STRING
  }
})

Note.sync()


module.exports = Note;