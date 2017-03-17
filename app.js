var express = require('express')
var app = express()
app.listen(80)
app.get('/status', showStatus)

function showStatus(req, res) {
  res.send({status:'OK'})
}
