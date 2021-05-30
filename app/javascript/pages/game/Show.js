import React from 'react';
import {useParams} from "react-router-dom";
import Board from '../../components/Board';

export default () => {
  let {id} = useParams()
  return (
    <>
      <h2>Game #{id}</h2>
      <Board/>
    </>
  )
}
