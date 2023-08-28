// para obtener un puerto libre en node necesitamos el modulo net
const net = require('node:net')

// creamos una funcion que nos devuelva un puerto libre
function puertoDisponible (puertoDeseado) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(puertoDeseado, () => {
      const { port } = server.address()

      server.close(() => {
        resolve(port)
      }
      )
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        puertoDeseado(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    }
    )
  }
  )
}

module.exports = { puertoDisponible }
