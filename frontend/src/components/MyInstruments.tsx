import Subtitle from "./atoms/Subtitle";
import Label from "./atoms/Label";
import { Button } from "./atoms/Button";
import React, { useState } from "react";
import Icon from "./atoms/Icon";

// component for displaying the my instruments section, with a list of instruments

// interface for my chosen instruments
interface myInstrument {
  _id: string;
  name: string;
}

type Props = {
  // myInstruments prop is an array of myInstrument objects
  myInstruments: myInstrument[] | undefined;
  handleOpenInstrumentForm: () => void;
  handleOpenDeleteModal: (myInstrumentId?: string) => void;
};

export default function MyInstruments({
  myInstruments,
  handleOpenInstrumentForm,
  handleOpenDeleteModal,
}: Props) {

  // Recieves the instrument._id as a parameter and assigns it to the instrumentId, then calls the handleOpenDeleteModal function with the instrumentId as a parameter
  const handleDeleteClick = (myInstrumentId: string | undefined) => {
    handleOpenDeleteModal(myInstrumentId);
  };



  return (
    <section className="bg-white flex flex-col gap-7 padding border-y accent-grey">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Subtitle variant="default" subtitle="Mine instrumenter" />
          <div>
            <Button
              variant="secondary"
              buttonText="Tilføj"
              size="small"
              onClick={handleOpenInstrumentForm}
            />
          </div>
        </div>
        {/* mapping the myInstruments array to display them in a listed form */}
        {myInstruments &&
          myInstruments.map((instrument: myInstrument, index: number) => (
            <React.Fragment key={index}>
              <div className="flex flex-col gap-6 border border-accent-grey w-full p-4 rounded-md">
                <div className="flex justify-between">
                  <Subtitle variant="cardTitle" subtitle={instrument.name} />
                  <Icon
                    variant="deleteIcon"
                    // Sends the instrument._id as a parameter to the handleDeleteClick function
                    onClick={() => handleDeleteClick(instrument._id)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* Hardcoded genres, for design puposes */}
                  <Label variant="grey" labelText="Senmoderne" />
                  <Label variant="grey" labelText="Kammermusik" />
                  <Label variant="grey" labelText="Barok" />
                </div>
              </div>
            </React.Fragment>
          ))}
      </div>
    </section>
  );
}
