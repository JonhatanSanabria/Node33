const fs = require("fs")

const dbFile = "db.json"

//
function updateTodos (todos) {
    const newTodos = { todos: todos }
    const newTodosAsString = JSON.stringify(newTodos)
    fs.writeFileSync(dbFile, newTodosAsString)
}

//
function getTodos () {
    const content = fs.readFileSync(dbFile, "utf8")
    return JSON.parse(content).todos
}

//
function add (task){
    const todos = getTodos()
    todos.push(task)
    updateTodos(todos)
}

//
function done (taskIndex){
    const todos = getTodos()
    todos.splice(taskIndex, 1)
    updateTodos(todos)
}

//
function ls (){
    const todos = getTodos()  
    if (!todos.length){
        console.log("EMPTY")
        process.exit()
    }
    todos.forEach((task, index) => {
        console.log(index, "_", task)        
    });  
}

//
function alv (){
    updateTodos([])
}

//
function init (){
    const fileExists = fs.existsSync(dbFile)
    if (!fileExists) {
        fs.writeFileSync(dbFile, JSON.stringify({ todos: [] }))
    }
}

//
function main (){
    const command = process.argv[2]
    const arg = process.argv[3]
    init()
    if (command === 'ls'){
        ls()
    } else if (command === 'add'){
        if (!arg){
            console.error("Missing task")
            process.exit(1)
        }
        add(arg)
        ls()
        console.log("Task added")
    } else if (command === 'done'){
        if (!arg){
            console.error("Missing task index")
            process.exit(1)
        }
        const index = parseInt(arg)
        if (isNaN(index)){
            console.error("Task index must be a number")
            process.exit(1)
        }
        const todos = getTodos()
        if (index < 0 || index >= todos.length){
            console.error("Invalid index")
            process.exit(1)
        }
        done(index)
        ls()
        console.log("Task completed!")
    } else if (command === 'alv'){
        alv()
        console.log("Algo Lindo Vendra")
    } else {
        console.log("Invalid command:", command)
        process.exit(1)
    }
}

main()