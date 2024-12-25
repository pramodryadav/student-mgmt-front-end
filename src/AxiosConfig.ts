import axios from "axios";
import { CONFIG } from "./config";
const instance = axios.create({
    baseURL: CONFIG.baseURL,
    timeout: 5000, // set timeout to 10 seconds
    headers: {
        'Content-Type': 'application/json'
    }
});

export default instance