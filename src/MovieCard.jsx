import React from "react";
import "./MovieCard.css";
function MovieCard(props) {
  const { title, year, synopsis, runtime, genre, studio, rating } = props.movie;
  return (
    <div className="card">
      <img src={props.movie.imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>Year: {year}</p>
      <p>Synopsis: {synopsis}</p>
      <p>Runtime: {runtime}</p>
      <p>Genre: {genre}</p>
      <p>Studio: {studio}</p>
      <p>Rating: {rating}</p>
    </div>
  );
}

export default MovieCard;
