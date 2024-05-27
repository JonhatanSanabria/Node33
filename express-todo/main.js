const express = require("express")

const server = express()
server.use(express.json)

const todos = []

server.get("/todos", (req, res) => {
    res.json({
        message: "all todos",
        todos: todos
    })
})

server.post("/todos", (req, res) => {
    const newTodo = req.body.todos
    todos.push(newTodo)
    if(!newTodo){
        res.status(400)
        res.json({
            message: "new todo added",
            todos: todos
        })
        return
    }
})

server.delete("/todos/:idx", (req, res) => {
    const idx = req.params.idx
    const indexInteger = parseInt(idx)
    if (isNaN(indexInteger)){
        res.status(400)
        res.json({
            message: "Invalid index, must be a number"
        })
        return
    }
    if (indexInteger < 0 || indexInteger >= todos.length){
        res.status(400)
        res.json({
            message: "Invalid index, out of bound"
        })
        return
    }
    todos.slice(idx, 1)
    res.status(400)
    res.json({
        message: "todo deleted successfully",
        todos: todos
    })
})


server.listen(8080, () => {
    console.log("Server is running on port 8080")
})