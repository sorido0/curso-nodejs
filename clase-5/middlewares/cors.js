import cors from 'cors'

export const corsMiddleware = () => cors({
  origin: (origin, callback) => {
    // Podemos tener origins Acepatados
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:8081',
      'http://localhost:8082',
      'http://127.0.0.1:8080',
      'http://localhost:1',
      'http://sorido0.dev'
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allwed by CORS'))
  }
})
