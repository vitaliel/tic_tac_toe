import axios from "axios";
import {STORAGE_TOKEN} from "../../constants";

export function listApi() {
  return new Promise((resolve, reject) => {
      const token = localStorage.getItem(STORAGE_TOKEN);

      axios.get('/games.json', {
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

export function showApi(id) {
  return new Promise((resolve, reject) => {
      const token = localStorage.getItem(STORAGE_TOKEN);

      axios.get(`/games/${id}.json`, {
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

export function newGameApi() {
  return new Promise((resolve, reject) => {
      const token = localStorage.getItem(STORAGE_TOKEN);

      axios.post('/games.json', {}, {
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

export function joinGameApi(id) {
  return new Promise((resolve, reject) => {
      const token = localStorage.getItem(STORAGE_TOKEN);

      axios.put(`/games/${id}/join.json`, {}, {
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

export function makeMoveGameApi({id, position}) {
  return new Promise((resolve, reject) => {
      const token = localStorage.getItem(STORAGE_TOKEN);

      axios.put(`/games/${id}/make_move.json`, {step: {position}}, {
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
