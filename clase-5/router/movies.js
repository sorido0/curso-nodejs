import { Router } from 'express'
import { MovieController } from '../controller/controllerMovies.js'

export const createMoviesRouter = ({ MovieModel }) => {
  const moviesRoute = Router()

  const novieControlle = new MovieController({ movieModel: MovieModel })

  moviesRoute.get('/', novieControlle.getAll)

  moviesRoute.get('/:id', novieControlle.getByID)

  moviesRoute.post('/', novieControlle.create)

  moviesRoute.delete('/:id', novieControlle.delete)

  moviesRoute.patch('/:id', novieControlle.update)

  return moviesRoute
}
