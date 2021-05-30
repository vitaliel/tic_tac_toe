import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  Redirect
} from "react-router-dom";

import {isLoggedIn, loginAsync, loginError} from "../features/user/userSlice";

export default () => {
  const loggedIn = useSelector(isLoggedIn);
  const dispatch = useDispatch();
  const userError = useSelector(loginError);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(loginAsync({login, password}));
  }

  if (loggedIn) {
    return <Redirect to='/'/>
  }

  return (
    <div className='row'>
      <div className='col-6'>
        <div>Logged in: {loggedIn ? 'true' : 'false'}</div>
        {userError !== '' ? <div style={{color: 'red'}}>Login error: {userError}</div> : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group size="lg" controlId="login">
            <Form.Label>Login</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              autoFocus
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit" disabled={!validateForm()}>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
}
