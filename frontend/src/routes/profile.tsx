import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import CreateCard from "../components/CreateCard";
import CreateEmsembleForm from "../components/CreateEmsembleForm";
import { useFetch } from "../hooks/use-fetch";
import ProfileHeader from "../components/ProfileHeader";

export default function profile({}) {
  const navigate = useNavigate();
  // Get the isLoggedIn state variable and the login function from the auth store
  const { isLoggedIn } = useAuthStore();
  const [openEmsenbleForm, setOpenEnsembleForm] = useState(false);

  const handleOpenEnsembleForm = () => {
    console.log("Open ensemble form");
    setOpenEnsembleForm(true);
  };

  useEffect(() => {
    // Redirect to login if the user is not logged in
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    getEnsemble();
  }, []);

  const getEnsemble = async () => {
    try {
      const user = localStorage.getItem("user");
      if (!user) {
        throw new Error("User is missing");
      }
      const userId = JSON.parse(user)._id;

      const response = await useFetch(`/ensemble/${userId}`, "GET", {
        "Content-Type": "application/json",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Create ensemble successful:", data);
      } else {
        console.error("Create ensemble error:", response.statusText);
      }
    } catch (error) {
      console.error("Create ensemble error:", error);
    }
  };

  return (
    <div>
      <CreateCard
        buttonText="Opret ensemble"
        paragrafText="Hvis du repræsenterer et ensemble kan du oprette det her, så du kan lave et opslag på vegne af ensemblet."
        subtitle="Mine ensembler"
        smallButtonText="Tilføj"
        onClick={handleOpenEnsembleForm}
      />
      {openEmsenbleForm && <CreateEmsembleForm />}
    </div>
  );
}
