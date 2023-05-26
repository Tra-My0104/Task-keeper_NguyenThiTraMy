const express = require("express");
const bodyparser = require("body-parser");
const server = express();
const database = require("./conection");
const port = 3000;
const morgan = require("morgan");
const cors = require("cors");

server.use(bodyparser.json());
server.use(bodyparser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());


server.get("/api/v1/task", (req, res) => {
  const query = "select * from task";
  database.query(query, (err, result) => {
    if (err) {
      res.status(500);
      console.log("không lấy được dữ liệu");
    } else {
      res.status(200).json({
        mesage: "OK",
        data: result,
      });
    }
  });
});

server.post("/api/v1/task", (req, res) => {
  const { Content, Duedate, Statustask, Assigned } = req.body;
  const value = [Content, Duedate, Statustask, Assigned];
  const query = "insert into task(Content, Duedate, Statustask, Assigned) values (?,?,?,?)";
  database.query(query, value, (err, result) => {
    console.log(value);
    if (err) {
      console.log("kết nối thất bại");
      res.status(500);
    } else {
      return res.status(200).json({
        status: "success",
        data: result,
      });
    }
  });
});


server.put("/api/v1/task/:id" , (req,res) => {
    const {id} = req.params;
    const { Content, Duedate, Statustask, Assigned } = req.body;
    const values = [Content, Duedate, Statustask, Assigned, id];
    const query = 'UPDATE task SET Content=?, Duedate=?, Statustask=?, Assigned=? WHERE TaskId=?';
    
    database.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "error",
          message: "Có lỗi xảy ra khi cập nhật task",
          data: null
        });
      }
      
      return res.status(200).json({
        status: "success",
        message: "Cập nhật task thành công",
        data: result,
      });
    });
  });


server.delete("/api/v1/task/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM task WHERE TaskId=?";
    database.query(query, id, (err, result) => {
      if (err) {
        console.log("kết nối thất bại");
        res.status(500);
      } else {
        return res.status(200).json({
          status: "success",
          message: "Xóa thành công",
          data: result,
        });
      }
    });
  });

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
