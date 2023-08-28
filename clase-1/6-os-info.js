//* Para obtener información del sistema operativocls
const os = require('node:os')

function sistema () {
  console.log(os.platform())
  console.log(os.homedir())
  console.log(os.hostname())
  console.log(os.type())
  console.log(os.uptime() / 60 / 60)
  console.log(os.release())
  console.log(os.cpus())
  console.log(os.freemem())
  console.log(os.totalmem())
  console.log(os.networkInterfaces())
  console.log(os.arch())
  console.log(os.userInfo())
}

sistema()
