const fs = require('node:fs');

const text = fs.readFileSync('./archivo.txt', 'utf-8'); // utf-8 es el formato de codificación de caracteres que queremos usar

console.log(text);