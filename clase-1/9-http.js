// para crear un servidor http en node necesitamos el modulo http
const http = require('node:http')

// funcion para obtener un puerto libre
const { puertoDisponible } = require('./10-puerto-libre.js')

// obtener puerto desde la variable de entorno
const port = process.env.PORT ?? 3000

// console.log(process.env)

// creamos el servidor
const server = http.createServer((req, res) => {
  console.log('request event')
  res.end('Hola soy Goku')
})

// obtenemos un puerto libre
puertoDisponible(port).then(port => {
  // iniciamos el servidor en el puerto libre
  server.listen(port, () => {
    console.log(`Server listening on port: http://localhost:${port}`)
  })
})
