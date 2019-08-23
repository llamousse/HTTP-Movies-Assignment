import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {
  console.log(props);
  const [movie, setMovie] = useState(props.movie);

  useEffect(() => {
    setMovie(props.movie);
  }, [props.movie]);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleStar = index => e => {
    setMovie({...movie, stars: movie.stars.map((star, starIndex) => {
    
      /* ternary refactor */
      return starIndex === index ? e.target.value : star;
    
      /* longer if else statement */
      // if (starIndex === index) {
      //   return e.target.value;
      // } else {
      //   return star;
      // }
    })});
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res.data);
        // props.updateMovie(res.data); <- for manually updating movies
        props.getMovies();
        props.history.push(`/`);
      })
      .catch(err => console.log(err.response));
  };

  const addStar = event => {
    event.preventDefault();
    setMovie({...movie, stars: [...movie.stars, ""]});
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div className="movie-card">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <p>Movie Title:</p>
        <input
          type="text"
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChange}
        />
        <br />

        <p>Director:</p>
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
        />
        <br />

        <p>Metascore:</p>
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <br />

        <p>Actors:</p>
        {movie.stars.map((starName, index) => {
          return <input type="text"
                        placeholder="star"
                        value={starName}
                        key={index}
                        onChange={handleStar(index)} />;
        })}
        <br />
        <br />
        <button onClick={addStar}>Add Star</button>
        <button type="submit" className="md-button form-button">Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;