import React, { useState } from "react";
import { Button } from "./atoms/Button";
import Label from "./atoms/Label";
import Paragraf from "./atoms/Paragraf";
import Subtitle from "./atoms/Subtitle";
import { Title } from "./atoms/Title";
import { UserIcon } from "./atoms/UserIcon";
import ContactModal from "./ContactModal";

interface User {
  _id: string;
  name: string;
  createdAt: Date;
  myInstruments: any[];
  lastname: string;
}
type Props = {
  user: User;
};

export default function MusicianCard({ user }: Props) {
  const createdAt = user.createdAt;
  const date = new Date(createdAt);
  const month = date.toLocaleString("da-DK", { month: "long" });
  const year = date.getFullYear();

  const [showContactModal, setShowContactModal] = useState(false);

  const handleShowModal = () => {
    if (showContactModal) {
      setShowContactModal(false);
    } else setShowContactModal(true);
  };

  return (
    <>
      <div className="flex flex-col bg-white border border-accent shadow-md rounded-md">
        <div className="flex justify-between items-start border border-accent gap-7 bg-gray-50 rounded-sm p-2">
          <div className="flex gap-4">
            <div className="flex w-[30%]">
              <UserIcon />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-1">
                <Title variant="red" title={user.name} />
                <Title variant="red" title={user.lastname} />
              </div>
              <div>
                <Paragraf
                  variant="body-small"
                  paragrafText={`Medlem siden ${month} ${year}`}
                />
              </div>
            </div>
          </div>
          <div className="flex p-1">
            <Button
              type="button"
              variant="secondary"
              buttonText="Kontakt"
              size="small"
              onClick={handleShowModal}
            />
          </div>
          {showContactModal && (
            <ContactModal
              handleShowModal={handleShowModal}
              showContactModal={showContactModal}
              user={user}
            />
          )}
        </div>

        {/* <p>{user.email}</p> */}
        <div className="flex flex-col bg-white gap-2 py-3 px-2">
          {user.myInstruments.map((instrument: any, index: number) => (
            <React.Fragment key={index}>
              <div
                className="flex flex-col border-b py-2 border-accent"
              >
                <Subtitle variant="instrument" subtitle={instrument.name} />
                <div className="flex py-2 gap-2">
                  <Label variant="grey" labelText="Kammermusik" />
                  <Label variant="grey" labelText="Barok" />
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* kontakt form */}
    </>
  );
}
