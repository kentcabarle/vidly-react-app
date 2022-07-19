import React from "react";
import Form from "./common/form";
import Joi from "joi";
import { getMovie, saveMovie, updateMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = Joi.object().keys({
    _id: Joi.string(),
    title: Joi.string().required().min(5).label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().integer().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
  });

  populateGenre = async () => {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  };

  populateMovie = async () => {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.maptToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status >= 404) this.props.history.replace("/not-found");
    }
  };

  async componentDidMount() {
    this.populateGenre();
    this.populateMovie();
  }

  maptToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
