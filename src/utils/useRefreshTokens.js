import axios from 'axios';

const useRefreshTokens = () => {
  const accessToken = axios
    .post('http://localhost:8000/api/token/refresh/', {
      refresh: JSON.parse(localStorage.getItem('refresh')),
    })
    .then((response) => {
      localStorage.setItem('access', JSON.stringify(response.data.access));
    })
    .catch((error) => {
      console.log(error.message);
    });
  return accessToken;
};

export default useRefreshTokens;
