var express = require('express');
var router = express.Router();
var Note = require('../model/note.js')


router.get('/notes', function (req, res, next) {
  Note.findAll({raw: true}).then(notes => {
    let data = {}
    data.status = 0
    data.notes = notes
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.send(data)
  })
})
router.post('/note/create', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  let text = req.body.text
  let value = req.body.value
  Note.create({text, value}).then(
    () => {
      res.send({status: 0})
    }
  ).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})
router.post('/note/finish', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  Note.update({finish: true}, {where: {id: req.body.id}})
    .then(() => {
      res.send({status: 0})
    })
})
router.post('/note/edit', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  Note.update({text: req.body.text}, {where: {id: req.body.id}})
    .then(() => {
      res.send({status: 0})
    })
})

router.post('/note/delete', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  Note.destroy({where: {id: req.body.id}})
    .then(() => {
        res.send({status: 0})
      }
    )
})
module.exports = router;
