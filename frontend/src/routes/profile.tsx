import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import ActionCard from "../components/ActionCard";
import CreateEmsembleForm from "../components/CreateEmsembleForm";
import MyEnsembles from "../components/MyEnsembles";
import { useFetch } from "../hooks/use-fetch";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
  city?: string;
  description?: string;
  zipCode?: string;
}

export default function profile({}) {
  const navigate = useNavigate();
  // Get the isLoggedIn state variable and the login function from the auth store
  const { isLoggedIn } = useAuthStore();
  const [openEnsembleForm, setOpenEnsembleForm] = useState(false);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);

  const handleOpenEnsembleForm = () => {
    console.log("Open ensemble form");
    setOpenEnsembleForm(true);
  };

  const handleEnsembleCreated = (newEnsemble: Ensemble) => {
    setEnsembles((prevEnsembles) => [...prevEnsembles, newEnsemble]);
    setOpenEnsembleForm(false);
  };

  const handleCloseEnsembleForm = () => {
    setOpenEnsembleForm(false);
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
        setEnsembles(data);
        return ensembles;
      } else {
        console.error("Create ensemble error:", response.statusText);
      }
    } catch (error) {
      console.error("Create ensemble error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-10 py-16">
      {ensembles.length === 0 && (
        <ActionCard
          buttonText="Opret ensemble"
          paragrafText="Hvis du repræsenterer et ensemble kan du oprette det her, så du kan lave et opslag på vegne af ensemblet."
          subtitle="Mine ensembler"
          smallButtonText="Tilføj"
          onClick={handleOpenEnsembleForm}
        />
      )}
      {openEnsembleForm && (
        <CreateEmsembleForm
          onEnsembleCreated={handleEnsembleCreated}
          onEnsembleFormClosed={handleCloseEnsembleForm}
        />
      )}
      {ensembles.length > 0 && (
        <MyEnsembles
          ensembles={ensembles}
          onOpenEnsembleForm={handleOpenEnsembleForm}
        />
      )}
    </div>
  );
}
