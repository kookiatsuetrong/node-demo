var express = require('express')
var app = express()
var body = require('body-parser').urlencoded({extended: false})
app.listen(2000)
var mysql = require('mysql');
var db = {
	host:'128.199.119.79',
	user:'imarket',
	password:'p@ssword',
	database:'imarket'
}
var pool = mysql.createPool(db)

app.engine('html', require('ejs').renderFile)
app.get('/', showHome)
app.get('/list', showList);
app.get ('/register', showRegisterPage)
app.post('/register', body, saveNewUser)
app.get ('/login', showLogInPage)
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

function showList(req, res) {
	pool.query('select * from post',
		function (error, data) {
			res.render('list.html', {post: data})
		}
	)
}

function showRegisterPage(req, res) {
	res.render('register.html')
}

function saveNewUser(req, res) {
	pool.query(`
		insert into member(email, password, name)
		values(?, sha2(?, 512), ?)
	`, [req.body.email, req.body.password, req.body.fullname],
	function (error, data) {
		res.redirect('/login')
	})
}

function showLogInPage(req, res) {
	res.render('login.html')
}