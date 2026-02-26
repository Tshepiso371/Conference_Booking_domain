// Create a reusable Axios instance for API calls
const apiClient = axios.create({
  // Base URL pulled from environment variables (Vite)
  baseURL: import.meta.env.VITE_API_BASE_URL,

  // Request timeout set to 5 seconds
  timeout: 5000,

  // Default headers sent with every request
  headers: {
    "Content-Type": "application/json",
  },
});


// ==========================
// REQUEST INTERCEPTOR
// ==========================
// This runs before every request is sent
apiClient.interceptors.request.use(
  (config) => {
    // Log the HTTP method and URL for debugging
    console.log(
      `Sending ${config.method?.toUpperCase()} to ${config.url}`
    );

    // IMPORTANT: Always return the config
    // so the request can proceed
    return config;
  },
  (error) => {
    // If there's an error before the request is sent,
    // reject the promise so it can be handled later
    return Promise.reject(error);
  }
);


// ==========================
// RESPONSE INTERCEPTOR
// ==========================
// This runs after a response is received
apiClient.interceptors.response.use(
  (response) => {
    // Automatically return only the response data
    // instead of the full Axios response object
    return response.data;
  },
  (error) => {
    // Log API errors for debugging purposes
    console.error("API Error:", error.message);

    // Reject the promise so calling code can handle the error
    return Promise.reject(error);
  }
);

// Export the configured Axios instance
// so it can be used throughout the app
export default apiClient;