const express = require("express")

const app = express()

const PORT = 3000

const koders = [
    {
    name: "Omar",
    age: 20
},
{
    name: "Juan",
    age: 21
}]

// desabilita nuestro servidor para recibir peticiones en formato json
app.use(express.json)

app.get("/", (req, res) => {
    console.log("GET root")
    res.end("Hola desde root GET!")
    res.writeHead(200, {
        "Content-Type": "text/plain"
    })
})

app.get("/koders", (req, res) => {/*
    console.log(JSON.stringify(koders))
    res.writeHead(200, {
        "Content-Type": "application/json"
    })
    res.end("Hola koders")*/
    res.status(500)
    res.json(koders)
})

app.post("/", (req, res) => {
    console.log("POST root")
    res.end("Hola desde root POST!")
})

app.post("/koders", (req, res) => {
    console.log("body", req.body)
    const newKoderName = req.body.name
    const newKoderAge = req.body.age
    const newKoder = {
        name: newKoderName,
        age: newKoderAge
    }
    koders.push(newKoder)
    res.json(koders)
})

// Ponemos al servidor a escuchar
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})