// para crear un servidor http en node necesitamos el modulo http
const http = require('node:http')

// fs para leer archivos
const fs = require('node:fs')

// obtener puerto desde la variable de entorno
const port = process.env.PORT ?? 3000

// console.log(process.env)

// Prcesar la request y enviar la response
const prosesarRequest = (req, res) => {
  // cabesera de iniciar la respuesta
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  // procesar la request si la url es /
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1> Bienvenidos a mi pagina </h1>')
  } else if (req.url === '/imagen-mia.png') {
    // si la url es /imagen-mia.png
    // con fs leemos el archivo
    fs.readFile('./yo.jpg', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1> Error en el servidor  </h1>')
      } else {
        res.setHeader('Content-Type', 'image/jpeg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1> Contacto </h1>')
  } else {
    res.statusCode = 404
    res.end('<h1> 404 </h1>')
  }
}

// creamos el servidor
const server = http.createServer(prosesarRequest)

// iniciamos el servidor en el puerto libre
server.listen(port, () => {
  console.log(`Server listening on port: http://localhost:${port}`)
})
