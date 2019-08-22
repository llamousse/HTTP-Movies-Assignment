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

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;

        if(ev.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [ev.target.name]: value
        });
    };

//   const handleSubmit = e => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:3333/items/${item.id}`, item)
//       .then(res => {
//         console.log(res.data);
//         setItem(initialMovie);
//         props.updateItems(res.data);
//         props.history.push('/movies');
//       })
//       .catch(err => console.log(err.response));
//   };

  return (
    <div className="movie-card">
      <h2>Update Movie</h2>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Movie Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="Stars"
          value={movie.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
}

export default UpdateForm;