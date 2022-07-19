import React, { Component } from "react";
import { toast } from "react-toastify";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { orderBy } from "lodash-es";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

export default class Movies extends Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    let genres = [{ name: "All Genres" }, ...data];
    this.setState({ movies, genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error(ex.response.data);
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    console.log("genre", genre);
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
    const sorted = orderBy(filtered, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, genres, sortColumn, selectedGenre, searchQuery } = this.state;
    const { totalCount, data } = this.getPagedData();
    const { user } = this.props;

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link to="/movies/new">
              <button className="btn btn-primary mb-2">New Movie</button>
            </Link>
          )}

          <p>Showing {totalCount} movies from the database</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
