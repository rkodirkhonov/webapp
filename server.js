const express = require("express");
const sql = require("mssql");

const app = express();
const port = 3001;

const config = {
  user: "your_sql_server_username",
  password: "your_sql_server_password",
  server: "localhost",
  database: "your_database_name",
};

app.get("/movies", async (req, res) => {
  const searchTerm = req.query.searchTerm || "";

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("searchTerm", sql.NVarChar, searchTerm)
      .query(`
        SELECT m.title, s.text, run.runtime, g.m_genre, st.name AS studio_name, rating.rate, r.year
        FROM movie m
        JOIN release_date r ON m.year_id = r.id
        JOIN synopsis s ON s.id = m.synopsis_id
        JOIN runtime run ON m.runtime_id = run.id
        JOIN MovieGenre mg ON mg.movie_id = m.id
        JOIN genre g ON g.id = mg.genre_id
        JOIN studio st ON m.studio_id = st.id
        JOIN rating ON m.rating_id = rating.id
        WHERE LOWER(m.title) LIKE '%' + LOWER(@searchTerm) + '%'
          OR LOWER(g.m_genre) LIKE '%' + LOWER(@searchTerm) + '%'
          OR s.text LIKE '%' + @searchTerm + '%'
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Failed to fetch movies from the database." });
  }
});

app.post("/movies", express.json(), async (req, res) => {
  const newMovie = req.body;

  try {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("title", sql.NVarChar, newMovie.title)
      .input("year", sql.Int, newMovie.year)
      .input("synopsis", sql.NVarChar, newMovie.synopsis)
      .input("runtime", sql.NVarChar, newMovie.runtime)
      .input("genre", sql.NVarChar, newMovie.genre)
      .input("studio", sql.NVarChar, newMovie.studio)
      .input("rating", sql.Float, newMovie.rating)
      .input("imageUrl", sql.NVarChar, newMovie.imageUrl)
      .query(
        "INSERT INTO movies (title, year, synopsis, runtime, genre, studio, rating, imageUrl) " +
        "VALUES (@title, @year, @synopsis, @runtime, @genre, @studio, @rating, @imageUrl)"
      );

    res.json(newMovie);
  } catch (error) {
    console.error("Error executing the query:", error);
    res.status(500).json({ error: "Failed to add movie to the database." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
