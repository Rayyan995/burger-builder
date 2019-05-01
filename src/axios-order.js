import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rayyan-react-burger.firebaseio.com/'
});

export default instance;