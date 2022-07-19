import http from "./httpService";

const url = `/users`;

export const register = (user) => {
  return http.post(url, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
};
