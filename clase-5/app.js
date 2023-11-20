// importamos el módulo express
import express, { json } from 'express'
import { createMoviesRouter } from './router/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

export const createApp = ({ MovieModel }) => {
  // creamos la app
  const app = express()

  // Desactivamos el header x-powered-by
  app.disable('x-powered-by')

  // Para recibir Json en el body de un POST request
  app.use(json())

  // para mayor rapides con los cors podemos usar cors
  app.use(corsMiddleware())

  // Las rutas para el usuario
  app.use('/movies', createMoviesRouter({ MovieModel }))

  // Declaramos el puerto donde escucha el servidor
  const port = process.env.PORT ?? 4321

  app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
}
