var express = require('express');
var router = express.Router();
var Note = require('../model/note.js')


router.get('/notes', function (req, res, next) {
  Note.findAll({raw: true}).then(notes => {
    let data = {}
    data.status = 0
    data.notes = notes
    res.send(data)
  })
})
router.post('/note/create', function (req, res, next) {
  let note = req.body.note
  Note.create({text: note}).then(
    () => {
      res.send({status: 0})
    }
  ).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})
router.put('/note/edit', function (req, res, next) {
  Note.update({text: req.body.note}, {where: {id: req.body.id}})
    .then(() => {
      // console.log(arguments)
      res.send({status: 0})
    })
})

router.delete('/note/delete', function (req, res, next) {
  // res.send('delete')
  Note.destroy({where: {id: req.body.id}})
    .then(() => {
        res.send({status: 0})
      }
    )
})
module.exports = router;
