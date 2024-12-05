import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";
import { Title } from "./atoms/Title";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

type Props = {
  handleSettingsOpen: () => void;
};

export default function ProfileSetting({ handleSettingsOpen }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    console.log("showModal", showModal);
    if (showModal) {
      setShowModal(false);
    } else setShowModal(true);
  };

  return (
    <div
      className={`absolute bg-light-grey h-screen w-screen flex flex-col gap-6 padding z-0 
    `}
    >
      <div className="w-fit">
        <Button
          buttonText="Tilbage"
          variant="secondary"
          size="small"
          onClick={handleSettingsOpen}
        />
      </div>
      <Title variant="default" title="Indstillinger" />
      <form
        className="flex flex-col gap-6"
        //   onSubmit={handleSubmit}
      >
        <div>
          <Subtitle variant="default" subtitle="Profil" />
          <Button
            type="button"
            variant="delete"
            onClick={handleShowModal}
            buttonText="Slet profil"
          />
          {showModal && (
            <ConfirmModal
              handleShowModal={handleShowModal}
              showModal={showModal}
            />
          )}
        </div>
      </form>
    </div>
  );
}
