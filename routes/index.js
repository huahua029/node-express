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
  let uid = parseInt(Math.random() * 1000000)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.cookie('uid', uid)
  User.find({"username": username}).then(
    (data) => {
      console.log(data);
      if (data.length) {
        res.send({status: 1, errorMsg: '已注册'})
      } else {
        res.send({status: 0})
        User.create({username, password, uid})
      }
    }
  )
})

router.post('/login', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  let username = req.body.username
  let password = req.body.password
  User.find({username: username, password: password}).then(
    (data) => {
      if (data.length) {
        res.send({status: 0,notes: data})
      } else {
        res.send({status: 1, errorMsg: '未注册'})
      }
    }
  ).catch(() => {
    res.send({status: 1, errorMsg: '数据库出错'})
  })
})

router.get('/logout', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Credentials', true)
  let uid = req.cookies.uid
  res.cookie('uid', uid, {expires: new Date(Date.now())})
  res.send('logout')
})

module.exports = router;
