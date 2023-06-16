import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import AddMovieForm from "./AddMovieForm";
import movieData from "./db.json";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    filterMovies(searchTerm);
  };

  useEffect(() => {
    setFilteredMovies(movieData.movies);
  }, []);

  const filterMovies = (searchTerm) => {
    const keywords = searchTerm.toLowerCase().split(" ");
    const filteredMovies = movieData.movies.filter((movie) => {
      const movieData = `${movie.title.toLowerCase()} ${movie.synopsis.toLowerCase()} ${movie.genre.toLowerCase()}`;
      return keywords.every((keyword) => movieData.includes(keyword));
    });

    setFilteredMovies(filteredMovies);
  };

  const addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
      // Simulate an asynchronous operation (e.g., API call) with a delay
      setTimeout(() => {
        try {
          // Assign a unique ID to the new movie
          newMovie.id = movieData.movies.length + 1;
          movieData.movies.push(newMovie);
          setFilteredMovies([...filteredMovies, newMovie]);
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 500);
    });
  };

  return (
    <>
      <Navbar />

      <div className="main-div">
        <input
          style={{ paddingTop: "1rem" }}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <div className="movie-card-container">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <AddMovieForm addMovie={addMovie} movies={filteredMovies} />
        <p className="tt">No database service is connected. So the new movie data you added will be disappeared after you refresh the page!</p>
      </div>
    </>
  );
};

export default Home;
