import axios from "axios";

export function loginApi(login, password) {
  const data = {user: {login, password}}
  return new Promise((resolve, reject) => {
      axios.post('/users/login.json', data)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          console.error('axios error', error);
          reject(error)
        })
    }
  );
}

export function tokenApi(token) {
  return new Promise((resolve, reject) => {
      axios.get('/users/me.json', {
        headers: {
          'X-Token': token
        }
      })
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          console.error(error);
          reject(error)
        })
    }
  );
}
