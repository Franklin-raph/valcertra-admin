import axios from "axios";
import Cookies from 'js-cookie';

// Determine environment
// const isDevelopment = process.env.NODE_ENV === 'development';

const axiosInstance = axios.create({
    // baseURL: isDevelopment 
    //     ? 'https://wifi-combat.onrender.com' 
    //     : 'https://backend.wificombatelearn.com',
    baseURL: 'https://valcretra-api.rawmaterialafrica.com',
    timeout: 10000, // 10 seconds
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add Authorization token to headers if available
        const token = Cookies.get('token')
        
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Handle response (e.g., format data)
        return response.data;
    },
    (error) => {
        // Handle errors (e.g., token expiration, server errors then display error message)
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(`API request error: ${error.response.status} - ${error.response.statusText}`);
            console.log(error);
            
            if (error.response.status === 401 || error.response.status === 403) {
                // Unauthorized, clear the token and redirect to login page
                console.log('Unauthorized! Logging out...');
                localStorage.removeItem('token');
                Cookies.remove('token');
                window.location.href = '/#/';
            }
        } else if (error) {
            // The request was made but no response was received
            console.log('API request error: No response received');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('API request error: ', error.message);
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;