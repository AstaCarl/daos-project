import { useState } from "react";
import { Button } from "../atoms/Button";
import Select from "../atoms/Select";
import { Title } from "../atoms/Title";
import useAuthStore from "../../hooks/store/auth-store";

interface Instrument {
  _id: string;
  name: string;
}

type Props = {
  handleOpenInstrumentForm: () => void;
  instruments: Instrument[] | undefined;
};

export default function AddInstrumentForm({
  handleOpenInstrumentForm,
  instruments,
}: Props) {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const { user } = useAuthStore();

  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInstrument(event.target.value);
    console.log("Selected instrument", event.target.value);
  };

  const handleSubmit = async () => {
    const userId = user._id;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/${userId}/my-instruments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: selectedInstrument }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit instrument");
      }
    } catch (error) {
      console.error("Error submitting instrument:", error);
    }
  };

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
