import { useState } from "react";
import { Button } from "../atoms/Button";
import Select from "../atoms/Select";
import { Title } from "../atoms/Title";
import useAuthStore from "../../hooks/store/auth-store";
import { Instrument } from "../../routes/profile";


// form to handle post request for adding an instrument to a user

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
  // states to handle selected instrument and errors
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const { user, accessToken } = useAuthStore();
  const [errors, setErrors] = useState<string[]>([]);


  // function to handle change in the select element, and set the selected instrument to the value
  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInstrument(event.target.value);
  };

  // function to handle the submit event, and make a post request to add the selected instrument to the user
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = user._id;
 // POST to endpoint /user/userId/my-instruments
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/${userId}/my-instruments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // send the access token in the authorization header
            authorization: `Bearer ${accessToken}`
          },
          // send the selected instrument as the body
          body: JSON.stringify({ _id: selectedInstrument }),
        }
      )
      // if the response is ok, set the new instrument to the response data, and call the onInstrumentAdded function
      if (response.ok) {
        const instrumentData = await response.json();
        // find the new instrument in the instrument data
        const newInstrument = instrumentData.myInstruments.find(
          (instrument: Instrument) => instrument._id === selectedInstrument
        );
        onInstrumentAdded(newInstrument);
        // close the form after submitting
        handleOpenInstrumentForm();
      }
      // if the response is not ok, set the errors to the error message
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
            // translating th error message to danish
            errors && errors.includes("Instrument already exists")
              ? "Du har allerede tilføjet dette instrument"
              : errors && errors.includes("_id should not be empty")
              ? "Du skal vælge et instrument"
              : undefined
          }
        >
          {/* Map over the instruments to show each in the options */}
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
