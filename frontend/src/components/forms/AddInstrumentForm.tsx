import { useState } from "react";
import { Button } from "../atoms/Button";
import Select from "../atoms/Select";
import { Title } from "../atoms/Title";
import useAuthStore from "../../hooks/store/auth-store";
import { Instrument } from "../../routes/profile";


type Props = {
  onInstrumentAdded: (newInstrument: Instrument) => void;
  handleOpenInstrumentForm: () => void;
  instruments: Instrument[] | undefined;
};

export default function AddInstrumentForm({
  handleOpenInstrumentForm,
  onInstrumentAdded,
  instruments,
}: Props) {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const { user, accessToken } = useAuthStore();
  const [errors, setErrors] = useState<string[]>([]);

  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInstrument(event.target.value);
    console.log("Selected instrument", event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = user._id;

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/${userId}/my-instruments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ _id: selectedInstrument }),
        }
      )
      if (response.ok) {
        const instrumentData = await response.json();
        const newInstrument = instrumentData.myInstruments.find(
          (instrument: Instrument) => instrument._id === selectedInstrument
        );
        onInstrumentAdded(newInstrument);
        handleOpenInstrumentForm();
      }
      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData.message);
        console.log("Error submitting instrument:", errorData);
      }
    } 

  return (
    <>
      <div className="w-fit">
        <Button
          buttonText="Tilbage"
          variant="secondary"
          size="small"
          onClick={handleOpenInstrumentForm}
        />
      </div>
      <Title variant="default" title="Tilføj Instrument" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Select
          defaultValue="Vælg et instrument"
          name="instrument"
          onChange={handleInstrumentChange}
          errorMessage={
            errors && errors.includes("Instrument already exists")
              ? "Du har allerede tilføjet dette instrument"
              : errors && errors.includes("_id should not be empty")
              ? "Du skal vælge et instrument"
              : undefined
          }
        >
          {instruments?.map((instrument, index) => (
            <option key={index} value={instrument._id}>
              {instrument.name}
            </option>
          ))}
        </Select>
        <Button
          buttonText="Tilføj instrument"
          variant="primary"
          size="medium"
          type="submit"
        />
      </form>
    </>
  );
}
