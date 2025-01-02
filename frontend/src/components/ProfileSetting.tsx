import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";
import { Title } from "./atoms/Title";
import { useState } from "react";
import PasswordModal from "./forms/PasswordModal";
import DeleteModal from "./DeleteModal";
import useAuthStore from "../hooks/store/auth-store";
import { useNavigate } from "react-router-dom";

// component for displaying the profile settings

type Props = {
  // handles the opening of the settings modal
  handleSettingsOpen: () => void;
};

export default function ProfileSetting({ handleSettingsOpen }: Props) {
  // state for showing the delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // state for showing the password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  // retreiving user info and accesToken from the auth store
  const { user, accessToken } = useAuthStore();
  const navigate = useNavigate();

  // function to show and hide delete modal
  const handleShowModal = () => {
    if (showDeleteModal) {
      setShowDeleteModal(false);
    } else setShowDeleteModal(true);
  };


  // function to show and hide password modal
  const handleShowPasswordModal = () => {
    if (showPasswordModal) {
      setShowPasswordModal(false);
    } else setShowPasswordModal(true);
  }


  // function to delete profile
    const handleDeleteProfile = async () => {
      // retreiving user id
      const userId = user._id;
  
      // DELETE request to delete the user profile at endpoint /user/:userId
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/user/${userId}`, // uses .env file for base url (backend)
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`, // uses accesToken
          },
        }
      );
   //  if response is ok, send alert and navigate to login page
      if (response.ok) {
        alert("Profil slettet");
        navigate("/login");
      } else {
        alert("Der skete en fejl, prøv igen");
      }
    };
    return (
      <>
        <div className="w-fit">
          <Button
            buttonText="Tilbage"
            variant="secondary"
            size="small"
            onClick={handleSettingsOpen}
          />
        </div>
        <Title variant="default" title="Indstillinger" />
        <div className="space-y-4">
          <Subtitle variant="default" subtitle="Adgangskode" />
          <Button
            type="button"
            variant="secondary"
            onClick={handleShowPasswordModal}
            buttonText="Skift adgangskode"
          />
          {showPasswordModal && (
            <PasswordModal
              handleShowPasswordModal={handleShowPasswordModal}
              showPasswordModal={showPasswordModal}
            />
          )}
        </div>
        <div className="space-y-4">
          <Subtitle variant="default" subtitle="Profil" />
          <Button
            type="button"
            variant="delete"
            onClick={handleShowModal}
            buttonText="Slet profil"
          />
          {showDeleteModal && (
            <DeleteModal
              subtitle="Du er ved at slette din profil, er du sikker"
              handleShowModal={handleShowModal}
              showDeleteModal={showDeleteModal}
              onClick={handleDeleteProfile}
            />
          )}
        </div>
      </>
    );};
