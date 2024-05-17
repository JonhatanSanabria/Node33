// queremos recibir un numero e imprimir "par" si el numero es par e imprimir "impar" si el numero es impar
// 1. pedir un numero al usuario
const prompt = require("prompt-sync")()
const number = prompt("Ingresa un numero: ")
// 2. comprobar si es par o impar
if (number % 2 === 0) {
    console.log("El numero es par")
    } else {
        console.log("El numero es impar")
        }