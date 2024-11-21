import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import CreateCard from "../components/CreateCard";
import CreateEmsembleForm  from "../components/CreateEmsembleForm";

export default function profile({}) {
    const navigate = useNavigate();
    // Get the isLoggedIn state variable and the login function from the auth store
    const { isLoggedIn } = useAuthStore();
    const [openEmsenbleForm, setOpenEnsembleForm] = useState(false);

  
    useEffect(() => {
      // Redirect to login if the user is not logged in
      if (!isLoggedIn) {
        navigate("/login");
      }
      
    }, [isLoggedIn, navigate]);

    const handleOpenEnsembleForm = () => {
      console.log("Open ensemble form")
      setOpenEnsembleForm(true);
    }

  return (
    <div>
    <CreateCard
    buttonText="Opret ensemble"
    paragrafText="Hvis du repræsenterer et ensemble kan du oprette det her, så du kan lave et opslag på vegne af ensemblet."
    subtitle="Mine ensembler"
    smallButtonText="Tilføj" onClick={handleOpenEnsembleForm} />
    {openEmsenbleForm &&
    <CreateEmsembleForm/>
  }
    </div>
  )
}