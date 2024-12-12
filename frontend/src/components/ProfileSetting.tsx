import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";
import { Title } from "./atoms/Title";
import { useState } from "react";
import PasswordModal from "./forms/PasswordModal";
import DeleteModal from "./DeleteModal";

type Props = {
  handleSettingsOpen: () => void;
};

export default function ProfileSetting({ handleSettingsOpen }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleShowModal = () => {
    if (showDeleteModal) {
      setShowDeleteModal(false);
    } else setShowDeleteModal(true);
  };

  const handleShowPasswordModal = () => {
    if (showPasswordModal) {
      setShowPasswordModal(false);
    } else setShowPasswordModal(true);
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
          />
        )}
      </div>
    </>
  );
}
