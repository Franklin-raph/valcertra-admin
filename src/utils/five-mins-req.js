/**
 * Makes a GET request to the specified URL at regular intervals
 * @param {string} url - The URL to make the GET request to
 * @param {number} intervalMinutes - Interval in minutes between requests (default: 5)
 * @param {Function} callback - Optional callback function to process the response
 * @param {Object} headers - Optional headers to include with the request
 * @returns {Object} - An object with a stop method to cancel the polling
 */
function pollEndpoint(url, intervalMinutes = 5, callback = null, headers = {}) {
    // Convert minutes to milliseconds
    const intervalMs = intervalMinutes * 60 * 1000;
    let isPolling = true;
    let intervalId = null;
    
    // Function to make the actual GET request
    const makeRequest = async () => {
      if (!isPolling) return;
      
      try {
        console.log(`Making GET request to ${url} at ${new Date().toLocaleTimeString()}`);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Process the response with the callback if provided
        if (callback && typeof callback === 'function') {
          callback(data);
        } else {
          console.log('Response received:', data);
        }
      } catch (error) {
        console.error('Error making GET request:', error);
      }
    };
    
    // Make an immediate request when starting
    makeRequest();
    
    // Set up the interval for subsequent requests
    intervalId = setInterval(makeRequest, intervalMs);
    
    // Return an object with a method to stop polling
    return {
      stop: () => {
        if (intervalId) {
          clearInterval(intervalId);
          isPolling = false;
          console.log('Polling stopped');
        }
      }
    };
  }
  
  // Example usage:
  // const poller = pollEndpoint(
  //   'https://api.example.com/data',
  //   5, // 5 minutes
  //   (data) => console.log('Processing data:', data),
  //   { 'Authorization': 'Bearer token123' }
  // );
  // 
  // // Later, to stop polling:
  // // poller.stop();