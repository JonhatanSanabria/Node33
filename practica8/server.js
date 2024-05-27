const express = require("express")

const server = express()

server.use(express.json())

server.get("/", (req, res) => {
    res.json({
        message: "Kodemia APIv1"
    })
})

module.exports = server