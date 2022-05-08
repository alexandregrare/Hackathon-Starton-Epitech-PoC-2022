import axios from "axios";

export const backendURL = axios.create({
    baseURL: `http://localhost:8080`,
});