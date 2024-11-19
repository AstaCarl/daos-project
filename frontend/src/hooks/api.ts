
// This file contains the functions that will be used to make requests to the backend.

// Define the base URL for the API. This is the root URL that will be used for all API requests.
const BASE_URL = "http://localhost:3000";


// Defines an asynchronous function named post that takes two parameters: endpoint and data.
export async function post<T>(endpoint: string, data: T): Promise<Response> {
    // Construct the full URL by combining the base URL and the endpoint you need to use.
    const url = `${BASE_URL}${endpoint}`;
    // Make a POST request to the specified URL with the data provided.
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Convert the data object to a JSON string and send it as the body of the request.
      body: JSON.stringify(data),
    });
  // Check if the response is successful, status code 200-299. If not, throw an error.
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  // Return the response object.
    return response;
  }