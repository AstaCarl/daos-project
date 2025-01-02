import { create } from "zustand"; // Import the create function from zustand
import { persist } from "zustand/middleware"; // Import the persist middleware from zustand

// Create a new store (global state) with the persist middleware to store the user and access token in the local storage
interface AuthStore {
  user: any;
  accessToken: string | null;
  login: (user: any, token: string) => void; // Function to login the user
  logout: () => void; // Function to logout the user
}

const useAuthStore = create(
  // middleware to persist (make sure it stays) the user and access token in the local storage
  persist<AuthStore>(
    (set) => ({
      // Initialize the user and accessToken state to null
      user: null, 
      accessToken: null, 
      // Function to login the user, set the user and access token in the local storage, and updates the store (global state) to include the user and access token
      login: (user, token) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({user, accessToken: token});
      },
      // Function to logout the user, set the user and access token to null in the store (global state), and clear the local storage
      logout: () => {
        set({ user: null, accessToken: null });
        localStorage.clear();
      },
    }),
    {
      name: "auth-storage", // Name of the local storage key
    }
  )
);

export default useAuthStore;
