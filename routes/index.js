var express = require('express');
let mongoose = require('mongoose')
var router = express.Router();
let User = require('../model/User.js')

let conn = mongoose.connect('mongodb://localhost:27017/test')

router.get('/', function (req, res, next) {
  res.send('首页')
})
// router.get('/login', function(req, res, next) {
//   res.send('login')
// })

router.post('/register', function (req, res, next) {
  let username = req.body.username
  let password = req.body.password
  let uid = Math.random() * 1000000
  res.setHeader('Set-Cookie', `uid=${uid}`)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  User.create({username, password, uid}).then(
    () => {
      res.send({status: 0})
    }
  ).then(
    User.find().then(
      x=>console.log(x)
    )
  )
})

router.post('/login', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  let username = req.body.username
  let password = req.body.password
  let uid = Math.random() * 1000000
  User.find({username: username,password:password}).then(
    (data) => {
      if (data.length) {
        console.log(typeof data)
        res.send({status: 0})
      } else {
        res.send({status: 1, errorMsg: '未注册'})
      }
    }
  ).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

module.exports = router;
