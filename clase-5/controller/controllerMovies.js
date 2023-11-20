import { validarMovies, validarPartialMovies } from './../schemas/movies.js'

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAll({ genre })
    if (!movies) return res.status(404).json({ message: 'No hay peliculas' })
    return res.json(movies)
  }

  getAllGenre = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAllGenre(genre)
    if (movies.length === 0) return res.status(404).json({ message: 'genro not found' })
    res.json(movies)
  }

  getByID = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    const { id } = req.params
    const movie = await this.movieModel.getById({ id })
    if (movie.length === 1) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  }

  create = async (req, res) => {
    const result = validarMovies(req.body)

    if (!result.success) {
      return res.status(422).json({
        errors:
          JSON.parse(result.error)
      })
    }

    const newMovie = await this.movieModel.create({ input: result.data })
    // indicamos que el recurso fue creado
    res.status(201).json(newMovie)
  }

  update = async (req, res) => {
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
    const updatedMovie = await this.movieModel.update({ id, input: result.data })

    // si no existe la pelicula
    if (updatedMovie === -1) {
      return res.status(404).json(
        {
          message: 'Movie not found es este2'
        }
      )
    }

    // respondemos con la pelicula actualizada
    res.json(updatedMovie)
  }

  delete = async (req, res) => {
    const { id } = req.params
    const result = await this.MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
