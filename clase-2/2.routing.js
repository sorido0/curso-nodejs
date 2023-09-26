// Lo primero es importar el modulo http
const http = require('node:http')

// commonJs --> modulo puedes importar JSON
const dittoJson = require('./pekemon/dito.json')

// Luego vemos las respuestas
const procesarRequest = (req, res) => {
  // la url de la pediticion
  const { url, method } = req

  // Un switch para procesar la los method
  switch (method) {
    case 'GET':{
      switch (url) {
        case '/pekemon/ditto':
          res.setHeader('Content-Type', 'application/json, charset=utf-8')
          return res.end(JSON.stringify(dittoJson))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('<h1> 404 </h1>')
      }
    }
    case 'POST':
      switch (url) {
        case '/pekemon':{
          let body = ''
          // Escuchar la data del POST request
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          // Cuando termina de escuchar la data
          req.on('end', () => {
            const data = JSON.parse(body)
            console.log(data)
            res.statusCode = 201
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            return res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          return res.end('<h1> 404 </h1>')
      }
  }
}

// Creamos el servidor
const server = http.createServer(procesarRequest)

// Iniciamos el servidor en el puerto libre
server.listen(1234, () => {
  console.log('Server listening on port: http://localhost:1234')
})
