import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: "http://localhost:3000/api/v1",
     withCredentials: true, // This allows cookies to be sent with requests
     headers: {
          "Content-Type": "application/json",
     },
});
export default axiosInstance;