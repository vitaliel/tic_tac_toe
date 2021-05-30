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
