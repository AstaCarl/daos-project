import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import ActionCard from "../components/ActionCard";
import CreateEmsembleForm from "../components/CreateEmsembleForm";
import MyEnsembles from "../components/MyEnsembles";
import { useFetch } from "../hooks/use-fetch";
import RegisterEnsembleForm from "../components/RegisterEnsembleForm";
import ProfileHeader from "../components/ProfileHeader";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
  city: string;
  website: string;
  description: string;
  zipcode: string;
}

export default function profile() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const [openCreateEnsembleForm, setOpenCreateEnsembleForm] = useState(false);
  const [openRegisterEnsembleForm, setOpenRegisterEnsembleForm] =
    useState(false);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);

  useEffect(() => {
    // Redirect to login if the user is not logged in
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleOpenCreateEnsembleForm = () => {
    setOpenCreateEnsembleForm(true);
  };

  const handleOpenRegisterEnsembleForm = () => {
    setOpenRegisterEnsembleForm(true);
  };

  const handleEnsembleCreated = async () => {
    setOpenCreateEnsembleForm(false);
    await getEnsemble();
  };

  const handleEnsembleRegistered = async () => {
    setOpenRegisterEnsembleForm(false);
    await getEnsemble();
  };

  const handleCloseRegisterEnsembleForm = () => {
    setOpenRegisterEnsembleForm(false);
    getEnsemble();
  };

  const handleCloseCreateEnsembleForm = () => {
    setOpenCreateEnsembleForm(false);
    getEnsemble();
  };

  useEffect(() => {
    getEnsemble();
  }, []);

  const getEnsemble = async () => {
      const userId = user._id;

      const response = await useFetch(`/ensemble/${userId}`, "GET", {
        "Content-Type": "application/json",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get ensembles successful:", data);
        setEnsembles(data);
        return ensembles;
      } else{
        console.error("Get ensembles error:", response.statusText);
      }
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      <ProfileHeader />
      {ensembles.length === 0 && (
          <ActionCard
            buttonTextCreate="Opret nyt ensemble"
            buttonTextRegister="Registrer i ensemble"
            paragrafText="Hvis du repræsenterer et ensemble kan du oprette det her, eller registrere dig i et eksisterende ensemble."
            subtitle="Mine ensembler"
            smallButtonText="Tilføj"
            onClickCreate={handleOpenCreateEnsembleForm}
            onClickRegister={handleOpenRegisterEnsembleForm}
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
      {!openCreateEnsembleForm &&
        !openRegisterEnsembleForm &&
        ensembles.length > 0 && (
          <MyEnsembles
            data={ensembles}
            onOpenCreateEnsembleForm={handleOpenCreateEnsembleForm}
            onOpenRegisterEnsembleForm={handleOpenRegisterEnsembleForm}
          />
        )}
    </div>
  );
}
