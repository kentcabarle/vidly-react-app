import http from "./httpService";

const url = `/movies`;
const movieUrl = (id) => {
  return `${url}/${id}`;
};

export const getMovies = () => {
  return http.get(url);
};

export const getMovie = (id) => {
  return http.get(movieUrl(id));
};

export const saveMovie = (movie) => {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }
  return http.post(url, movie);
};

export const deleteMovie = (id) => {
  return http.delete(movieUrl(id));
};
