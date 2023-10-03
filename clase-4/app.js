// importamos el módulo express
import express, { json } from 'express'

import { moviesRoute } from './router/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// crypto es un módulo nativo de node es para generar ids random
// import { randomBytes } from 'node:crypto'

// Importamos fs
// import fs from 'node:fs'

// Importamos las peliculas
// import movies from './movies.json'
// import { validarPartialMovies } from './schemas/movies.js'

// Como leer un JSON en ESmodules
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// creamos la app
const app = express()

// Desactivamos el header x-powered-by
app.disable('x-powered-by')

// Para recibir Json en el body de un POST request
app.use(json())

// para mayor rapides con los cors podemos usar cors
app.use(corsMiddleware())

// Las rutas para el usuario
app.use('/movies', moviesRoute)

// Declaramos el puerto donde escucha el servidor
const port = process.env.PORT ?? 4321

app.listen(port, () => {
  console.log(`Server listening on port http://localhost${port}`)
})
