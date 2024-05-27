const express = require("express")
const koderUseCases = require("./koders.usecases")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.json({
        message: "Kodemia APIv1"
    })
})

server.get("/koders", (req, res) => {
    try {
        const koders = koderUseCases.getAll()
        res.json({
            message: "Koders list",
            data: {koders: koders}
        }) 
    } catch (error) {
        res.status(error.status || 500)
        res.json({
            error: error.message
        })
    }
})

server.post("/koders", (req, res) => {
    try{
        const newKoder = req.body
        const koders = koderUseCases.add(newKoder)

        res.json({
            message: "Koder added",
            data: {koders: koders}
        })
    }
    catch (error){
        res.status(error.status || 500)
        res.json({
            error: error.message
        })
    }
})

server.delete("/koders", (req, res) => {
    try{
        const koders = koderUseCase.deleteAll()
        res.json({
            message: "All koders deleted",
            data: {koders}
        })
    }
    catch (error){
        res.status(error.status || 500)
        res.json({
            error: error.message
        })
    }
})

server.delete("/koders/:name", (req, res) => {
    try{
        const name = req.params.name
        const koders = koderUseCase.deleteByName(name)
        res.json({
            message: "Koder deleted",
            data: {koders}
        })
    }
    catch (error){
        res.status(error.status || 500)
        res.json({
            error: error.message
        })
    }
})

module.exports = server