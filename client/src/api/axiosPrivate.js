import axios from 'axios';
const BASE_URL = 'http://localhost:3000';


export const axiosPrivate = axios.create({
  //  baseURL: BASE_URL,
    headers: { 'Content-Type': "multipart/form-data" },
    withCredentials: true
});