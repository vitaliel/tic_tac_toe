import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {LinkContainer} from "react-router-bootstrap";

const GAMES = [
  {id: 1, owner_login: 'alice'},
  {id: 2, owner_login: 'bob'},
  {id: 3, owner_login: 'alice'},
]

export default () => {

  const list = GAMES.map(game => {
    return (
      <li key={game.id}>
        <LinkContainer to={`/games/${game.id}`}>
          <div>
            <a href='#'>#{game.id} {game.owner_login}</a>
          </div>
        </LinkContainer>
      </li>
    )
  });

  return (<>
      <h2>Games</h2>
      <div>
        <button onClick={() => dispatch()}/>
      </div>
      <div className='game-list'>
        <ul>
          {list}
        </ul>
      </div>
    </>
  )
}
