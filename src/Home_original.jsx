import React, { useState, useEffect } from "react";
// import axios from "axios";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import moviesData from "./moviesData";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    // Fetch movie data from the backend API
    // axios
    //   .get("/api/movies")
    //   .then((response) => {
    //     setMovies(response.data);
    //     setFilteredMovies(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching movie data:", error);
    //   });
    fetchData();
    setMovies(moviesData);
    setFilteredMovies(moviesData);   
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.synopsis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filteredMovies);
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001");
      const jsonData = await response.json();
      setMovies(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <Navbar />

      <div className="main-div">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="movie-card-container">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
