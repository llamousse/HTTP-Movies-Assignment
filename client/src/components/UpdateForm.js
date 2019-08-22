import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                console.log(res.data);
                setMovie(res.data);
            })
            .catch(err =>{
                console.log(err.response);
            })
    }, []);

    const handleChange = e => {
        e.preventDefault();

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleStarChange = (starInd, name) => {
        const starsss = [...movie.stars];
        starsss[starInd] = name.target.value;
        setMovie({...movie, stars: starsss})
    }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then(res => {
        console.log(res.data);
        props.history.push(`/`);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="movie-card">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <p>Movie Title:</p>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Movie Title"
          value={movie.title}
        />
        <br />

        <p>Director:</p>
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="Director"
          value={movie.director}
        />
        <br />

        <p>Metascore:</p>
        <input
          type="number"
          name="metascore"
          onChange={handleChange}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <br />

        {/* <p>Actors:</p>
        <input
          type="string"
          name="stars"
          onChange={handleChange}
          placeholder="Stars"
          value={movie.stars}
        />
        <br />
        <br /> */}

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;