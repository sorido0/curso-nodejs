const fs = require('node:fs')

fs.readdir('./', (err, files) => {
  if (err) {
    console.error('Esto es un error del dirrectorio ', err)
  }

  console.log(files)
}
)
