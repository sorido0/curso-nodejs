import { Router } from 'express'

// La forma correcta de leer un JSON
// import { createRequire } from 'node:module'
import { MovieController } from '../controller/controllerMovies.js'

export const moviesRoute = Router()
// const require = createRequire(import.meta.url)
// const movies = require('../movies.json')

moviesRoute.get('/', MovieController.getAll)

moviesRoute.get('/:id', MovieController.getByID)

moviesRoute.post('/', MovieController.create)

moviesRoute.delete('/:id', MovieController.delete)

moviesRoute.patch('/:id', MovieController.update)
