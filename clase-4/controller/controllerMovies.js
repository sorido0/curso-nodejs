import { MovieModel } from '../models/modelsMovies.js'
import { validarMovies, validarPartialMovies } from './../schemas/movies.js'

export class MovieController {
  static async getAll (req, res) {
    const movies = await MovieModel.getAll()
    if (!movies) return res.status(404).json({ message: 'No hay peliculas' })
    return res.json(movies)
  }

  static async getAllGenre (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAllGenre(genre)
    if (movies.length === 0) return res.status(404).json({ message: 'genro not found' })
    res.json(movies)
  }

  static async getByID (req, res) {
    res.header('Access-Control-Allow-Origin', '*')
    const { id } = req.params
    const movie = await MovieModel.getByID({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
  }

  static async create (req, res) {
    const result = validarMovies(req.body)

    if (!result.success) {
      return res.status(422).json({
        errors:
          JSON.parse(result.error)
      })
    }

    const newMovie = MovieModel.create({ input: result.data })
    // indicamos que el recurso fue creado
    res.status(201).json(newMovie)
  }

  static async update (req, res) {
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
    const updatedMovie = await MovieModel.update({ id, input: result.data })

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

  static async delete (req, res) {
    const { id } = req.params
    const result = await MovieModel.delete({ id })

    if (result === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }
}
