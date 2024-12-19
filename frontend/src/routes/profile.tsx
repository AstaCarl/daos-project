import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../hooks/store/auth-store";
import ActionCard from "../components/ActionCard";
import CreateEmsembleForm from "../components/forms/CreateEmsembleForm";
import MyEnsembles from "../components/MyEnsembles";
import { useGet } from "../hooks/use-get";
import RegisterEnsembleForm from "../components/forms/RegisterEnsembleForm";
import ProfileHeader from "../components/ProfileHeader";
import ProfileStatus from "../components/ProfileStatus";
import AddInstrumentForm from "../components/forms/AddInstrumentForm";
import MyInstruments from "../components/MyInstruments";
import ProfileSetting from "../components/ProfileSetting";
import DeleteModal from "../components/DeleteModal";
import CreatePostForm from "../components/forms/CreatePostForm";
import MyPosts from "../components/MyPosts";

// Profile page, that renders the user profile

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

export interface Posts {
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
  // State variables
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
  // get the user id from the user object
  const userId = user._id;

  // check if the user is logged in, if not redirect to login page,
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // functions for handling the opening and closing of the different forms and modals
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

  const handleOpenDeleteModal = (instrumentId?: string) => {
    if (openDeleteModal) {
      setOpenDeleteModal(false);
    } else {
      setOpenDeleteModal(true);
      setSelectedInstrumentId(instrumentId);
    }
  };

  // functions for handling the creation of new ensembles and instruments, and adding them to the state when created
  const handleEnsembleCreated = (newEnsemble: Ensemble) => {
    setEnsembles((prevEnsembles) => [...prevEnsembles, newEnsemble]);
  };

  const handleInstrumentAdded = (newInstrument: Instrument) => {
    setMyInstruments((prevInstruments) => [
      ...prevInstruments,
      { ...newInstrument },
    ]);
  };

  // fetch the ensembles, instruments and posts for the specific user
  const { data: ensembleData } = useGet<Ensemble[]>(`/ensemble/${userId}`);

  const { data: postsData } = useGet<Posts[]>(`/posts/${userId}`);

  const { data: myInstrumentsData } = useGet<UserInstrumentsData>(
    `/user/${userId}`,
    [fetchTrigger]
  );

  // fetch all instruments
  const { data: instrumentsData } = useGet<Instrument[]>(`/instruments`);

  // useEffects for setting the fetched data to the states
  useEffect(() => {
    if (instrumentsData) {
      setInstruments(instrumentsData);
    }
  }, [instrumentsData]);

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [postsData]);

  useEffect(() => {
    if (myInstrumentsData) {
      setMyInstruments(myInstrumentsData.myInstruments);
    }
  }, [myInstrumentsData]);

  useEffect(() => {
    if (ensembleData) {
      setEnsembles(ensembleData);
    }
  }, [ensembleData]);

  // function for removing an instrument from the user
  const handleRemoveMyInstrument = async (selectedInstrumentId?: string) => {
    // Patch request to the endpoint /user/:id/my-instruments/:instrumentId
    const response = await fetch(
      `${
        import.meta.env.VITE_BASE_URL
      }/user/${userId}/my-instruments/${selectedInstrumentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Authorization header with the access token
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // if the response is ok, log the data.
    if (response.ok) {
      const data = await response.json();
      console.log("remove instrument succesful:", data);
      // set the fetch trigger to true, to refetch the data
      setFetchTrigger((prev) => !prev);
    } else {
      // error if the response is not ok
      console.error("Remove instrument error:", response.statusText);
    }
  };

  return (
    <>
      <div className="absolute bg-light-grey h-screen w-screen flex flex-col gap-6 pb-16 padding">
        {/* conditional rendering of various forms, (logical AND operator) */}
        {openInstrumentForm && (
          <AddInstrumentForm
            instruments={instruments}
            handleOpenInstrumentForm={handleOpenInstrumentForm}
            onInstrumentAdded={handleInstrumentAdded}
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
      {/* conditional rendering of the contents of the profile page, (logical AND operator) if false. */}
      {!openRegisterEnsembleForm &&
        !openCreateEnsembleForm &&
        !openInstrumentForm &&
        !openCreatePostForm &&
        !openSettings && (
          <div className="relative z-0 flex flex-col gap-10 pb-16">
            <ProfileHeader handleSettingsOpen={handleSettingsOpen} />
            <ProfileStatus user={user} />
            {/* if theres no data for instruments, ensembles or posts, show the action cards */}
            {ensembles.length === 0 && (
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
            {posts.length === 0 && (
              <ActionCard
                buttonTextCreate="Opret opslag"
                paragrafText="Leder du efter musikere, kan du tilføje opslag her."
                subtitle="Mine opslag"
                status="Du har ingen opslag"
                onClickCreate={handlePostsOpen}
                onClickRegister={handlePostsOpen}
              />
            )}
            {/* If there is data show the my... sections  */}
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
            {posts.length > 0 && (
              <MyPosts posts={posts} handlePostsOpen={handlePostsOpen} />
            )}
            {/* Conditional rendering of the delete modal */}
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
