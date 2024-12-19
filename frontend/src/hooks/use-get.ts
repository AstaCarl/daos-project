import { useState, useEffect } from "react";

// custom hook for fetching data from an API endpoint using the GET method

// T is the type of the response data, that can be any type when the hook is used
export function useGet<T>(
  endpoint: string, // API endpoint
  dependencies?: any[] // dependencies to re-run the effect
): { data: T | null; error: string | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect to fetch the data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset previous error state before starting a new fetch

      // try/catch block to handle errors
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`); // fetch data from the endpoint, using the VITE_BASE_URL environment variable and the endpoint provided when used
        
        // if the response status code is not ok, throw an error
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // if the response is ok, extract the data from the response and set the data state to the result
        const result = await response.json();
        setData(result);

        // handles the error if an error occurs during the fetch
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);// Set loading state to false after the fetch is complete
      }
    };

    fetchData(); // Call the fetchData function when the effect runs

  }, [endpoint, ...(dependencies || [])]); // Re-run effect when endpoint or dependencies change

  return { data, error, loading }; // Return the data, error, and loading state
}