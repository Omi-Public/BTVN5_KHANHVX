const {connection} = require('./db');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

/** GET user information by username and password */
app.get('/user', function (req, res){
  const id = req.params.id;
  connection.query('SELECT * FROM tbl_user WHERE id=?',[id], function (error, results, fields) {
    res.send(results)
  })
})

/** GET login */
app.get('/login', function (req, res){
  const username = req.params.username;
  const password = req.params.password;
  connection.query('SELECT * FROM tbl_user WHERE username=? AND password=?',[username, password], function (error, results, fields) {
    if (results) {
      res.send(results);
    } 
    else {
      res.send("Không tìm thấy user");
    }
  })
})

/** POST register user */
app.post('/register', async function (req, res){
  const username = req.params.username;
  const password = req.params.password;
  const age = req.params.age;
  const country = req.params.country;
  const date_of_birth = req.params.date_of_birth;
  
  console.log(req.params);
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