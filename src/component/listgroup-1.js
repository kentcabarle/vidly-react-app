// import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
// import Like from "./common/like";
// import Pagination from "./common/pagination";
// import { paginate } from "../utils/paginate";
// import { filter } from "../utils/filter";
// import ListGroup from "./common/listgroup";
// import { getGenres, defaultGenre } from "../services/fakeGenreService";

// export default class Movies extends Component {
//   state = {
//     movies: getMovies(),
//     filteredMovies: getMovies(),
//     pageSize: 4,
//     currentPage: 1,
//     genres: [defaultGenre, ...getGenres()],
//     currentGenre: defaultGenre,
//   };

//   handleLike = (movie) => {
//     const movies = [...this.state.movies];
//     const index = movies.indexOf(movie);
//     movies[index] = { ...movie };
//     movies[index].isLiked = !movies[index].isLiked;
//     this.setState({ movies });
//   };

//   handleDelete = (movieId) => {
//     this.setState({
//       movies: this.state.movies.filter((movie) => {
//         return movie._id !== movieId;
//       }),
//     });
//   };

//   handlePageChange = (page) => {
//     console.log(page);
//     this.setState({ currentPage: page });
//   };

//   handleFilterChange = (genre) => {
//     console.log("genre", genre);

//     console.log("defaultGenre.name", defaultGenre.name);
//     this.setState({ currentPage: 1 });
//     this.setState({
//       filteredMovies: filter(this.state.movies, genre.name, defaultGenre.name),
//     });
//     this.setState({ currentGenre: genre });
//     console.log("this.state.currentGenre.name", this.state.currentGenre.name);
//   };

//   render() {
//     const { length: count } = this.state.filteredMovies;
//     const {
//       pageSize,
//       currentPage,
//       movies: allMovies,
//       genres,
//       currentGenre,
//       filteredMovies,
//     } = this.state;

//     const movies = paginate(filteredMovies, currentPage, pageSize);

//     console.log("allMovies", allMovies);
//     console.log("movies", movies);

//     if (count === 0) return <p>There are no movies in the database</p>;

//     return (
//       <React.Fragment>
//         <div className="container">
//           <div className="row">
//             <div className="col-2">
//               <ListGroup
//                 items={genres}
//                 currentItem={currentGenre}
//                 onItemChange={this.handleFilterChange}
//               />
//             </div>
//             <div className="col">
//               <p>Showing {count} movies from the database</p>
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>Title</th>
//                     <th>Genre</th>
//                     <th>Stock</th>
//                     <th>Rate</th>
//                     <th />
//                     <th />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {movies.map((movie) => {
//                     return (
//                       <tr key={movie._id}>
//                         <td>{movie.title}</td>
//                         <td>{movie.genre.name}</td>
//                         <td>{movie.numberInStock}</td>
//                         <td>{movie.dailyRentalRate}</td>
//                         <td>
//                           <Like
//                             onClick={() => this.handleLike(movie)}
//                             isLiked={movie.isLiked}
//                           />
//                         </td>
//                         <td>
//                           <button
//                             onClick={() => {
//                               this.handleDelete(movie._id);
//                             }}
//                             className="btn btn-danger btn-sm"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//               <Pagination
//                 itemsCount={count}
//                 pageSize={pageSize}
//                 currentPage={currentPage}
//                 onPageChange={this.handlePageChange}
//               />
//             </div>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// import React from "react";

// const ListGroup = (props) => {
//   const { items, currentItem, onItemChange } = props;
//   console.log("items", items);
//   return (
//     <ul className="list-group mt-5">
//       {items.map((item) => {
//         console.log(currentItem);
//         return (
//           <li
//             style={{ cursor: "pointer" }}
//             onClick={() => onItemChange(item)}
//             key={item._id}
//             className={
//               item._id === currentItem._id
//                 ? "list-group-item active"
//                 : "list-group-item"
//             }
//           >
//             {item.name}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default ListGroup;

// export const filter = (items, keyword, defaultKey) => {
//   let filteredItems = [...items];
//   return keyword === defaultKey
//     ? items
//     : filteredItems.filter((item) => {
//         return item.genre.name === keyword;
//       });
// };
