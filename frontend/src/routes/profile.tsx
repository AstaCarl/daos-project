import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";

export default function profile({}) {
    const navigate = useNavigate();
    // Get the isLoggedIn state variable and the login function from the auth store
    const { isLoggedIn } = useAuthStore();

  
    useEffect(() => {
      // Redirect to login if the user is not logged in
      if (!isLoggedIn) {
        navigate("/login");
      }
      
    }, [isLoggedIn, navigate]);
  return (
    <div>profile</div>
  )
}