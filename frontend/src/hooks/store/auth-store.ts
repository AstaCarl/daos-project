import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  user: any;
  accessToken: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}


const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      user: null,
      accessToken: null,
      login: (user, token) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        set({ isLoggedIn: true, user, accessToken: token });
      },
      logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
