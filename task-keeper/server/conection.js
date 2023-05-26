const mysql = require("mysql");

const connection=mysql.createConnection({
    host:"localhost",
    password:"12345678",
    user:"root",
    port:"3306",
    database:"note",
});

connection.connect((err) => {
    if (err) {
      console.log("k kết nối được");
    } else {
      console.log("kết nối thành công");
    }
  });
  
  module.exports = connection;