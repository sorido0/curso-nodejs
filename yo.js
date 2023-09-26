// const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// // Un array de numero desordenados
// const numerosDesordenados = [-1, 2, 3, -4, -5, 6, 7, 8, -9]

// // Un array de strings
// const nombres = ['Juan', 'Pedro', 'Maria', 'Ana']

// function sumarPares (numeros) {
//   let suma = 0
//   // sumar solo los pares
//   numeros.forEach(function (numero) {
//     if (numero % 2 === 0) {
//       suma += numero
//     }
//   })

//   return suma
// }

// function tieneElValorDelStringn (nombres) {
//   const loEs = nombres.every(function (nombre) {
//     return nombre.endsWith('n')
//   })

//   // Ahoras los que terminan en A
//   const conA = nombres.every(function (nombre) {
//     return nombre.endsWith('a')
//   })

//   console.log(conA)
//   console.log(loEs)
// }

// // numero ordenado de mayor a menor
// function ordenarNumeros (numerosDesordenados) {
//   const ordenados = numerosDesordenados.sort(function (a, b) {
//     return Math.abs(a) - Math.abs(b)
//   })

//   console.log(ordenados)
// }
// ordenarNumeros(numerosDesordenados)
// tieneElValorDelStringn(nombres) // true
// sumarPares(numeros) // 20
