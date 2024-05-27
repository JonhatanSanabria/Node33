const http = require("node:http")

const server = http.createServer((request, response) => {
    response.end("Hola mundo");
})

server.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
})