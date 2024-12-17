import { useState } from "react";

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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers, // Merge any custom headers passed as arguments
        },
        body: JSON.stringify(body), // Convert the body to a JSON string
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data from response:", errorData); // Log the error data
        setError(errorData.message || "An error occurred.");
        return;
      }

      const result = await response.json();
      setData(result); // Set the response data
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
}