import Subtitle from "./atoms/Subtitle";
import Label from "./atoms/Label";
import { Button } from "./atoms/Button";

interface myInstrument {
  _id: string;
  name: string;
}

type Props = {
  myInstruments: myInstrument[] | undefined;
  handleOpenInstrumentForm: () => void;
};

export default function MyInstruments({ myInstruments, handleOpenInstrumentForm }: Props) {
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
            <div className="flex flex-col gap-6 border border-accent-grey w-full p-3 rounded-md">
              <Subtitle
                key={index}
                variant="cardTitle"
                subtitle={instrument.name}
              />
              <div className="flex gap-2">
              <Label variant="grey" key={index} labelText="Kammermusik" />
              <Label variant="grey" key={index} labelText="Barok" />
              <Label variant="grey" key={index} labelText="Senmoderne" />
            </div>
            </div>
          ))}
      </div>
    </section>
  );
}
