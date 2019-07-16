import axios from 'axios';

const request = (method, url) => axios({
  method,
  url: `http://jstest.monterosa.io${url}`,
});

export const fetchPlayers = () => {
  return request('get', '/playerList.json');
};
