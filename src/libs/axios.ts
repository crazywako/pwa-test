import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
//console.log(process.env);

function createNewAxiosInstance() {
  const token = localStorage.getItem('token');
  const instance = axios.create({

    baseURL: isDev ? '/api' : '/api' ,
    headers: { Authorization: `Bearer ${token}` },
    timeout: 1000,
  });
  return instance;
}

export default createNewAxiosInstance();
