import jwt_decode from "jwt-decode";

export const getUserData = () => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : undefined;
};

export const saveUserData = (data) => {
  const user = jwt_decode(data);
  localStorage.setItem("user", JSON.stringify(user));
};
