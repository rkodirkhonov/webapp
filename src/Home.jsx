import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import AddMovieForm from "./AddMovieForm";

// // run json-server first
// // npx json-server --watch db.json --port 3001
// // and npm start
// my version
// const Home = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredMovies, setFilteredMovies] = useState([]);

//   const handleSearch = (searchTerm) => {
//     setSearchTerm(searchTerm);
  
//     const filteredMovies = movies.filter((movie) => {
//       const lowerCaseSearchTerm = searchTerm.toLowerCase();
//       return (
//         lowerCaseSearchTerm === "" ||
//         movie.title.toLowerCase().includes(lowerCaseSearchTerm) ||
//         movie.synopsis.toLowerCase().includes(lowerCaseSearchTerm) ||
//         movie.genre.toLowerCase().includes(lowerCaseSearchTerm)
//       );
//     });
//     setFilteredMovies(filteredMovies);
//   };
//   useEffect(() => {
//     try {
//       fetchData().then(() => {
//         handleSearch("")
//       })// Perform initial search without a specific term
//     } catch (error) {
//       console.error("Error in useEffect:", error);
//     }
//   }, []);
  

//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/data", {
//         method: "GET", // Use GET method to retrieve data
//       });
//       if (response.ok) {
//         const jsonData = await response.json();
//         setMovies(jsonData);
//       } else {
//         throw new Error("Failed to fetch data.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw new Error("Failed to fetch data. Please try again.");
//     }
//   };
  

//   const addMovie = async (newMovie) => {
//     try {
//       const response = await fetch("http://localhost:3001/data", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newMovie),
//       });
//       if (response.ok) {
//         const movie = await response.json();
//         setMovies([...movies, movie]);
//       } else {
//         throw new Error("Failed to add movie.");
//       }
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="main-div">
//         <input
//         style={{paddingTop: "1rem",}}
//           type="text"
//           placeholder="Search"
//           value={searchTerm}
//           onChange={(event) => handleSearch(event.target.value)}
//         />
//         <div className="movie-card-container">
//           {
//           filteredMovies !== "" ?
//           filteredMovies.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))
//           :
//           movies.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))
//           }
//         </div>
//         <AddMovieForm addMovie={addMovie} movies={movies} />
//       </div>
//     </>
//   );
// };

// export default Home;

// improved chatGPT used version 
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    filterMovies(searchTerm);
  };

  useEffect(() => {
    fetchData().then((jsonData) => {
      setMovies(jsonData);
      setFilteredMovies(jsonData); // Set initial filtered movies to all movies
    });
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3001/data", {
        method: "GET",
      });
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else {
        throw new Error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data. Please try again.");
    }
  };
// chatGPT version just insane
  const filterMovies = (searchTerm) => {
    const keywords = searchTerm.toLowerCase().split(" ");
    const filteredMovies = movies.filter((movie) => {
      const movieData = `${movie.title.toLowerCase()} ${movie.synopsis.toLowerCase()} ${movie.genre.toLowerCase()}`;
      return keywords.every((keyword) => movieData.includes(keyword));
    });
  
    setFilteredMovies(filteredMovies);
  };

  // my version
  // const filterMovies = (searchTerm) => {
  //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //   const filteredMovies = movies.filter(
  //     (movie) =>
  //       lowerCaseSearchTerm === "" ||
  //       movie.title.toLowerCase().includes(lowerCaseSearchTerm) ||
  //       movie.synopsis.toLowerCase().includes(lowerCaseSearchTerm) ||
  //       movie.genre.toLowerCase().includes(lowerCaseSearchTerm)
  //   );
  //   setFilteredMovies(filteredMovies);
  // };

  const addMovie = async (newMovie) => {
    try {
      const response = await fetch("http://localhost:3001/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMovie),
      });
      if (response.ok) {
        const movie = await response.json();
        setMovies([...movies, movie]);
        filterMovies(searchTerm); // Reapply filtering after adding a new movie
      } else {
        throw new Error("Failed to add movie.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
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
        <AddMovieForm addMovie={addMovie} movies={movies} />
      </div>
    </>
  );
};

export default Home;
