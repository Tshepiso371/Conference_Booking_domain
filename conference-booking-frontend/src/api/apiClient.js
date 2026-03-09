import axios from "axios";

// Create a single Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});



apiClient.interceptors.request.use(
  (config) => {

    console.log(`Sending ${config.method?.toUpperCase()} to ${config.url}`);

    
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// ----------------------------
// RESPONSE INTERCEPTOR
// ----------------------------
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("API Error:", error.message);

    if (error.response?.status === 401 || error.response?.status === 403) {
  console.warn("Session expired or forbidden. Logging out.");

  localStorage.removeItem("token");

  //window.location.reload();
        }

    return Promise.reject(error);
  }
);


export default apiClient;