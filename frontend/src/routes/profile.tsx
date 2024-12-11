import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import ActionCard from "../components/ActionCard";
import CreateEmsembleForm from "../components/forms/CreateEmsembleForm";
import MyEnsembles from "../components/MyEnsembles";
import { useFetch } from "../hooks/use-fetch";
import RegisterEnsembleForm from "../components/forms/RegisterEnsembleForm";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStatus from "../components/ProfileStatus";
import AddInstrumentForm from "../components/forms/AddInstrumentForm";
import MyInstruments from "../components/MyInstruments";
import ProfileSetting from "../components/ProfileSetting";

interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
  city: string;
  website: string;
  description: string;
  zipcode: string;
}

interface User {
  _id: string;
  name: string;
  createdAt: Date;
  myInstruments: any[];
  lastname: string;
}

interface instrument {
  _id: string;
  name: string;
}

export default function profile() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const [openCreateEnsembleForm, setOpenCreateEnsembleForm] = useState(false);
  const [openRegisterEnsembleForm, setOpenRegisterEnsembleForm] =
    useState(false);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [openInstrumentForm, setOpenInstrumentForm] = useState(false);
  const [myInstruments, setMyInstruments] = useState<User>();
  const [openSettings, setOpenSettings] = useState(false);

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
    // await getEnsemble();
  };

  const handleEnsembleRegistered = async () => {
    setOpenRegisterEnsembleForm(false);
    // await getEnsemble();
  };

  const handleCloseRegisterEnsembleForm = () => {
    setOpenRegisterEnsembleForm(false);
    // getEnsemble();
  };

  const handleCloseCreateEnsembleForm = () => {
    setOpenCreateEnsembleForm(false);
    // getEnsemble();
  };

  const handleOpenInstrumentForm = () => {
    if (openInstrumentForm) {
      setOpenInstrumentForm(false);
    } else {
      setOpenInstrumentForm(true);
    }
  };

  const handleSettingsOpen = () => {
    if (openSettings) {
      setOpenSettings(false);
    } else {
      setOpenSettings(true);
    }
  };

  useEffect(() => {
    // getEnsemble();
    // getInstruments();
  }, []);

  // const [instruments, setInstruments] = useState<Instrument[]>([]);

  const userId = user._id;
  const {data: ensembleData} = useFetch<Ensemble[]>(`/ensemble/${userId}`, "GET")

  const { data: myInstrumentsData} = useFetch<User>(`/user/${userId}`, "GET");

  useEffect(() => {
    if (myInstrumentsData) {
    setMyInstruments(myInstrumentsData)
    console.log("Get my instruments successful:", myInstrumentsData);
    }
  }, [myInstrumentsData])

  useEffect(() => {
    if (ensembleData) {
    setEnsembles(ensembleData)
    console.log("Get ensemble successful:", ensembleData);
    }
  }, [ensembleData])

  // const getInstruments = async () => {
  //   // const userId = user._id;

  //   const response = await useFetch(`/instruments`, "GET", {
  //     "Content-Type": "application/json",
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log("Get instruments successful:", data);
  //     setInstruments(data);
  //     return instruments;
  //   } else {
  //     console.error("Get indtruments error:", response.statusText);
  //   }
  // };

  return (
    <>
      <div className="absolute bg-light-grey h-screen w-screen flex flex-col gap-6 pb-16 padding">
        {/* {openInstrumentForm && (
          // <AddInstrumentForm
          //   // instruments={myInstruments}
          //   handleOpenInstrumentForm={handleOpenInstrumentForm}
          // />
        )} */}
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
        {openSettings && (
          <ProfileSetting handleSettingsOpen={handleSettingsOpen} />
        )}
      </div>

      {!openRegisterEnsembleForm &&
        !openCreateEnsembleForm &&
        !openInstrumentForm &&
        !openSettings && (
          <div className="relative z-0 flex flex-col gap-10 pb-16">
            <ProfileHeader handleSettingsOpen={handleSettingsOpen} />
            <ProfileStatus user={user} />
            {!openInstrumentForm && ensembles.length === 0 && (
              <ActionCard
                buttonTextCreate="Opret nyt ensemble"
                buttonTextRegister="Registrer i ensemble"
                paragrafText="Hvis du repræsenterer et ensemble kan du oprette det her, eller registrere dig i et eksisterende ensemble."
                status="Du har ingen ensembler"
                subtitle="Mine ensembler"
                onClickCreate={handleOpenCreateEnsembleForm}
                onClickRegister={handleOpenRegisterEnsembleForm}
              />
            )}
            {myInstruments.length === 0 && (
              <ActionCard
                buttonTextCreate="Tilføj instrument"
                paragrafText="Tilføj et instrument du spille på, så ensmbler og musikere kan finde dig."
                subtitle="Mine instrumenter"
                status="Du har ingen instrumenter"
                onClickCreate={handleOpenInstrumentForm}
                onClickRegister={handleOpenRegisterEnsembleForm}
              />
            )}
            {ensembles.length > 0 && (
              <MyEnsembles
                data={ensembles}
                onOpenCreateEnsembleForm={handleOpenCreateEnsembleForm}
                onOpenRegisterEnsembleForm={handleOpenRegisterEnsembleForm}
              />
            )}
            {myInstruments && myInstruments.length > 0 && (
              <MyInstruments
                myInstruments={myInstruments.myInstruments}
                handleOpenInstrumentForm={handleOpenInstrumentForm}
              />
            )}
          </div>
        )}
    </>
  );
}
