import axios from "axios";

export const backendURL = axios.create({
    baseURL: `https://yourtransfer-app.herokuapp.com/`,
});