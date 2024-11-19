import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";

type Props = {}

export default function profile({}: Props) {
    const navigate = useNavigate();
    const {login} = useAuthStore()

  
    useEffect(() => {
      // Check if accessToken exists on page load
      if (!login) {
        navigate("/login"); // Redirect to login if no token
      }
      
    }, []);
  return (
    <div>profile</div>
  )
}