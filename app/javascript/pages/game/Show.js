import React, {useState} from 'react';
import {Redirect, useParams} from "react-router-dom";
import Board from '../../components/Board';
import {useDispatch, useSelector} from "react-redux";
import {currentUser, isLoggedIn} from "../../features/user/userSlice";
import {currentGame, gameShowAsync, joinGameAsync} from "../../features/game/gameSlice";
import Button from "react-bootstrap/Button";

export default () => {
  let {id} = useParams()
  const dispatch = useDispatch();
  const game = useSelector(currentGame);
  const loggedIn = useSelector(isLoggedIn);
  const [loadGame, setLoadGame] = useState(true);

  if (!loggedIn) {
    return <Redirect to='/login'/>
  }

  if (loadGame) {
    dispatch(gameShowAsync(id));
    setLoadGame(false);
  }

  if (!game.loaded && !game.loading) {
    return <div>Loading...</div>
  }

  if (game.loading) {
    return <div>Loading...</div>
  }

  if (game.error !== '') {
    return <div>Error: {game.error}</div>
  }

  return (
    <>
      <h2>Game #{id}{' '}
        <Button onClick={() => {
          dispatch(gameShowAsync(game.id))
        }}>Reload</Button>
      </h2>
      <div><Status/></div>
      {game.object.status !== 'created' && <Board/>}
    </>
  )
};

function Status() {
  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const gameEntity = useSelector(currentGame);
  const game = gameEntity.object;

  switch (game.status) {
    case 'created':
      if (game.owner.id === user.id) {
        return <span>Waiting for other player to join.</span>
      } else {
        return <span>Please <Button onClick={() => {
          dispatch(joinGameAsync(game.id))
        }}>Join</Button> to begin.</span>
      }
    case 'playing':
      return <span>Playing: {game.next_player.login}'s move.</span>
    case 'finished':
      const winner = game.win_player != null ? `Winner is ${game.win_player.login}`: 'Nobody wins';
      return <span>Game is finished: {winner}.</span>
  }
}
