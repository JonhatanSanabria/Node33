const server = require("./server")
const db = require("./db")

const PORT = 3000

db.init()
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})