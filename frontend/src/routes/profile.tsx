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
import DeleteModal from "../components/DeleteModal";
import CreatePostForm from "../components/forms/CreatePostForm";

export interface Ensemble {
  _id: string;
  title: string;
  activeUsers: string[];
  city: string;
  website: string;
  description: string;
  zipcode: string;
}

interface UserInstrumentsData {
  myInstruments: Instrument[];
}

export interface Instrument {
  _id: string;
  name: string;
}

interface Posts {
  _id: string;
  title: string;
  description: string;
  instrument: {
    _id: string;
    name: string;
  };
  user: {
    _id: string;
    name: string;
    lastname: string;
  };
  ensemble: {
    _id: string;
    title: string;
    city: string;
    activeUsers: string[];
  };
}

export default function profile() {
  const navigate = useNavigate();
  const { isLoggedIn, user, accessToken } = useAuthStore();
  const [openCreateEnsembleForm, setOpenCreateEnsembleForm] = useState(false);
  const [openRegisterEnsembleForm, setOpenRegisterEnsembleForm] =
    useState(false);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [openInstrumentForm, setOpenInstrumentForm] = useState(false);
  const [myInstruments, setMyInstruments] = useState<Instrument[]>([]);
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [openSettings, setOpenSettings] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<
    string | undefined
  >(undefined);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [openCreatePostForm, setOpenCreatePostForm] = useState(false);
  const [posts, setPosts] = useState<Posts[]>([]);

  useEffect(() => {
    // Redirect to login if the user is not logged in
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleOpenCreateEnsembleForm = () => {
    if (openCreateEnsembleForm) {
      setOpenCreateEnsembleForm(false);
    } else {
      setOpenCreateEnsembleForm(true);
    }
  };

  const handleOpenRegisterEnsembleForm = () => {
    if (openRegisterEnsembleForm) {
      setOpenRegisterEnsembleForm(false);
    } else {
      setOpenRegisterEnsembleForm(true);
    }
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

  const handlePostsOpen = () => {
    if (openCreatePostForm) {
      setOpenCreatePostForm(false);
    } else {
      setOpenCreatePostForm(true);
    }
  };

  const handleEnsembleCreated = (newEnsemble: Ensemble) => {
    setEnsembles((prevEnsembles) => [...prevEnsembles, newEnsemble]);
  };

  const userId = user._id;
  const { data: ensembleData } = useFetch<Ensemble[]>(
    `/ensemble/${userId}`,
    "GET"
  );

  const { data: postsData } = useFetch<Posts[]>(`/posts/${userId}`, "GET");

  const { data: myInstrumentsData } = useFetch<UserInstrumentsData>(
    `/user/${userId}`,
    "GET",
    [fetchTrigger]
  );

  const { data: instrumentsData } = useFetch<Instrument[]>(
    `/instruments`,
    "GET"
  );

  useEffect(() => {
    if (instrumentsData) {
      setInstruments(instrumentsData);
      console.log("Get instruments successful:", instrumentsData);
    }
  }, [instrumentsData]);

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
      console.log("Get posts successful:", postsData);
    }
  }, [postsData]);

  useEffect(() => {
    if (myInstrumentsData) {
      setMyInstruments(myInstrumentsData.myInstruments);
      console.log(
        "Get my instruments successful:",
        myInstrumentsData.myInstruments
      );
    }
  }, [myInstrumentsData]);

  useEffect(() => {
    if (ensembleData) {
      setEnsembles(ensembleData);
      console.log("Get ensemble successful:", ensembleData);
    }
  }, [ensembleData]);

  const handleRemoveMyInstrument = async (selectedInstrumentId?: string) => {
    const userId = user._id;

    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/user/${userId}/my-instruments/${selectedInstrumentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(ensembleData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("remove instrument succesful:", data);
      setFetchTrigger((prev) => !prev);
    } else {
      console.error("Remove instrument error:", response.statusText);
    }
  };

  const handleOpenDeleteModal = (instrumentId?: string) => {
    if (openDeleteModal) {
      setOpenDeleteModal(false);
    } else {
      setOpenDeleteModal(true);
      setSelectedInstrumentId(instrumentId);
    }
  };

  return (
    <>
      <div className="absolute bg-light-grey h-screen w-screen flex flex-col gap-6 pb-16 padding">
        {openInstrumentForm && (
          <AddInstrumentForm
            instruments={instruments}
            handleOpenInstrumentForm={handleOpenInstrumentForm}
          />
        )}
        {openCreateEnsembleForm && (
          <CreateEmsembleForm
            handleOpenCreateEnsembleForm={handleOpenCreateEnsembleForm}
            onEnsembleCreated={handleEnsembleCreated}
          />
        )}
        {openRegisterEnsembleForm && (
          <RegisterEnsembleForm
            handleOpenRegisterEnsembleForm={handleOpenRegisterEnsembleForm}
            onEnsembleCreated={handleEnsembleCreated}
          />
        )}
        {openSettings && (
          <ProfileSetting handleSettingsOpen={handleSettingsOpen} />
        )}
        {openCreatePostForm && (
          <CreatePostForm
            ensembles={ensembles}
            handlePostsOpen={handlePostsOpen}
          />
        )}
      </div>

      {!openRegisterEnsembleForm &&
        !openCreateEnsembleForm &&
        !openInstrumentForm &&
        !openCreatePostForm &&
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
            <ActionCard
              buttonTextCreate="Opret opslag"
              paragrafText="Leder du efter musikere, kan du tilføje opslag her."
              subtitle="Mine opslag"
              status="Du har ingen opslag"
              onClickCreate={handlePostsOpen}
              onClickRegister={handlePostsOpen}
            />
            {ensembles.length > 0 && (
              <MyEnsembles
                data={ensembles}
                handleOpenCreateEnsembleForm={handleOpenCreateEnsembleForm}
                handleOpenRegisterEnsembleForm={handleOpenRegisterEnsembleForm}
              />
            )}
            {myInstruments.length > 0 && (
              <MyInstruments
                myInstruments={myInstruments}
                handleOpenInstrumentForm={handleOpenInstrumentForm}
                handleOpenDeleteModal={handleOpenDeleteModal}
              />
            )}
            {openDeleteModal && (
              <DeleteModal
                showDeleteModal={openDeleteModal}
                handleShowModal={handleOpenDeleteModal}
                subtitle="Du er ved fjerne et instrument, er du sikker"
                onClick={() => {
                  handleRemoveMyInstrument(selectedInstrumentId);
                  setOpenDeleteModal(false);
                }}
              />
            )}
          </div>
        )}
    </>
  );
}
