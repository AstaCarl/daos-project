import { useState } from "react";

// custom hook for sending a POST request

// T is the type of the response data, U is the type of the request body which can be any type when the hook is used
export function usePost<T, U>(
  endpoint: string,
  body: U,
  headers?: HeadersInit
): { data: T | null; error: string | null; loading: boolean; postData: () => Promise<void> } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // POST request function
  const postData = async () => {
    setLoading(true);
    setError(null); // Reset error state before making a new request

    try {
      // Send a POST request to the endpoint with the provided body and headers
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers, // Spread the headers object to include any additional headers 
        },
        body: JSON.stringify(body), // Convert the body to a JSON string
      });
      // If the response status code is not ok, throw an error
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data from response:", errorData);
        setError(errorData.message || "An error occurred."); // Set the error message to display to the user
        return; // exit the function early if there is an error
      }
      // If the response is ok, extract the data from the response
      const result = await response.json();
      setData(result); // Set the response data

      // Handle any errors that occur during the fetch
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage); // Set the error message to display to the user
    } finally {
      setLoading(false); // Set loading state to false after the request is complete
    }
  };

  return { data, error, loading, postData }; // return the data, error, loading state, and the postData function
}