// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"

// import Turbolinks from "turbolinks"
// import * as ActiveStorage from "@rails/activestorage"

import "channels"

Rails.start()

// Turbolinks.start()
// ActiveStorage.start()

import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

import {Provider} from 'react-redux'
import {store} from '../store'

document.addEventListener('DOMContentLoaded', () => {
  const csrfToken = document.querySelector("meta[name=csrf-token]").content;
  axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('main')
  );
})
