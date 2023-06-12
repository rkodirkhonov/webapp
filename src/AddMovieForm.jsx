import React, { useState, useEffect } from "react";
import "./AddMovieForm.css";

const AddMovieForm = ({ addMovie, movies }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [runtime, setRuntime] = useState("");
  const [genre, setGenre] = useState("");
  const [studio, setStudio] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastId, setLastId] = useState("");
  const getLastDataId = () => {
    const movieIds = movies.map(movie => movie.id);
    return Math.max(...movieIds);
  };
  
  // Usage
  useEffect(() => {
    setLastId(getLastDataId());
  }, []);
  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!title || !year || !synopsis || !runtime || !genre || !studio || !rating || !imageUrl) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    const id = lastId + 1;

    const newMovie = {
      id,
      title,
      year: parseInt(year),
      synopsis,
      runtime,
      genre,
      studio,
      rating: parseFloat(rating),
      imageUrl,
    };

    addMovie(newMovie)
      .then(() => {
        setSuccessMessage("Movie added successfully!");
        // Clear the form
        setTitle("");
        setYear("");
        setSynopsis("");
        setRuntime("");
        setGenre("");
        setStudio("");
        setRating("");
        setImageUrl("");
        setLastId(id);
      })
      .catch((error) => {
        setErrorMessage("Failed to add movie. Please try again.");
        console.error("Error adding movie:", error);
      });
  };

  return (
    <div className="add-movie-form">
      <h2>Add a New Movie</h2>
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}
      <form onSubmit={handleFormSubmit}>
        <div className="in-dev">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>
        <div className="in-dev">
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />
        </div>
        <div className="in-dev">
          <label>Synopsis:</label>
          <textarea
            value={synopsis}
            onChange={(event) => setSynopsis(event.target.value)}
            required
          />
        </div>
        <div className="in-dev">
          <label>Runtime:</label>
          <input
            type="text"
            value={runtime}
            onChange={(event) => setRuntime(event.target.value)}
            required
          />
        </div>
        <div className="in-dev">
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            required
          />
        </div>
        <div className="in-dev">
          <label>Studio:</label>
          <input
            type="text"
            value={studio}
            onChange={(event) => setStudio(event.target.value)}
            required
          />
        </div>
        <div className="in-dev">
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            required
          />
        </div>
        <div className="in-dev">
          <label>Image URL:</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(event) => setImageUrl(event.target.value)}
            required
          />
        </div>
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovieForm;
