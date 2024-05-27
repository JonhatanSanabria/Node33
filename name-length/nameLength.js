// Crear un programa que pida al usuario una lista de nombres 
const prompt = require("prompt-sync")()
const names = []
// Una vez terminando de agregar nombres al usuario, el programa debe mostrar cuantos nombres se ingresaron
let count = names.length
// Si existe al menos un valor repetido o no
const repeated = names.find((name) => names.filter((name) => name === name).length > 1)  
// Cual es el nombre mas largo de todos los ingresados
const longest = names.reduce((longest, name) => {name.length > longest.length ? name : longest}, 0)
// Cual es el nombre mas corto de todos los ingresados
const shortest = names.reduce((shortest, name) => {name.length < shortest.length ? name : shortest}, 0)

while (true){
    const name = prompt("Ingresa un nombre: ")
    if (name === ""){
        false
    } else {
        names.push(name)
    }
    console.log(`Se ingresaron ${count} nombres`)
    console.log(`Lista de nombres: `, names)
    console.log("Se repitieron nombres: ", repeated ? "Si" : "No")
    console.log(`El nombre mas largo es: ${longest}`)
    console.log(`El nombre mas corto es: ${shortest}`)
}
    