import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import {gameList, gameListAsync, newGameAsync} from "../../features/game/gameSlice";
import {currentUser, isLoggedIn} from "../../features/user/userSlice";
import {Redirect} from "react-router-dom";

export default () => {
  const games = useSelector(gameList);
  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector(currentUser);
  const dispatch = useDispatch();

  if (!loggedIn) {
    return <Redirect to='/login'/>
  }

  if (!games.loaded && !games.loading) {
    dispatch(gameListAsync())
    return <div>Loading...</div>
  }

  if (games.loading) {
    return <div>Loading...</div>
  }

  const list = games.items.map(game => {
    return (
      <li key={game.id}>
        <LinkContainer to={`/games/${game.id}`}>
          <a href={`/games/${game.id}`}>#{game.id} Creator: {game.owner.login}</a>
        </LinkContainer>
        {' '}status: {game.status}
      </li>
    )
  });

  return (<>
      <h2>Games</h2>
      <div>
        <Button onClick={() => {
          dispatch(newGameAsync())
        }}>New Game</Button>
      </div>
      <div className='game-list'>
        <ul>
          {list}
        </ul>
      </div>
    </>
  )
}
