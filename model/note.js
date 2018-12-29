const Sequelize = require('sequelize');
let path = require('path')

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});


const Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  value: {
    type: Sequelize.INTEGER
  },
  finish: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Note.sync()

Note.findAll().then(users => {
  console.log(users)
})

module.exports = Note;