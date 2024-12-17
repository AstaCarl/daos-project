import { useState, useEffect } from "react";

export function useGet<T>(
  endpoint: string,
  dependencies?: any[]
): { data: T | null; error: string | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset previous error state before starting a new fetch

      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, ...(dependencies || [])]); // Re-run effect when endpoint or dependencies change

  return { data, error, loading };
}