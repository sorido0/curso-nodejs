// importamos el módulo express
const express = require('express')

// crypto es un módulo nativo de node es para generar ids random
const crypto = require('node:crypto')

// Importamos las peliculas
const movies = require('./movies')
const { validarMovies, validarPartialMovies } = require('./schemas/movies')

// creamos la app
const app = express()

// Desactivamos el header x-powered-by
app.disable('x-powered-by')

// Para recibir Json en el body de un POST request
app.use(express.json())

// Declaramos el puerto donde escucha el servidor
const port = process.env.PORT ?? 4321

// Cuando la respuesta es get
app.get('/', (req, res) => {
  res.json({ message: 'Hello World! A Home' })
})

// Cuando la respuesta es get
app.get('/api', (req, res) => {
  res.json({ message: 'Api' })
})

// Podemos tener origins Acepatados
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://127.0.0.1:8080',
  'http://localhost:1',
  'http://sorido0.dev'
]

// Para eliminar una pelicula
app.delete('/movies/:id', (req, res) => {
  // // recuoeramos el id de la pelicula
  // const { id } = req.params

  // // buscamos la pelicula por id
  // const movieIndex = movies.findIndex(movie => movie.id === id)

  // // si no existe la pelicula
  // if (movieIndex === -1) {
  //   console.log('poraqui')
  //   return res.status(404).json(
  //     {
  //       message: 'Movie not found este'
  //     }
  //   )
  // }

  // // eliminamos la pelicula
  // movies.splice(movieIndex, 1)

  // // respondemos con la pelicula eliminada
  // res.json({ message: 'Movie deleted' })
  res.header('Access-Control-Allow-Origin', '*')

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

// Para todas las peliculas que se agreguen a la app
app.get('/movies', (req, res) => {
  // Esto permite que cualquier cliente pueda hacer un request a nuestra api
  // El * significa que cualquier cliente puede hacer un request a nuestra api
  // Pero no es lo correcto en producción

  // recuperamos el origin del request
  const origin = req.header('Origin')

  // Si el origin no esta en la lista de aceptados
  if (ACCEPTED_ORIGINS.includes(origin)) {
    // respondemos con un error
    res.header('Access-Control-Allow-Origin', `${origin}`)
  }

  const { genre } = req.query

  if (genre) {
    const filtroPorGenero = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )

    if (filtroPorGenero.length === 0) return res.status(404).json({ message: 'genro not found' })
    return res.json(filtroPorGenero)
  }

  res.json(movies)
})

// Para recuperar una pelicula por id
app.get('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

// Para agregar una pelicula
app.post('/movies', (req, res) => {
  const result = validarMovies(req.body)

  if (!result.success) {
    return res.status(422).json({
      errors:
        JSON.parse(result.error)
    })
  }

  const newMovie = {
    id: crypto.randomBytes(16).toString('hex'), // Generamos un id random y es nativo de node
    ...result.data
  }

  // mutamos el array de peliculas
  movies.push(newMovie)

  // indicamos que el recurso fue creado
  res.status(201).json(newMovie)
})

// Para actualizar una pelicula
app.patch('/movies/:id', (req, res) => {
  // Validar todos los datos
  const result = validarPartialMovies(req.body)

  // Si no es valido
  if (!result.success) {
    return res.status(422).json({
      errors:
        JSON.parse(result.error)
    })
  }

  // recuoeramos el id de la pelicula
  const id = req.params.id

  // buscamos la pelicula por id
  const movieIndex = movies.findIndex(movie => movie.id === id)

  // si no existe la pelicula
  if (movieIndex === -1) {
    return res.status(404).json(
      {
        message: 'Movie not found es este2'
      }
    )
  }

  // actulizamos la pelicula
  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  // reemplazamos la pelicula
  movies[movieIndex] = updatedMovie

  // respondemos con la pelicula actualizada
  res.json(updatedMovie)
})

app.options('/movies/:id', (req, res) => {
  // recuperamos el origin del request
  const origin = req.header('Origin')

  // Si el origin no esta en la lista de aceptados
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    // respondemos con un error
    console.log(origin)
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }

  res.send()
})

app.listen(port, () => {
  console.log(`Server listening on port http://localhost${port}`)
})
