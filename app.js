var express = require('express')
var app = express()
app.listen(2000)
app.engine('html', require('ejs').renderFile)

app.get('/', showHome)

app.get('/status', showStatus)

function showStatus(req, res) {
  res.send({status:'OK'})
}

function showHome(req, res) {
  res.render('index.html')
}