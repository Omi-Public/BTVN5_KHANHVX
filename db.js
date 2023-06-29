const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Khanh2000",
    database: "training_5"
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

module.exports = {
    connection
}