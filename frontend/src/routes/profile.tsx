import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import ActionCard from "../components/ActionCard";
import CreateEmsembleForm from "../components/CreateEmsembleForm";
import MyEnsembles from "../components/MyEnsembles";
import { useFetch } from "../hooks/use-fetch";
import Register from "./register";
import RegisterEnsembleForm from "../components/RegisterEnsembleForm";

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
  const [openCreateEnsembleForm, setOpenCreateEnsembleForm] = useState(false);
  const [openRegisterEnsembleForm, setOpenRegisterEnsembleForm] = useState(false);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);

  const handleOpenCreateEnsembleForm = () => {
    console.log("Open ensemble form");
    setOpenCreateEnsembleForm(true);
  };

  const handleOpenRegisterEnsembleForm = () => {
    console.log("Open ensemble form");
    setOpenRegisterEnsembleForm(true);
  };

  const handleEnsembleCreated = async (newEnsemble: Ensemble) => {
    setEnsembles((prevEnsembles) => [...prevEnsembles, newEnsemble]);
    setOpenCreateEnsembleForm(false);
    await getEnsemble();
  };

  const handleEnsembleRegistered = async (newEnsemble: Ensemble) => {
    setEnsembles((prevEnsembles) => [...prevEnsembles, newEnsemble]);
    setOpenRegisterEnsembleForm(false);
    await getEnsemble();
  };

  const handleCloseCreateEnsembleForm = async () => {
    setOpenCreateEnsembleForm(false);
  };

  const handleCloseRegisterEnsembleForm = async () => {
    setOpenRegisterEnsembleForm(false);
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
          onClick={handleOpenCreateEnsembleForm}
        />
      )}
      {openCreateEnsembleForm && (
        <CreateEmsembleForm
          onEnsembleCreated={handleEnsembleCreated}
          onEnsembleFormClosed={handleCloseCreateEnsembleForm}
        />
      )}
            {openRegisterEnsembleForm && (
        <RegisterEnsembleForm
          onEnsembleRegistered={handleEnsembleRegistered}
          onEnsembleFormClosed={handleCloseRegisterEnsembleForm}
        />
      )}
      {ensembles.length > 0 && (
        <MyEnsembles
          ensembles={ensembles}
          onOpenCreateEnsembleForm={handleOpenCreateEnsembleForm}
          onOpenRegisterEnsembleForm={handleOpenRegisterEnsembleForm}
        />
      )}
    </div>
  );
}
