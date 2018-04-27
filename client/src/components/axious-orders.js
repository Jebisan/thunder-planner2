import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://thunder-planner.firebaseio.com/'
})

export default instance; 