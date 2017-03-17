var express = require('express')
var app = express()
app.listen(2000)
app.engine('html', require('ejs').renderFile)
app.get('/', showHome)
app.get('/status', showStatus)
app.use( express.static('public') )
app.use( showError )

function showStatus(req, res) {
  res.send({status:'OK'})
}

function showHome(req, res) {
  res.render('index.html')
}

function showError(req, res) {
  res.render('error.html')
}