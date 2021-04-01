import axios from 'axios';

const baseURL = 'http://localhost:8000/api/';

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access')
            ? 'Bearer ' + localStorage.getItem('access')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json'
        },
});

axiosInstance.post(`auth/token/refresh/`, {
    refresh: localStorage.getItem('refresh')
})
.then((res) => {
    if(res.status === 200){
      localStorage.setItem('access', res.data.access);
      axiosInstance.defaults.headers['Authorization'] =
    'Bearer ' + localStorage.getItem('access');
    }else{
        window.location.href= '/login';
    }
});

export default axiosInstance;
