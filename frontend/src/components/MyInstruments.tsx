import Subtitle from "./atoms/Subtitle";
import Label from "./atoms/Label";
import { Button } from "./atoms/Button";
import React, { useState } from "react";
import Icon from "./atoms/Icon";

interface myInstrument {
  _id: string;
  name: string;
}

type Props = {
  myInstruments: myInstrument[] | undefined;
  handleOpenInstrumentForm: () => void;
  handleOpenDeleteModal: (myInstrumentId?: string) => void;
};

export default function MyInstruments({
  myInstruments,
  handleOpenInstrumentForm,
  handleOpenDeleteModal,
}: Props) {
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<
    string | undefined
  >(undefined);

  const handleDeleteClick = (myInstrumentId: string | undefined) => {
    setSelectedInstrumentId(myInstrumentId);
    handleOpenDeleteModal(myInstrumentId);
    console.log("delete clicked" + myInstrumentId);
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

        {myInstruments &&
          myInstruments.map((instrument: myInstrument, index: number) => (
            <React.Fragment key={index}>
              <div className="flex flex-col gap-6 border border-accent-grey w-full p-3 rounded-md">
                <Subtitle variant="cardTitle" subtitle={instrument.name} />
                <Icon
                  variant="deleteIcon"
                  onClick={() => handleDeleteClick(instrument._id)}
                />
                <div className="flex flex-wrap gap-2">
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
