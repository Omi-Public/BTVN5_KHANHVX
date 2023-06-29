const {connection} = require('./db.js');
const md5 = require('md5');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

/** GET user information by username and password */
app.get('/user', async function (req, res){
  const id = req.query.id;
  console.log(connection);
  connection.query('SELECT * FROM tbl_user WHERE id=?',[id], function (error, results, fields) {
    res.send("Xin chao " + results[0].username);
  })
})

/** GET login */
app.get('/login', async function (req, res){
  const username = req.query.username;
  const password = md5(req.query.password);
  connection.query('SELECT * FROM tbl_user WHERE username=? AND password=?',[username, password], function (error, results, fields) {
    if (results) {
      res.send("Xin chao " + results[0].username);
    } 
    else {
      res.send("Không tìm thấy user");
    }
  })
})

/** POST register user */
app.post('/register', async function (req, res){
  const username = req.query.username;
  const password = md5(req.query.password);
  const age = req.query.age;
  const country = req.query.country;
  const date_of_birth = req.query.date_of_birth;
  
  console.log(req.query);
  connection.query('INSERT INTO tbl_user(`username`, `password`, `age`, `country`, `date_of_birth`) values(?, ?, ?, ?, ?)',
    [username, password, age, country, date_of_birth],
    function (error, results, fields) {
      res.send(results);
    }
  );
});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", 'localhost', port)
})