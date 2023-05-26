import React from "react";
import "./Main.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Main(props) {
  const [task, setTask] = useState([]);
  const [taskNew, setTaskNew] = useState({
    Content: "",
    Duedate: "",
    Statustask: "",
    Assigned: "",
  });
  const [edit, setEdit] = useState(false);

  const { Content, Duedate, Statustask, Assigned } = taskNew;

  const handleChange = (e) => {
    console.log("sssss");
    setTaskNew({ ...taskNew, [e.target.name]: e.target.value });
  };

  // lấy dữ liệu từ backend về frontend
  const loadTask = async () => {
    console.log("dddd");
    try {
      const response = await axios.get("http://localhost:3000/api/v1/task");
      //   console.log(response.data.data);
      setTask(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(taskNew.Content);
    try {
      await axios.post("http://localhost:3000/api/v1/task", {
        Content: taskNew.Content,
        Duedate: taskNew.Duedate,
        Statustask: taskNew.Statustask,
        Assigned: taskNew.Assigned,
      });
      loadTask();
      setTaskNew("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/task/${id}`);
      loadTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    console.log("ffffff");
    try {
      await axios.put(`http://localhost:3000/api/v1/task/${taskNew.TaskId}`, {
        updateTask: taskNew,
      });
      setEdit(false);
      setTaskNew({
        Content: "",
        Duedate: "",
        Statustask: "",
        Assigned: "",
      });
      loadTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    setEdit(true);
    const findTask = task.find((e) => e.TaskId === id);
    setTaskNew(findTask);
  };

  useEffect(() => {
    console.log("123");
    loadTask();
  }, []);

  return (
    <>
      <form onSubmit={handleAdd}>
        <div className=" main">
          <input
            type="text"
            id="inputPassword6"
            className="form-control"
            value={Content}
            name="Content"
            onChange={handleChange}
          />

          <input
            type="date"
            id="inputPassword6"
            className="form-control"
            value={Duedate}
            onChange={handleChange}
            name="Duedate"
          />
          <select
            name="Statustask"
            className="form-select"
            value={Statustask}
            onChange={handleChange}
          >
            <option value="">Choose....</option>
            <option value="Pending">Pending</option>
            <option value="Fulfill">Fulfill</option>
            <option value="Reject">Reject</option>
          </select>
          <input
            type="text"
            id="inputPassword6"
            className="form-control"
            value={Assigned}
            onChange={handleChange}
            name="Assigned"
          />
          {edit ? (
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          )}
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">Due date</th>
            <th scope="col">Status</th>
            <th scope="col">Assigned to</th>
            <th scope="col" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {task.map((e, index) => {
            // const Duedate = new Date(e.Duedate);
            return (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{e.Content}</td>
                <td>{e.Duedate}</td>
                <td>{e.Statustask}</td>
                <td>{e.Assigned}</td>
                {edit ? (
                  <td>
                    <button type="button" className="btn btn-success" disabled>
                      Edit
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleEdit(e.TaskId)}
                    >
                      Update
                    </button>
                  </td>
                )}
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(e.TaskId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Main;
