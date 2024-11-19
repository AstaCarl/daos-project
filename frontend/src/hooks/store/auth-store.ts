import { create } from "zustand";

interface AuthStore {
  accessToken: string | undefined;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

// Function to get the initial token from sessionStorage
const getInitialToken = () => {
  if (typeof window !== "undefined") {
    // Retrieve the token from sessionStorage if it exists
    return sessionStorage.getItem("accessToken") || undefined;
  }
  return undefined;
};

// Create the Zustand store for authentication
export const useAuthStore = create<AuthStore>((set) => ({
  // Initialize the accessToken state with the value from sessionStorage
  accessToken: getInitialToken(),

  // Function to set the accessToken in both state and sessionStorage
  setAccessToken: (token: string) => {
    sessionStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },

  // Function to clear the accessToken from both state and sessionStorage
  clearAccessToken: () => {
    sessionStorage.removeItem("accessToken");
    set({ accessToken: undefined });
  },
}));
