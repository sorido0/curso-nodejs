import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const mysql = require('mysql2/promise')

const config = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'sorido0',
  database: 'moviesdb'

}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    // implementación de getAll
    // Recuperar peliculas por genero
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      //* mostrar los resultado por genero
      const [movies3] = await connection.query(
        'SELECT movies.title, movies.year, movies.director, movies.duration, movies.poster, movies.rate, BIN_TO_UUID(movies.id) AS id, genre.name AS genre_name FROM movies JOIN movie_genre ON movies.id = movie_genre.movie_id JOIN genre ON genre.id = movie_genre.genre_id where  LOWER(genre.name) = ?;',
        [lowerCaseGenre]
      )

      return movies3
    }
    const [movies] = await connection.query(
      'select title, year, director, duration, poster, rate , BIN_TO_UUID(id) id from movies;'
    )
    return movies
  }

  static async getById ({ id }) {
    // implementación de getById
    const idv = id
    if (id) {
      const [movies] = await connection.query(
        `select title, year, director, duration, poster, rate , BIN_TO_UUID(id) id from movies
        WHERE id = UUID_TO_BIN(?);`,
        [idv]
      )
      return movies
    }
    return ''
  }

  static async create ({ input }) {
    // implementación de create
    const {
      genre: genreInput,
      title,
      director,
      year,
      duration,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query(
      'SELECT UUID() AS uuid;'
    )
    const [{ uuid }] = uuidResult
    try {
      await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES 
        (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)`,
        [title, year, director, duration, poster, rate]
      )
    } catch (error) {
      throw new Error('Pelicula no pudo ser creada' + error)
    }

    const [movies] = await connection.query(
      `select title, year, director, duration, poster, rate , BIN_TO_UUID(id) id from movies
      WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies
  }

  static async delete ({ id }) {
    // implementación de delete

    try {
      if (id) {
        const result = await connection.query(
          'delete from movies where id = UUID_TO_BIN(?);',
          [id]
        )
        console.log(result)
      }
    } catch (error) {
      throw new Error(' Algo salio mal llame a sorido0')
    }

    return []
  }

  static async update ({ id, input }) {
    // implementación de update
    // if (id) return { message: 'id no exite' }
    const [movies] = await this.getById({ id })

    if (!movies) {
      return { message: 'pelicula no existe ' }
    }

    const movieActulizada = { ...movies, ...input }

    const {
      title,
      director,
      year,
      duration,
      rate,
      poster
    } = movieActulizada

    await connection.query(
      `UPDATE movies 
      SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? 
      WHERE id = UUID_TO_BIN("${id}")`,
      [title, year, director, duration, poster, rate]
    )

    return movieActulizada
  }
}
