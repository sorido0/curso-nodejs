// Utilizamos zod para validar los datos que vienen en el body de un POST request
const { z } = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }).min(1).max(100),
  year: z.number().int().min(1990).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url(),
  genre: z.array(z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Thriller', 'Western', 'Sci-Fi']))

})

function validarMovies(input) {
  return movieSchema.safeParse(input)
}

function validarPartialMovies(input) {
  // Validamos que el objeto que nos pasan tenga al menos una propiedad
  return movieSchema.partial().safeParse(input)
}

module.exports = {
  validarMovies,
  validarPartialMovies
}
