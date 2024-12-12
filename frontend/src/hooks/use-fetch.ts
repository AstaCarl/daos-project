// This file contains the functions that will be used to make requests to the backend.

// Define the base URL for the API. This is the root URL that will be used for all API requests.
const BASE_URL = "http://localhost:3000";

type HTTP_METHOD = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

// Defines an asynchronous function named post that takes two parameters: endpoint and data.
export async function useFetch(
  endpoint: string,
  method: HTTP_METHOD,
  headers?: HeadersInit,
  body?: unknown
): Promise<Response> {
  // Construct the full URL by combining the base URL and the endpoint you need to use.
  const url = `${BASE_URL}${endpoint}`;
  let response: Response;
  // Make a request to the specified URL with the data provided.
  try {
    response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error request:", error);
    throw error;
  }
  // Return the response object.
  return response;
}
