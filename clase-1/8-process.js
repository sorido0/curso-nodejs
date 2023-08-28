// Con process vemos los algumon de enttrada y salida
// console.log(process.argv);

// podemos controlar el proceso
// process.on('exit', () => {
//     console.log("Proceso terminado");
// }
// )

// para ejecutar el archivo

const esto = process.cwd() // para saber en que directorio estamos
console.log(esto)

console.log(process.env.PEPITO)
