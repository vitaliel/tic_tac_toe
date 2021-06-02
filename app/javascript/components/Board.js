import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {currentUser} from "../features/user/userSlice";
import {currentGame, makeMoveGameAsync} from "../features/game/gameSlice";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const gameEntity = useSelector(currentGame);
  const game = gameEntity.object;
  const mySymbol = game.owner.id === user.id ? 'O' : 'X';
  const isMyMove = user.id === game.next_player.id && game.status === 'playing';

  function makeMove(step) {
    const id = game.id;
    const {position} = step;
    dispatch(makeMoveGameAsync({id, position}));
  }

  const list = game.steps.map(step => {
    return (
      <div className='item' key={step.id}>
        {isMyMove && step.symbol === '.' && <button onClick={() => makeMove(step)}>{mySymbol}</button>}
        {isMyMove && step.symbol !== '.' && <span>{step.symbol}</span>}

        {!isMyMove && step.symbol === '.' && <span className='empty'/>}
        {!isMyMove && step.symbol !== '.' && <span>{step.symbol}</span>}
      </div>
    )
  });

  return (
    <div className='row'>
      <div className="col-4">
        <div className='board'>{list}</div>
      </div>
    </div>
  )
}
