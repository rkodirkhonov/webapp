import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetchData();
    handleSearch(""); // Perform initial search without a specific term
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        lowerCaseSearchTerm === "" ||
        movie.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        movie.synopsis.toLowerCase().includes(lowerCaseSearchTerm) ||
        movie.genre.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
    setFilteredMovies(filteredMovies);
  };
  

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/data");
      const jsonData = await response.json();
      setMovies(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="main-div">
        <input
        style={{paddingTop: "4rem",}}
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => handleSearch(event.target.value)}
        />
        <div className="movie-card-container">
          {
          filteredMovies !== "" ?
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
          :
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
          }
        </div>
      </div>
    </>
  );
};

export default Home;
