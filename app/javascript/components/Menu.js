import React from 'react';
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import {LinkContainer} from "react-router-bootstrap";
import Button from "react-bootstrap/Button";

export default ({loggedIn}) => {
  return (
    <ButtonToolbar className="custom-btn-toolbar">
      <LinkContainer to="/">
        <Button>Home</Button>
      </LinkContainer>
      {loggedIn ?
        <LinkContainer to="/games">
          <Button>Games</Button>
        </LinkContainer>
        :
        <LinkContainer to="/login">
          <Button>Login</Button>
        </LinkContainer>
      }
    </ButtonToolbar>
  );
}
