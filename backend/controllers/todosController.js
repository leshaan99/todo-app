const db = require("../db");

exports.getTodos = (req, res) => {
  db.query("SELECT * FROM todos ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.addTodo = (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO todos (task) VALUES (?)", [task], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.updateTodo = (req, res) => {
  const { task } = req.body;
  db.query("UPDATE todos SET task=? WHERE id=?", [task, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};

exports.deleteTodo = (req, res) => {
  db.query("DELETE FROM todos WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
};
