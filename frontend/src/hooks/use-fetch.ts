import { useState, useEffect } from "react";


type HTTP_METHOD = "POST" | "GET" | "PUT" | "DELETE" | "PATCH";

export function useFetch<T>(
  endpoint: string,
  method: HTTP_METHOD,
  headers?: HeadersInit,
  body?: unknown
): { data: T | null; error: string | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
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
  }, [endpoint, method, headers, body]);

  return { data, error, loading };
}