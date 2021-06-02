import React from 'react';
import {Redirect, useParams} from "react-router-dom";
import Board from '../../components/Board';
import {useSelector} from "react-redux";
import {isLoggedIn} from "../../features/user/userSlice";

export default () => {
  let {id} = useParams()
  const loggedIn = useSelector(isLoggedIn);

  if (!loggedIn) {
    return <Redirect to='/login'/>
  }

  return (
    <>
      <h2>Game #{id}</h2>
      <Board/>
    </>
  )
}
