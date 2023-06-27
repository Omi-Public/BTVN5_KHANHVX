const {connection} = require('./db');
var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});
app.post('/', async function(req, res){
  // console.log(req.query);
  // console.log(req.params);
  // console.log(req.);

  res.json(req.query);
});

app.get('/user', function (req, res){
  var id = req.query.id;
  connection.query('SELECT * FROM tbl_user WHERE id=?',[id], function (error, results, fields) {
    res.send(results)
  })
})

app.post('/create', async function (req, res){
  var username = req.query.username;
  var password = req.query.password;
  // res.send(username);
  connection.query('Insert into tbl_user(`username`, `password`) values(?,?)',[username, password],function (error, results, fields) {
    res.send(results)
  });
  var user = await connection.query('SELECT * FROM tbl_user where id = 1', function (error, results, fields) {
    res.send(results)
  });
  // res.json(JSON.stringify(user));
  // res.send(user);
});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", 'localhost', port)
})