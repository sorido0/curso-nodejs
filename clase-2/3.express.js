// importamos express
const express = require('express')

// commonJs --> modulo puedes importar JSON
const dittoJson = require('./pekemon/dito.json')

// creamos la app
const app = express()

// Desactivamos el header x-powered-by
app.disable('x-powered-by')

// el puerto donde escucha el servidor
const port = process.env.PORT ?? 1234

// Creamos el middleware
app.use(express.json()) // Es todo lo que necesitamos para parsear el body de un POST request
// app.use((req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   // Escuchar la data del POST request
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })
//   // Cuando termina de escuchar la data
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = new Date()
//     // mutamos el req.body
//     req.body = data
//     next()
//   })

//   console.log('middleware')
// })

// creamos la petición GET
app.get('/home', (req, res) => {
  res.status(200).send('<h1>mi api en exprees </h1>')
})

app.get('/pekemon/ditto', (req, res) => {
  res.json(dittoJson)
})

// creamos la petición POST
app.post('/pekemon', (req, res) => {
  console.log('aqui')
  res.status(201).json(req.body)
})

// Por ultimo creamos el 404
app.use((req, res) => {
  res.status(404).send('<h1> 404 </h1>')
})

// Donde escucha el servidor
app.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`)
})
