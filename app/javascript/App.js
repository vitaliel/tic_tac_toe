import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

import GameList from './pages/game/List';
import GameShow from './pages/game/Show';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './components/Menu';

import './App.scss';
import {useDispatch, useSelector} from "react-redux";
import {checkTokenAsync, isLoggedIn} from "./features/user/userSlice";

// TODO https://reactrouter.com/web/example/auth-workflow
const App = () => {
  const loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  const [checkAuthToken, setCheckAuthToken] = useState(true);

  if (checkAuthToken) {
    dispatch(checkTokenAsync());
    setCheckAuthToken(false);
  }
  return (
    <Router>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">TicTacToe</h1>
          <h2>
            <Menu loggedIn={loggedIn} />
          </h2>
        </Jumbotron>
        <div>
          <Switch>
            <Route path="/games/:id">
              <GameShow/>
            </Route>
            <Route path="/games">
              <GameList/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route exact path="/">
              <Home/>
            </Route>
          </Switch>
        </div>
      </Container>
    </Router>
  )
};

export default App;
