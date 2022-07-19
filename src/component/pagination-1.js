// import React, { Component } from "react";

// const Pagination = ({ totalPages, currentPage, onPageClick }) => {
//   let items = [];
//   for (let i = 0; i < totalPages; i++) {
//     items[i] = i + 1;
//   }
//   let PageItems = () =>
//     items.map((item) => {
//       let active = currentPage === item ? "active" : "";
//       return (
//         <li
//           key={item}
//           onClick={() => onPageClick(item)}
//           className={`page-item ${active}`}
//         >
//           <a className="page-link" href="#">
//             {item}
//           </a>
//         </li>
//       );
//     });

//   return (
//     <nav aria-label="...">
//       <ul className="pagination">
//         <PageItems />
//       </ul>
//     </nav>
//   );
// };

// export default Pagination;

// import React, { Component } from "react";
// import { getMovies } from "../services/fakeMovieService";
// import Like from "./common/like";
// import Pagination from "./common/pagination";

// export default class Movies extends Component {
//   state = {
//     movies: getMovies(),
//     currentPage: 1,
//     maxCountPerPage: 4,
//   };

//   renderTableInfo() {
//     let { length: count } = this.state.movies;
//     if (count === 0) {
//       return "There are no movies in the database";
//     }
//     return `Showing ${count} movies from the database`;
//   }

//   renderDeleteButton(_id) {
//     return (
//       <button
//         onClick={() => {
//           this.handleDelete(_id);
//         }}
//         className="btn btn-danger btn-sm"
//       >
//         Delete
//       </button>
//     );
//   }

//   handleLike = (movie) => {
//     const movies = [...this.state.movies];
//     const index = movies.indexOf(movie);
//     movies[index] = { ...movie };
//     movies[index].isLiked = !movies[index].isLiked;
//     this.setState({ movies });
//   };

//   handleDelete(movieId) {
//     this.setState({
//       movies: this.state.movies.filter((movie) => {
//         return movie._id !== movieId;
//       }),
//     });
//   }

//   getCurrentMovies() {
//     // currentPage
//     // max movies per page (4)
//     // if 1 of 3, then we will show first 1-4 movies
//     // if 2 of 3, then we will show movies 5-8
//     // if 3 of 3, then we will show 1 movie (last)

//     let numberOfPages = Math.ceil(
//       this.state.movies.length / this.state.maxCountPerPage
//     );

//     let indexRangeList = []; //[ {start: 0, end: 3}, {start: 4, end: 5} ]
//     let currentStartIndex = 0;
//     let currentEndIndex = 0;
//     let countOfLastPage = this.state.maxCountPerPage;
//     let remainder = this.state.movies.length % this.state.maxCountPerPage;
//     if (remainder !== 0) {
//       countOfLastPage = remainder;
//     }

//     let currentPage = this.state.currentPage;
//     currentPage = currentPage - 1;
//     if (this.state.movies.length % this.state.maxCountPerPage === 0) {
//       this.setState({ currentPage });
//     }

//     for (let i = 0; i < numberOfPages; i++) {
//       if (i === numberOfPages - 1 && remainder !== 0) {
//         currentStartIndex = currentStartIndex; // 0
//         currentEndIndex = currentEndIndex + countOfLastPage - 1; // 4
//       } else {
//         currentEndIndex = currentEndIndex + this.state.maxCountPerPage - 1; // 4
//       }

//       let startEndIndex = [
//         {
//           startIndex: currentStartIndex,
//           endIndex: currentEndIndex,
//         },
//       ];
//       currentStartIndex += this.state.maxCountPerPage;
//       indexRangeList[i] = [...startEndIndex];
//       currentEndIndex = currentEndIndex + 1;
//     }
//     // console.log("currentStartEndIndex", currentStartEndIndex);
//     console.log("this.state.currentPage", this.state.currentPage);
//     const [currentStartEndIndex] = indexRangeList[this.state.currentPage - 1];

//     return this.state.movies.filter((movie, index) => {
//       return (
//         index >= currentStartEndIndex.startIndex &&
//         index <= currentStartEndIndex.endIndex
//       );
//     });
//   }

//   handlePageClick(item) {
//     // this.setState({ currentPage: item });
//     console.log(item);
//     let currentPage = this.state.currentPage;
//     currentPage = item;
//     this.setState({ currentPage });
//   }

//   renderTable() {
//     if (this.state.movies.length) {
//       return (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Genre</th>
//               <th>Stock</th>
//               <th>Rate</th>
//               <th />
//               <th />
//             </tr>
//           </thead>
//           <tbody>
//             {this.getCurrentMovies().map((movie) => {
//               return (
//                 <tr key={movie._id}>
//                   <td>{movie.title}</td>
//                   <td>{movie.genre.name}</td>
//                   <td>{movie.numberInStock}</td>
//                   <td>{movie.dailyRentalRate}</td>
//                   <td>
//                     <Like
//                       onClick={() => this.handleLike(movie)}
//                       isLiked={movie.isLiked}
//                     />
//                   </td>
//                   <td>{this.renderDeleteButton(movie._id)}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       );
//     }
//   }

//   render() {
//     return (
//       <React.Fragment>
//         {this.renderTableInfo()}
//         {this.renderTable()}
//         <Pagination
//           totalPages={Math.ceil(
//             this.state.movies.length / this.state.maxCountPerPage
//           )}
//           currentPage={this.state.currentPage}
//           onPageClick={this.handlePageClick.bind(this)}
//         />
//       </React.Fragment>
//     );
//   }
// }
