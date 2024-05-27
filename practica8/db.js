const fs = require("node:fs")

const fileName = "db.json"

const defaultData = {
    koders: []
}

function init() {
    if(!fs.existsSync(fileName)) {
        fs.writeFileSync(fileName, JSON.stringify(defaultData))
    }
}

module.exports = {
    init: init
}