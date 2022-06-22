import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useRefreshTokens from './useRefreshTokens';

const useAxiosInstance = () => {
  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  axios.defaults.xsrfCookieName = 'csrftoken';

  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    setTimeout: 1000,
    headers: {
      Authorization: 'Bearer ' + JSON.parse(accessToken),
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${JSON.parse(
        localStorage.getItem('access')
      )}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        try {
          originalRequest._retry = true;
          const access = await useRefreshTokens();
          console.log('New Access Token: ', access);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
          return instance(originalRequest);
        } catch (error) {
          console.log(error.message);
          navigate('/logout/');
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosInstance;
