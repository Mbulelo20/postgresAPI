const express = require('express');
const cors = require('cors');
const pool = require("./db.js");

const app = express();
app.use(cors())
app.use(express.json());

// Routes ...

app.post("/todo", async (req, res) => {
    try {
        const {description }= req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/todo", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch (error) {
        console.error(error.message)
    }
})

app.get("/todo/:id", async (req, res) => {
    try {
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [req.params.id])
    } catch (error) {
        console.error(error.message)
    }
})


app.put("/todo/:id", async (req, res) => {
    try {
        const {description} = req.body;
        const {id} = req.params;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id])

        res.json("Todo has been updated!")
    } catch (error) {
        console.error(error.message)
    }
})
app.listen(5000, () => {
    console.log("server is running ...")
})