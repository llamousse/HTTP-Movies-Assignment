import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
// import { Link } from 'react-router-dom';

export default class Movie extends React.Component {
  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.movie.id}`)
      .then(res => {
        console.log(res);
        this.props.removeMovie(this.props.movie.id);
        this.props.history.push('/');
      })  
      .catch(err => {
        console.log(err.response);
      })
  };

  render() {
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.props.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <br/>
        <div className="edit-button" onClick={() => this.props.history.push(`/update-movie/${this.props.movie.id}`)}>
        {/* <Link to={`/update-movie/${this.props.movie.id}`}>Update</Link> */}
          Edit
        </div>
        <br />
        <div className="delete-button" onClick={this.deleteMovie}>
            Delete
        </div>
        
      </div>
    );
  }
}
