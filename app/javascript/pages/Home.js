import React from "react";
import {useSelector} from "react-redux";
import {isLoggedIn, userLogin} from "../features/user/userSlice";

export default () => {
  const loggedIn = useSelector(isLoggedIn);
  const login = useSelector(userLogin);

  if (loggedIn) {
    return (
      <span>Welcome back {login}!</span>
    );
  } else {
    return (
      <span>Please login...</span>
    );
  }
}
