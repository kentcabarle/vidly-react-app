import http from "./httpService";
import jwtDecode from "jwt-decode";

const url = `/auth`;
const tokenKey = "token";

export const login = async (email, password) => {
  const { data: jwt } = await http.post(url, { email, password });
  localStorage.setItem(tokenKey, jwt);
};

export const getCurrentUser = () => {
  try {
    return jwtDecode(getJwt());
  } catch (ex) {}
  return null;
};

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

export default {
  login,
  getCurrentUser,
  loginWithJwt,
  logout,
  getJwt,
};
