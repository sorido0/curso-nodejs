const path = require('node:path')

// saber cual es la barra para separar directorios
console.log(path.sep)

// para unir las rutas
const filePath = path.join('content', 'subfolder', 'test.txt')

// para saber el nombre del archivo
const base = path.basename(filePath)

// Para saber el nombre del archivo sin la extensión
const ext = path.basename(filePath, '.txt')

// para obtener la extensión del archivo
const extencioncion = path.extname(filePath)

console.log({
  filePath,
  base,
  ext,
  extencioncion
})
