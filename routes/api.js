var express = require('express');
let mongoose = require('mongoose')
var router = express.Router();
let Note = require('../model/model.js')

let conn = mongoose.connect('mongodb://localhost:27017/test')

router.get('/notes', function (req, res, next) {
  Note.find({"username": req.body.username}).then(notes => {
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
  let uid = req.cookies.uid
  Note.create({text,value,uid}).then(
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
  Note.updateOne({'_id': req.body.id},{finish: true})
    .then(() => {
      res.send({status: 0})
    })
})
router.post('/note/edit', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  Note.updateOne({"_id": req.body.id},{text: req.body.text})
    .then(() => {
      res.send({status: 0})
    })
})

router.post('/note/delete', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  Note.findOneAndDelete({'_id': req.body.id})
    .then(() => {
        res.send({status: 0})
      }
    )
})
module.exports = router;
